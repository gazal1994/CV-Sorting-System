"""Database models for the CV Sorting System"""

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Text,
    ForeignKey,
    Float,
    Boolean,
    JSON,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
from datetime import datetime


class User(Base):
    """User model for authentication and authorization"""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)  # HR_ADMIN or HR_RECRUITER
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    created_jobs = relationship(
        "Job", back_populates="creator", foreign_keys="Job.created_by"
    )
    audit_logs = relationship("AuditLog", back_populates="user")


class Candidate(Base):
    """Candidate model for storing parsed CV information"""

    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), index=True)
    phone = Column(String(50))
    education = Column(Text)
    years_of_experience = Column(Float, default=0.0)
    skills = Column(JSON)  # List of skills
    languages = Column(JSON)  # List of languages
    raw_text = Column(Text)  # Full CV text
    file_path = Column(String(500))  # Path to original file
    file_name = Column(String(255))
    file_type = Column(String(20))  # pdf, docx, txt
    parse_status = Column(String(50), default="pending")  # pending, success, failed
    parse_error = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    scores = relationship(
        "CandidateScore", back_populates="candidate", cascade="all, delete-orphan"
    )


class Job(Base):
    """Job position model"""

    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    required_skills = Column(JSON)  # List of required skills
    nice_to_have = Column(JSON)  # List of nice-to-have skills
    minimum_experience = Column(Float, default=0.0)
    keywords = Column(JSON)  # List of keywords for matching
    status = Column(String(50), default="active")  # active, closed, draft
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    creator = relationship(
        "User", back_populates="created_jobs", foreign_keys=[created_by]
    )
    scores = relationship(
        "CandidateScore", back_populates="job", cascade="all, delete-orphan"
    )


class CandidateScore(Base):
    """Candidate ranking scores for specific jobs"""

    __tablename__ = "candidate_scores"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"), nullable=False)
    job_id = Column(Integer, ForeignKey("jobs.id"), nullable=False)

    # Scoring components
    total_score = Column(Float, default=0.0)
    skills_score = Column(Float, default=0.0)
    experience_score = Column(Float, default=0.0)
    keywords_score = Column(Float, default=0.0)

    # Ranking
    rank = Column(Integer)

    # Explanation
    explanation = Column(Text)
    matched_skills = Column(JSON)  # List of matched skills
    missing_skills = Column(JSON)  # List of missing required skills

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    candidate = relationship("Candidate", back_populates="scores")
    job = relationship("Job", back_populates="scores")


class AuditLog(Base):
    """Audit log for tracking system actions"""

    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    action = Column(
        String(100), nullable=False
    )  # upload_cv, create_job, run_ranking, etc.
    entity_type = Column(String(50))  # candidate, job, user
    entity_id = Column(Integer)
    details = Column(JSON)  # Additional context
    ip_address = Column(String(50))
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="audit_logs")
