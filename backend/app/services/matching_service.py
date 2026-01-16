"""Matching and ranking service for candidates against job positions"""

from typing import List, Dict
from sqlalchemy.orm import Session
from app.models import Candidate, Job, CandidateScore


class MatchingService:
    """Service to match and rank candidates against job requirements"""

    def __init__(self, db: Session):
        self.db = db

    def rank_candidates_for_job(self, job_id: int) -> List[CandidateScore]:
        """Rank all candidates for a specific job"""
        # Get job
        job = self.db.query(Job).filter(Job.id == job_id).first()
        if not job:
            raise ValueError(f"Job {job_id} not found")

        # Get all successfully parsed candidates
        candidates = self.db.query(Candidate).filter(Candidate.parse_status == "success").all()

        # Delete existing scores for this job
        self.db.query(CandidateScore).filter(CandidateScore.job_id == job_id).delete()
        self.db.commit()

        # Calculate scores for each candidate
        scores = []
        for candidate in candidates:
            score = self._calculate_score(candidate, job)
            scores.append(score)

        # Sort by total score (descending)
        scores.sort(key=lambda x: x.total_score, reverse=True)

        # Assign ranks
        for rank, score in enumerate(scores, start=1):
            score.rank = rank

        # Save to database
        for score in scores:
            self.db.add(score)

        self.db.commit()

        # Refresh to get relationships
        for score in scores:
            self.db.refresh(score)

        return scores

    def _calculate_score(self, candidate: Candidate, job: Job) -> CandidateScore:
        """Calculate matching score for a candidate against a job"""
        # Initialize score components
        skills_score = 0.0
        experience_score = 0.0
        keywords_score = 0.0

        matched_skills = []
        missing_skills = []

        # 1. Skills matching (50% weight)
        candidate_skills = set([s.lower() for s in (candidate.skills or [])])
        required_skills = set([s.lower() for s in (job.required_skills or [])])
        nice_to_have = set([s.lower() for s in (job.nice_to_have or [])])

        if required_skills:
            matched_required = candidate_skills.intersection(required_skills)
            matched_skills.extend(matched_required)
            missing_skills.extend(required_skills - matched_required)

            # Required skills score
            skills_score = (len(matched_required) / len(required_skills)) * 50

            # Bonus for nice-to-have skills
            if nice_to_have:
                matched_nice = candidate_skills.intersection(nice_to_have)
                matched_skills.extend(matched_nice)
                skills_score += (len(matched_nice) / len(nice_to_have)) * 10

        skills_score = min(skills_score, 50)  # Cap at 50

        # 2. Experience matching (30% weight)
        if job.minimum_experience > 0:
            exp_ratio = candidate.years_of_experience / job.minimum_experience
            if exp_ratio >= 1.0:
                experience_score = 30
            elif exp_ratio >= 0.7:
                experience_score = 20
            elif exp_ratio >= 0.5:
                experience_score = 10
            else:
                experience_score = 5
        else:
            experience_score = 15  # Default if no minimum specified

        # 3. Keywords matching (20% weight)
        if job.keywords:
            candidate_text = (candidate.raw_text or "").lower()
            matched_keywords = sum(
                1 for keyword in job.keywords if keyword.lower() in candidate_text
            )
            keywords_score = (matched_keywords / len(job.keywords)) * 20
        else:
            keywords_score = 10  # Default if no keywords

        # Total score
        total_score = skills_score + experience_score + keywords_score

        # Generate explanation
        explanation = self._generate_explanation(
            candidate,
            job,
            total_score,
            skills_score,
            experience_score,
            keywords_score,
            matched_skills,
            missing_skills,
        )

        # Create score record
        score = CandidateScore(
            candidate_id=candidate.id,
            job_id=job.id,
            total_score=round(total_score, 2),
            skills_score=round(skills_score, 2),
            experience_score=round(experience_score, 2),
            keywords_score=round(keywords_score, 2),
            explanation=explanation,
            matched_skills=list(matched_skills),
            missing_skills=list(missing_skills),
        )

        return score

    def _generate_explanation(
        self,
        candidate: Candidate,
        job: Job,
        total_score: float,
        skills_score: float,
        experience_score: float,
        keywords_score: float,
        matched_skills: List[str],
        missing_skills: List[str],
    ) -> str:
        """Generate human-readable explanation for the ranking"""
        explanation_parts = []

        # Overall score
        if total_score >= 80:
            explanation_parts.append("Excellent match for this position.")
        elif total_score >= 60:
            explanation_parts.append("Good match for this position.")
        elif total_score >= 40:
            explanation_parts.append("Moderate match for this position.")
        else:
            explanation_parts.append("Partial match for this position.")

        # Skills explanation
        if matched_skills:
            explanation_parts.append(
                f"Matched {len(matched_skills)} required/preferred skills: {', '.join(matched_skills[:5])}."
            )

        if missing_skills:
            explanation_parts.append(
                f"Missing {len(missing_skills)} required skills: {', '.join(missing_skills[:3])}."
            )

        # Experience explanation
        exp_years = candidate.years_of_experience
        min_exp = job.minimum_experience

        if exp_years >= min_exp:
            explanation_parts.append(
                f"Has {exp_years} years of experience (meets the {min_exp} year requirement)."
            )
        else:
            explanation_parts.append(
                f"Has {exp_years} years of experience (below the {min_exp} year requirement)."
            )

        # Keywords
        if keywords_score >= 15:
            explanation_parts.append("Strong keyword alignment with job description.")
        elif keywords_score >= 10:
            explanation_parts.append("Moderate keyword alignment with job description.")

        return " ".join(explanation_parts)
