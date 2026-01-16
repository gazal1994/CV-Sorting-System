"""Reports and analytics routes"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from collections import Counter

from app.database import get_db
from app.schemas import SkillsFrequencyReport, SkillFrequency, PipelineStats, AuditLogResponse
from app.models import User, Job, Candidate, CandidateScore, AuditLog
from app.utils.auth import get_current_user, get_current_admin_user

router = APIRouter(prefix="/api/reports", tags=["Reports"])


@router.get("/skills-frequency/{job_id}", response_model=SkillsFrequencyReport)
async def get_skills_frequency(
    job_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """
    Report: Top skills frequency across all candidates for a specific job
    Shows which skills are most common among candidates for this position
    """
    # Verify job exists
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    # Get all candidates
    candidates = db.query(Candidate).filter(Candidate.parse_status == "success").all()

    # Count skill frequencies
    all_skills = []
    for candidate in candidates:
        if candidate.skills:
            all_skills.extend(candidate.skills)

    skill_counter = Counter(all_skills)
    total_candidates = len(candidates)

    # Create skill frequency list
    skills_list = []
    for skill, count in skill_counter.most_common(20):  # Top 20 skills
        skills_list.append(
            {
                "skill": skill,
                "count": count,
                "percentage": (
                    round((count / total_candidates) * 100, 2) if total_candidates > 0 else 0
                ),
            }
        )

    return {
        "job_id": job_id,
        "job_title": job.title,
        "total_candidates": total_candidates,
        "skills": skills_list,
    }


@router.get("/pipeline-stats", response_model=PipelineStats)
async def get_pipeline_stats(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    """
    Report: Candidate pipeline statistics
    Shows upload count, parse success rate, average scores by job
    """
    # Total candidates
    total_candidates = db.query(func.count(Candidate.id)).scalar()

    # Parse statistics
    parsed_successfully = (
        db.query(func.count(Candidate.id)).filter(Candidate.parse_status == "success").scalar()
    )

    parse_failed = (
        db.query(func.count(Candidate.id)).filter(Candidate.parse_status == "failed").scalar()
    )

    success_rate = (parsed_successfully / total_candidates * 100) if total_candidates > 0 else 0

    # Job statistics
    total_jobs = db.query(func.count(Job.id)).scalar()
    active_jobs = db.query(func.count(Job.id)).filter(Job.status == "active").scalar()

    # Average score by job
    avg_scores = (
        db.query(
            Job.id,
            Job.title,
            func.avg(CandidateScore.total_score).label("avg_score"),
            func.count(CandidateScore.id).label("candidate_count"),
        )
        .join(CandidateScore, Job.id == CandidateScore.job_id)
        .group_by(Job.id, Job.title)
        .all()
    )

    average_score_by_job = [
        {
            "job_id": row.id,
            "job_title": row.title,
            "average_score": round(row.avg_score, 2) if row.avg_score else 0,
            "candidate_count": row.candidate_count,
        }
        for row in avg_scores
    ]

    return {
        "total_candidates": total_candidates,
        "parsed_successfully": parsed_successfully,
        "parse_failed": parse_failed,
        "success_rate": round(success_rate, 2),
        "total_jobs": total_jobs,
        "active_jobs": active_jobs,
        "average_score_by_job": average_score_by_job,
    }


@router.get("/audit-logs", response_model=List[AuditLogResponse])
async def get_audit_logs(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    """Get system audit logs (admin only)"""
    logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).offset(skip).limit(limit).all()

    return logs
