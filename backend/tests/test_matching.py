"""Unit tests for matching service"""

import pytest
from unittest.mock import Mock
from app.services.matching_service import MatchingService
from app.models import Candidate, Job


@pytest.fixture
def mock_db():
    """Create a mock database session"""
    return Mock()


@pytest.fixture
def matching_service(mock_db):
    """Create a matching service instance"""
    return MatchingService(mock_db)


def test_calculate_score_perfect_match(matching_service):
    """Test score calculation for perfect candidate"""
    candidate = Candidate(
        id=1,
        name="John Doe",
        skills=["Python", "FastAPI", "PostgreSQL", "Docker"],
        years_of_experience=5.0,
        raw_text="Python FastAPI PostgreSQL Docker backend API microservices"
    )
    
    job = Job(
        id=1,
        title="Senior Python Developer",
        required_skills=["Python", "FastAPI", "PostgreSQL"],
        nice_to_have=["Docker"],
        minimum_experience=3.0,
        keywords=["backend", "API"]
    )
    
    score = matching_service._calculate_score(candidate, job)
    
    # Perfect match should have high score
    assert score.total_score >= 80
    assert score.skills_score >= 40
    assert score.experience_score >= 20
    assert len(score.matched_skills) >= 3


def test_calculate_score_partial_match(matching_service):
    """Test score calculation for partial candidate"""
    candidate = Candidate(
        id=2,
        name="Jane Smith",
        skills=["Python"],
        years_of_experience=1.0,
        raw_text="Python programming"
    )
    
    job = Job(
        id=1,
        title="Senior Python Developer",
        required_skills=["Python", "FastAPI", "PostgreSQL"],
        nice_to_have=["Docker"],
        minimum_experience=5.0,
        keywords=["backend", "API", "microservices"]
    )
    
    score = matching_service._calculate_score(candidate, job)
    
    # Partial match should have lower score
    assert score.total_score < 50
    assert len(score.missing_skills) > 0
