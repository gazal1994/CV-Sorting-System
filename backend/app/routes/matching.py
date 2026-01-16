"""Matching and ranking routes"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import CandidateScore, Job, User
from app.schemas import CandidateScoreResponse, RankingRequest, RankingResponse
from app.services.audit_service import AuditService
from app.services.matching_service import MatchingService
from app.utils.auth import get_current_user

router = APIRouter(prefix="/api/matching", tags=["Matching & Ranking"])


@router.post("/rank", response_model=RankingResponse)
async def rank_candidates(
    request: RankingRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Rank all candidates for a specific job"""
    # Verify job exists
    job = db.query(Job).filter(Job.id == request.job_id).first()
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Job not found"
        )

    # Run matching algorithm
    matching_service = MatchingService(db)

    try:
        scores = matching_service.rank_candidates_for_job(request.job_id)

        # Log action
        AuditService.log_action(
            db=db,
            action="ranking_executed",
            user_id=current_user.id,
            entity_type="job",
            entity_id=request.job_id,
            details={"total_candidates": len(scores)},
        )

        return {
            "job_id": request.job_id,
            "total_candidates": len(scores),
            "ranked_candidates": scores,
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error ranking candidates: {str(e)}",
        )


@router.get("/results/{job_id}", response_model=List[CandidateScoreResponse])
async def get_ranking_results(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get ranking results for a job"""
    # Verify job exists
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Job not found"
        )

    # Get scores ordered by rank
    scores = (
        db.query(CandidateScore)
        .filter(CandidateScore.job_id == job_id)
        .order_by(CandidateScore.rank)
        .all()
    )

    return scores
