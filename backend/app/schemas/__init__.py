"""Pydantic schemas for request/response validation"""

from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


# Enums
class UserRole(str, Enum):
    HR_ADMIN = "HR_ADMIN"
    HR_RECRUITER = "HR_RECRUITER"


class ParseStatus(str, Enum):
    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"


class JobStatus(str, Enum):
    ACTIVE = "active"
    CLOSED = "closed"
    DRAFT = "draft"


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None


class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# Candidate Schemas
class CandidateBase(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    education: Optional[str] = None
    years_of_experience: float = 0.0
    skills: List[str] = []
    languages: List[str] = []


class CandidateCreate(CandidateBase):
    raw_text: Optional[str] = None
    file_name: Optional[str] = None
    file_type: Optional[str] = None


class CandidateUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    education: Optional[str] = None
    years_of_experience: Optional[float] = None
    skills: Optional[List[str]] = None
    languages: Optional[List[str]] = None


class CandidateResponse(CandidateBase):
    id: int
    file_path: Optional[str] = None
    file_name: Optional[str] = None
    file_type: Optional[str] = None
    parse_status: str
    parse_error: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Job Schemas
class JobBase(BaseModel):
    title: str
    description: Optional[str] = None
    required_skills: List[str] = []
    nice_to_have: List[str] = []
    minimum_experience: float = 0.0
    keywords: List[str] = []


class JobCreate(JobBase):
    status: JobStatus = JobStatus.ACTIVE


class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    required_skills: Optional[List[str]] = None
    nice_to_have: Optional[List[str]] = None
    minimum_experience: Optional[float] = None
    keywords: Optional[List[str]] = None
    status: Optional[JobStatus] = None


class JobResponse(JobBase):
    id: int
    status: str
    created_by: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Candidate Score Schemas
class CandidateScoreResponse(BaseModel):
    id: int
    candidate_id: int
    job_id: int
    total_score: float
    skills_score: float
    experience_score: float
    keywords_score: float
    rank: Optional[int] = None
    explanation: Optional[str] = None
    matched_skills: List[str] = []
    missing_skills: List[str] = []
    created_at: datetime

    # Include candidate details
    candidate: CandidateResponse

    class Config:
        from_attributes = True


class RankingRequest(BaseModel):
    job_id: int


class RankingResponse(BaseModel):
    job_id: int
    total_candidates: int
    ranked_candidates: List[CandidateScoreResponse]


# Report Schemas
class SkillFrequency(BaseModel):
    skill: str
    count: int
    percentage: float


class SkillsFrequencyReport(BaseModel):
    job_id: int
    job_title: str
    total_candidates: int
    skills: List[SkillFrequency]


class PipelineStats(BaseModel):
    total_candidates: int
    parsed_successfully: int
    parse_failed: int
    success_rate: float
    total_jobs: int
    active_jobs: int
    average_score_by_job: List[Dict[str, Any]]


# Audit Log Schemas
class AuditLogResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    action: str
    entity_type: Optional[str] = None
    entity_id: Optional[int] = None
    details: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    timestamp: datetime

    class Config:
        from_attributes = True


# Upload Response
class UploadResponse(BaseModel):
    filename: str
    status: str
    candidate_id: Optional[int] = None
    error: Optional[str] = None
