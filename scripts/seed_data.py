"""Seed script to initialize database with sample data"""

import os
import sys

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal, init_db
from app.models import Job, User
from app.utils.auth import get_password_hash


def seed_users(db):
    """Create initial users"""
    print("Creating users...")

    users = [
        User(
            email="admin@example.com",
            full_name="Admin User",
            role="HR_ADMIN",
            hashed_password=get_password_hash("admin123"),
            is_active=True,
        ),
        User(
            email="recruiter@example.com",
            full_name="Recruiter User",
            role="HR_RECRUITER",
            hashed_password=get_password_hash("recruiter123"),
            is_active=True,
        ),
    ]

    for user in users:
        existing = db.query(User).filter(User.email == user.email).first()
        if not existing:
            db.add(user)
            print(f"  Created user: {user.email}")

    db.commit()


def seed_jobs(db):
    """Create sample job positions"""
    print("Creating sample jobs...")

    # Get admin user
    admin = db.query(User).filter(User.email == "admin@example.com").first()
    if not admin:
        print("  Admin user not found, skipping jobs")
        return

    jobs = [
        Job(
            title="Senior Python Developer",
            description="Looking for an experienced Python developer to join our backend team. You will work on building scalable APIs and microservices.",
            required_skills=["Python", "FastAPI", "PostgreSQL", "Docker"],
            nice_to_have=["Kubernetes", "AWS", "Redis"],
            minimum_experience=5.0,
            keywords=["backend", "API", "microservices", "scalable"],
            status="active",
            created_by=admin.id,
        ),
        Job(
            title="Full Stack Developer",
            description="We need a versatile full stack developer who can work on both frontend and backend. React and Node.js experience required.",
            required_skills=["React", "Node.js", "TypeScript", "PostgreSQL"],
            nice_to_have=["Docker", "AWS", "GraphQL"],
            minimum_experience=3.0,
            keywords=["full stack", "web development", "React", "Node"],
            status="active",
            created_by=admin.id,
        ),
        Job(
            title="DevOps Engineer",
            description="Join our DevOps team to manage cloud infrastructure and CI/CD pipelines. AWS and Kubernetes expertise required.",
            required_skills=["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
            nice_to_have=["Python", "Ansible", "Prometheus"],
            minimum_experience=4.0,
            keywords=["devops", "cloud", "infrastructure", "automation"],
            status="active",
            created_by=admin.id,
        ),
        Job(
            title="Data Scientist",
            description="Looking for a data scientist to build machine learning models and derive insights from large datasets.",
            required_skills=["Python", "Machine Learning", "TensorFlow", "Pandas"],
            nice_to_have=["PyTorch", "AWS", "Spark"],
            minimum_experience=3.0,
            keywords=["data science", "ML", "analytics", "predictive models"],
            status="active",
            created_by=admin.id,
        ),
        Job(
            title="Junior Web Developer",
            description="Entry-level position for a motivated web developer. Great opportunity to learn and grow with our team.",
            required_skills=["JavaScript", "HTML", "CSS", "React"],
            nice_to_have=["Node.js", "Git", "TypeScript"],
            minimum_experience=1.0,
            keywords=["frontend", "web", "junior", "entry-level"],
            status="active",
            created_by=admin.id,
        ),
    ]

    for job in jobs:
        existing = db.query(Job).filter(Job.title == job.title).first()
        if not existing:
            db.add(job)
            print(f"  Created job: {job.title}")

    db.commit()


def main():
    """Main seed function"""
    print("Initializing database...")
    init_db()

    db = SessionLocal()

    try:
        seed_users(db)
        seed_jobs(db)
        print("\nSeeding completed successfully!")
        print("\nYou can now login with:")
        print("  Admin: admin@example.com / admin123")
        print("  Recruiter: recruiter@example.com / recruiter123")

    except Exception as e:
        print(f"\nError during seeding: {str(e)}")
        db.rollback()

    finally:
        db.close()


if __name__ == "__main__":
    main()
