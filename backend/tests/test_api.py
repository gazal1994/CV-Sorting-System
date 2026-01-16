"""Integration tests for API endpoints"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database import Base, get_db
from app.models import User
from app.utils.auth import get_password_hash


# Test database setup
TEST_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    """Override database dependency for testing"""
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_database():
    """Create test database before each test and drop after"""
    Base.metadata.create_all(bind=engine)

    # Create test user
    db = TestingSessionLocal()
    test_user = User(
        email="test@example.com",
        full_name="Test User",
        role="HR_RECRUITER",
        hashed_password=get_password_hash("testpassword"),
    )
    db.add(test_user)
    db.commit()
    db.close()

    yield

    Base.metadata.drop_all(bind=engine)


def test_root_endpoint():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()


def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_login_success():
    """Test successful login"""
    response = client.post(
        "/api/auth/login", json={"email": "test@example.com", "password": "testpassword"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"


def test_login_failure():
    """Test failed login with wrong password"""
    response = client.post(
        "/api/auth/login", json={"email": "test@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == 401


def test_get_candidates_unauthorized():
    """Test getting candidates without authentication"""
    response = client.get("/api/candidates")
    assert response.status_code == 403  # Forbidden without auth


def test_get_candidates_authorized():
    """Test getting candidates with authentication"""
    # Login first
    login_response = client.post(
        "/api/auth/login", json={"email": "test@example.com", "password": "testpassword"}
    )
    token = login_response.json()["access_token"]

    # Get candidates
    response = client.get("/api/candidates", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_create_job():
    """Test creating a job"""
    # Login first
    login_response = client.post(
        "/api/auth/login", json={"email": "test@example.com", "password": "testpassword"}
    )
    token = login_response.json()["access_token"]

    # Create job
    job_data = {
        "title": "Python Developer",
        "description": "Looking for a Python developer",
        "required_skills": ["Python", "FastAPI"],
        "nice_to_have": ["Docker"],
        "minimum_experience": 2.0,
        "keywords": ["backend", "API"],
    }

    response = client.post("/api/jobs", json=job_data, headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 201
    assert response.json()["title"] == "Python Developer"


def test_get_pipeline_stats():
    """Test getting pipeline statistics"""
    # Login first
    login_response = client.post(
        "/api/auth/login", json={"email": "test@example.com", "password": "testpassword"}
    )
    token = login_response.json()["access_token"]

    # Get stats
    response = client.get(
        "/api/reports/pipeline-stats", headers={"Authorization": f"Bearer {token}"}
    )

    assert response.status_code == 200
    data = response.json()
    assert "total_candidates" in data
    assert "total_jobs" in data
    assert "success_rate" in data
