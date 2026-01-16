"""Candidate management routes"""

import os
import shutil
from typing import List

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import Candidate, User
from app.schemas import CandidateResponse, CandidateUpdate, UploadResponse
from app.services.audit_service import AuditService
from app.utils.auth import get_current_user
from app.utils.cv_parser import CVParser

router = APIRouter(prefix="/api/candidates", tags=["Candidates"])


@router.post("/upload", response_model=List[UploadResponse])
async def upload_cvs(
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Upload and parse CV files"""
    parser = CVParser()
    results = []

    for file in files:
        try:
            # Validate file type
            file_ext = file.filename.split(".")[-1].lower()
            if file_ext not in ["pdf", "docx", "txt"]:
                results.append(
                    {
                        "filename": file.filename,
                        "status": "error",
                        "error": "Unsupported file type",
                    }
                )
                continue

            # Save file
            file_path = os.path.join(settings.storage_path, "cvs", file.filename)
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            # Parse CV
            parse_result = parser.parse_file(file_path, file_ext)

            if parse_result["success"]:
                # Create candidate record
                candidate_data = parse_result["data"]
                candidate = Candidate(
                    name=candidate_data["name"],
                    email=candidate_data["email"],
                    phone=candidate_data["phone"],
                    education=candidate_data["education"],
                    years_of_experience=candidate_data["years_of_experience"],
                    skills=candidate_data["skills"],
                    languages=candidate_data["languages"],
                    raw_text=candidate_data["raw_text"],
                    file_path=file_path,
                    file_name=file.filename,
                    file_type=file_ext,
                    parse_status="success",
                )

                db.add(candidate)
                db.commit()
                db.refresh(candidate)

                # Log action
                AuditService.log_action(
                    db=db,
                    action="cv_uploaded",
                    user_id=current_user.id,
                    entity_type="candidate",
                    entity_id=candidate.id,
                    details={"filename": file.filename},
                )

                results.append(
                    {
                        "filename": file.filename,
                        "status": "success",
                        "candidate_id": candidate.id,
                    }
                )
            else:
                # Create candidate with failed status
                candidate = Candidate(
                    name="Parse Failed",
                    file_path=file_path,
                    file_name=file.filename,
                    file_type=file_ext,
                    parse_status="failed",
                    parse_error=parse_result["error"],
                )

                db.add(candidate)
                db.commit()

                results.append(
                    {
                        "filename": file.filename,
                        "status": "failed",
                        "error": parse_result["error"],
                    }
                )

        except Exception as e:
            results.append(
                {"filename": file.filename, "status": "error", "error": str(e)}
            )

    return results


@router.get("", response_model=List[CandidateResponse])
async def get_candidates(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get all candidates"""
    candidates = db.query(Candidate).offset(skip).limit(limit).all()
    return candidates


@router.get("/{candidate_id}", response_model=CandidateResponse)
async def get_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get a specific candidate"""
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()

    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found"
        )

    return candidate


@router.put("/{candidate_id}", response_model=CandidateResponse)
async def update_candidate(
    candidate_id: int,
    candidate_data: CandidateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update candidate information"""
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()

    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found"
        )

    # Update fields
    update_data = candidate_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(candidate, field, value)

    db.commit()
    db.refresh(candidate)

    # Log action
    AuditService.log_action(
        db=db,
        action="candidate_updated",
        user_id=current_user.id,
        entity_type="candidate",
        entity_id=candidate.id,
    )

    return candidate


@router.delete("/{candidate_id}")
async def delete_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete a candidate"""
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()

    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found"
        )

    # Delete file if exists
    if candidate.file_path and os.path.exists(candidate.file_path):
        os.remove(candidate.file_path)

    db.delete(candidate)
    db.commit()

    # Log action
    AuditService.log_action(
        db=db,
        action="candidate_deleted",
        user_id=current_user.id,
        entity_type="candidate",
        entity_id=candidate_id,
    )

    return {"message": "Candidate deleted successfully"}
