"""Job position management routes"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import JobCreate, JobUpdate, JobResponse
from app.models import User, Job
from app.utils.auth import get_current_user
from app.services.audit_service import AuditService

router = APIRouter(prefix="/api/jobs", tags=["Jobs"])


@router.post("", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
async def create_job(
    job_data: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a new job position"""
    job = Job(
        title=job_data.title,
        description=job_data.description,
        required_skills=job_data.required_skills,
        nice_to_have=job_data.nice_to_have,
        minimum_experience=job_data.minimum_experience,
        keywords=job_data.keywords,
        status=job_data.status,
        created_by=current_user.id,
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    # Log action
    AuditService.log_action(
        db=db,
        action="job_created",
        user_id=current_user.id,
        entity_type="job",
        entity_id=job.id,
        details={"title": job.title},
    )

    return job


@router.get("", response_model=List[JobResponse])
async def get_jobs(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get all job positions"""
    jobs = db.query(Job).offset(skip).limit(limit).all()
    return jobs


@router.get("/{job_id}", response_model=JobResponse)
async def get_job(
    job_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """Get a specific job position"""
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    return job


@router.put("/{job_id}", response_model=JobResponse)
async def update_job(
    job_id: int,
    job_data: JobUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update a job position"""
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    # Update fields
    update_data = job_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(job, field, value)

    db.commit()
    db.refresh(job)

    # Log action
    AuditService.log_action(
        db=db, action="job_updated", user_id=current_user.id, entity_type="job", entity_id=job.id
    )

    return job


@router.delete("/{job_id}")
async def delete_job(
    job_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """Delete a job position"""
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    db.delete(job)
    db.commit()

    # Log action
    AuditService.log_action(
        db=db, action="job_deleted", user_id=current_user.id, entity_type="job", entity_id=job_id
    )

    return {"message": "Job deleted successfully"}
