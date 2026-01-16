"""
End-to-End Tests for CV Sorting System

These tests verify complete user workflows through the system.
Tests use pytest and httpx for async HTTP testing.
"""

import pytest
import os
import sys
from httpx import AsyncClient
from pathlib import Path

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.main import app
from app.database import Base, engine


@pytest.fixture(scope="module", autouse=True)
def setup_database():
    """Setup test database"""
    Base.metadata.create_all(bind=engine)
    yield
    # Teardown: optionally drop tables after tests
    # Base.metadata.drop_all(bind=engine)


@pytest.mark.asyncio
class TestCompleteWorkflow:
    """Test complete user workflows end-to-end"""
    
    async def test_e2e_cv_upload_and_job_matching_workflow(self):
        """
        E2E Test 1: Complete CV Upload and Job Matching Workflow
        
        Workflow Steps:
        1. Login as recruiter
        2. Upload a CV file
        3. Verify candidate is created and parsed successfully
        4. Create a new job position
        5. Rank candidates for the job
        6. Verify ranking results
        """
        async with AsyncClient(app=app, base_url="http://test") as client:
            # Step 1: Login
            login_response = await client.post(
                "/api/auth/login",
                json={"email": "recruiter@example.com", "password": "recruiter123"}
            )
            assert login_response.status_code == 200
            token = login_response.json()["access_token"]
            headers = {"Authorization": f"Bearer {token}"}
            
            # Step 2: Upload CV
            test_cv_path = Path(__file__).parent.parent / "storage" / "sample_cvs" / "john_doe_senior_developer.txt"
            
            if test_cv_path.exists():
                with open(test_cv_path, "rb") as cv_file:
                    files = {"files": ("test_cv.txt", cv_file, "text/plain")}
                    upload_response = await client.post(
                        "/api/candidates/upload",
                        headers=headers,
                        files=files
                    )
                assert upload_response.status_code == 200
                upload_results = upload_response.json()
                assert len(upload_results) > 0
                assert upload_results[0]["success"] is True
                candidate_id = upload_results[0]["candidate_id"]
            
                # Step 3: Verify candidate was created
                candidate_response = await client.get(
                    f"/api/candidates/{candidate_id}",
                    headers=headers
                )
                assert candidate_response.status_code == 200
                candidate = candidate_response.json()
                assert candidate["parse_status"] == "success"
                assert candidate["email"] is not None
            
            # Step 4: Create job position
            job_data = {
                "title": "E2E Test Senior Developer",
                "description": "Test job for E2E workflow",
                "required_skills": ["Python", "FastAPI", "React", "PostgreSQL"],
                "nice_to_have": ["Docker", "AWS"],
                "minimum_experience": 3,
                "keywords": ["backend", "api", "database"]
            }
            job_response = await client.post(
                "/api/jobs",
                headers=headers,
                json=job_data
            )
            assert job_response.status_code == 200
            job = job_response.json()
            job_id = job["id"]
            
            # Step 5: Rank candidates for job
            ranking_response = await client.post(
                f"/api/matching/rank",
                headers=headers,
                json={"job_id": job_id}
            )
            assert ranking_response.status_code == 200
            ranking_result = ranking_response.json()
            assert ranking_result["message"] == "Ranking completed successfully"
            assert ranking_result["ranked_count"] > 0
            
            # Step 6: Get ranking results
            results_response = await client.get(
                f"/api/matching/results/{job_id}",
                headers=headers
            )
            assert results_response.status_code == 200
            results = results_response.json()
            assert len(results) > 0
            assert results[0]["rank"] == 1
            assert results[0]["total_score"] >= 0
            
            print("✅ E2E Test 1 Passed: CV Upload and Job Matching Workflow")
    
    
    async def test_e2e_reports_and_analytics_workflow(self):
        """
        E2E Test 2: Complete Reports and Analytics Workflow
        
        Workflow Steps:
        1. Login as admin
        2. Get skills frequency report
        3. Get pipeline statistics
        4. Get audit logs
        5. Verify all reports return valid data
        """
        async with AsyncClient(app=app, base_url="http://test") as client:
            # Step 1: Login as admin
            login_response = await client.post(
                "/api/auth/login",
                json={"email": "admin@example.com", "password": "admin123"}
            )
            assert login_response.status_code == 200
            token = login_response.json()["access_token"]
            headers = {"Authorization": f"Bearer {token}"}
            
            # Step 2: Get skills frequency report
            skills_response = await client.get(
                "/api/reports/skills-frequency",
                headers=headers
            )
            assert skills_response.status_code == 200
            skills_data = skills_response.json()
            assert isinstance(skills_data, list)
            if len(skills_data) > 0:
                assert "skill" in skills_data[0]
                assert "count" in skills_data[0]
            
            # Step 3: Get pipeline statistics
            pipeline_response = await client.get(
                "/api/reports/pipeline-stats",
                headers=headers
            )
            assert pipeline_response.status_code == 200
            pipeline_data = pipeline_response.json()
            assert "total_candidates" in pipeline_data
            assert "success_rate" in pipeline_data
            assert "total_jobs" in pipeline_data
            assert pipeline_data["total_candidates"] >= 0
            
            # Step 4: Get audit logs
            audit_response = await client.get(
                "/api/reports/audit-logs",
                headers=headers
            )
            assert audit_response.status_code == 200
            audit_logs = audit_response.json()
            assert isinstance(audit_logs, list)
            if len(audit_logs) > 0:
                assert "timestamp" in audit_logs[0]
                assert "user_email" in audit_logs[0]
                assert "action" in audit_logs[0]
            
            # Step 5: Verify job-specific reports
            # Get all jobs first
            jobs_response = await client.get("/api/jobs", headers=headers)
            assert jobs_response.status_code == 200
            jobs = jobs_response.json()
            
            if len(jobs) > 0:
                job_id = jobs[0]["id"]
                job_skills_response = await client.get(
                    f"/api/reports/skills-frequency/{job_id}",
                    headers=headers
                )
                assert job_skills_response.status_code == 200
            
            print("✅ E2E Test 2 Passed: Reports and Analytics Workflow")


@pytest.mark.asyncio
class TestAccessControl:
    """Test role-based access control"""
    
    async def test_recruiter_cannot_access_audit_logs(self):
        """Verify recruiters cannot access admin-only audit logs"""
        async with AsyncClient(app=app, base_url="http://test") as client:
            # Login as recruiter
            login_response = await client.post(
                "/api/auth/login",
                json={"email": "recruiter@example.com", "password": "recruiter123"}
            )
            assert login_response.status_code == 200
            token = login_response.json()["access_token"]
            headers = {"Authorization": f"Bearer {token}"}
            
            # Try to access audit logs (should fail)
            audit_response = await client.get(
                "/api/reports/audit-logs",
                headers=headers
            )
            assert audit_response.status_code == 403
            
            print("✅ Access Control Test Passed: Recruiter blocked from audit logs")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "-s"])
