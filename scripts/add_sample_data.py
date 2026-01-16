"""Add sample CVs and Jobs to the database for testing and demonstration"""

import os
import sys

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.database import SessionLocal
from app.models import Candidate, Job, User
from app.utils.cv_parser import CVParser
from datetime import datetime


def add_sample_cvs():
    """Parse and add sample CV files to database"""
    db = SessionLocal()
    parser = CVParser()

    sample_cvs_dir = os.path.join(
        os.path.dirname(__file__), "..", "backend", "storage", "sample_cvs"
    )

    if not os.path.exists(sample_cvs_dir):
        print(f"❌ Sample CVs directory not found: {sample_cvs_dir}")
        return

    cv_files = [f for f in os.listdir(sample_cvs_dir) if f.endswith(".txt")]

    if not cv_files:
        print("❌ No sample CV files found")
        return

    print(f"\n📄 Found {len(cv_files)} sample CV files")

    for cv_file in cv_files:
        file_path = os.path.join(sample_cvs_dir, cv_file)

        try:
            # Parse CV
            result = parser.parse_file(file_path, "txt")

            if result["success"]:
                data = result["data"]

                # Check if candidate already exists
                existing = db.query(Candidate).filter(Candidate.email == data["email"]).first()
                if existing:
                    print(f"⚠️  Skipping {cv_file} - Email already exists")
                    continue

                # Create candidate record
                candidate = Candidate(
                    name=data["name"],
                    email=data["email"],
                    phone=data["phone"],
                    education=data["education"],
                    years_of_experience=data["years_of_experience"],
                    skills=data["skills"],
                    languages=data["languages"],
                    raw_text=data["raw_text"],
                    parse_status="success",
                    file_path=file_path,
                    file_name=cv_file,
                    file_type="txt",
                )

                db.add(candidate)
                db.commit()

                print(
                    f"✅ Added: {data['name']} ({data['email']}) - {len(data['skills'])} skills, {data['years_of_experience']} years exp"
                )
            else:
                print(f"❌ Failed to parse {cv_file}: {result.get('error')}")

        except Exception as e:
            print(f"❌ Error processing {cv_file}: {str(e)}")
            db.rollback()

    db.close()
    print("\n✅ Sample CVs import completed\n")


def add_sample_jobs():
    """Add sample job positions to database"""
    db = SessionLocal()

    # Get first user (admin or recruiter)
    user = db.query(User).first()
    if not user:
        print("❌ No users found. Please run seed_data.py first")
        db.close()
        return

    sample_jobs = [
        {
            "title": "Senior Full Stack Developer",
            "description": "We are seeking an experienced Full Stack Developer to join our growing team. You will work on building scalable web applications using modern technologies.",
            "required_skills": ["Python", "JavaScript", "React", "PostgreSQL", "Docker", "Git"],
            "nice_to_have": ["AWS", "Kubernetes", "TypeScript", "FastAPI"],
            "minimum_experience": 5,
            "keywords": ["full stack", "web development", "microservices", "agile", "ci/cd"],
            "status": "active",
        },
        {
            "title": "Python Backend Engineer",
            "description": "Looking for a skilled Python developer to build and maintain our backend services and APIs. Experience with FastAPI and async programming is a plus.",
            "required_skills": ["Python", "FastAPI", "PostgreSQL", "RESTful API", "Git"],
            "nice_to_have": ["Docker", "Redis", "Elasticsearch", "pytest"],
            "minimum_experience": 3,
            "keywords": ["backend", "api", "microservices", "database", "testing"],
            "status": "active",
        },
        {
            "title": "Frontend Developer (React)",
            "description": "Join our frontend team to create beautiful, responsive user interfaces. We value clean code, attention to detail, and user experience.",
            "required_skills": ["React", "JavaScript", "HTML", "CSS", "Git"],
            "nice_to_have": ["TypeScript", "Tailwind CSS", "Next.js", "State Management"],
            "minimum_experience": 2,
            "keywords": ["frontend", "ui", "responsive design", "web", "user experience"],
            "status": "active",
        },
        {
            "title": "DevOps Engineer",
            "description": "We need a DevOps engineer to manage our cloud infrastructure and automate deployment processes. AWS experience required.",
            "required_skills": ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux", "Python"],
            "nice_to_have": ["Terraform", "Ansible", "Prometheus", "Grafana"],
            "minimum_experience": 4,
            "keywords": ["devops", "cloud", "automation", "infrastructure", "monitoring"],
            "status": "active",
        },
        {
            "title": "Junior JavaScript Developer",
            "description": "Entry-level position for a motivated JavaScript developer. Great opportunity to learn and grow with our team.",
            "required_skills": ["JavaScript", "HTML", "CSS", "Git"],
            "nice_to_have": ["React", "Node.js", "TypeScript"],
            "minimum_experience": 1,
            "keywords": ["javascript", "web development", "junior", "frontend", "learning"],
            "status": "active",
        },
    ]

    print(f"\n💼 Adding {len(sample_jobs)} sample job positions...")

    for job_data in sample_jobs:
        try:
            # Check if job already exists
            existing = db.query(Job).filter(Job.title == job_data["title"]).first()
            if existing:
                print(f"⚠️  Skipping '{job_data['title']}' - Already exists")
                continue

            job = Job(**job_data, created_by=user.id, created_at=datetime.utcnow())

            db.add(job)
            db.commit()

            print(
                f"✅ Added: {job_data['title']} (requires {len(job_data['required_skills'])} skills, {job_data['minimum_experience']}+ years)"
            )

        except Exception as e:
            print(f"❌ Error adding job '{job_data['title']}': {str(e)}")
            db.rollback()

    db.close()
    print("\n✅ Sample jobs import completed\n")


if __name__ == "__main__":
    print("=" * 60)
    print("🎯 CV SORTING SYSTEM - SAMPLE DATA IMPORT")
    print("=" * 60)

    add_sample_cvs()
    add_sample_jobs()

    print("=" * 60)
    print("✅ All sample data imported successfully!")
    print("=" * 60)
    print("\n💡 You can now:")
    print("   1. View candidates at http://localhost:5174/candidates")
    print("   2. View jobs at http://localhost:5174/jobs")
    print("   3. Rank candidates for jobs")
    print("   4. View reports and analytics\n")
