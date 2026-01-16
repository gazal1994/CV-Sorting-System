"""CV parsing utilities - Extract information from PDF, DOCX, and TXT files"""

import re
import os
from typing import Dict, List, Optional, Tuple
import PyPDF2
import docx
import json


class CVParser:
    """Parse CV files and extract structured information"""

    def __init__(self, skills_taxonomy_path: str = "./data/skills_taxonomy.json"):
        """Initialize parser with skills taxonomy"""
        self.skills_taxonomy = self._load_skills_taxonomy(skills_taxonomy_path)

    def _load_skills_taxonomy(self, path: str) -> Dict:
        """Load skills taxonomy from JSON file"""
        if os.path.exists(path):
            with open(path, "r") as f:
                return json.load(f)
        return {"technical": [], "soft": [], "languages": []}

    def parse_file(self, file_path: str, file_type: str) -> Dict:
        """Parse a CV file and extract structured information"""
        try:
            # Extract text based on file type
            text = self._extract_text(file_path, file_type)

            if not text:
                return {"success": False, "error": "Could not extract text from file"}

            # Extract structured information
            data = {
                "name": self._extract_name(text),
                "email": self._extract_email(text),
                "phone": self._extract_phone(text),
                "education": self._extract_education(text),
                "years_of_experience": self._estimate_experience(text),
                "skills": self._extract_skills(text),
                "languages": self._extract_languages(text),
                "raw_text": text,
            }

            return {"success": True, "data": data}

        except Exception as e:
            return {"success": False, "error": str(e)}

    def _extract_text(self, file_path: str, file_type: str) -> str:
        """Extract text from file based on type"""
        if file_type == "pdf":
            return self._extract_from_pdf(file_path)
        elif file_type == "docx":
            return self._extract_from_docx(file_path)
        elif file_type == "txt":
            return self._extract_from_txt(file_path)
        else:
            raise ValueError(f"Unsupported file type: {file_type}")

    def _extract_from_pdf(self, file_path: str) -> str:
        """Extract text from PDF file"""
        text = ""
        with open(file_path, "rb") as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text

    def _extract_from_docx(self, file_path: str) -> str:
        """Extract text from DOCX file"""
        doc = docx.Document(file_path)
        text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
        return text

    def _extract_from_txt(self, file_path: str) -> str:
        """Extract text from TXT file"""
        with open(file_path, "r", encoding="utf-8", errors="ignore") as file:
            return file.read()

    def _extract_name(self, text: str) -> str:
        """Extract candidate name (first few words)"""
        lines = text.strip().split("\n")

        # Try first non-empty line
        for line in lines[:5]:
            line = line.strip()
            if line and len(line) < 100:
                # Clean and return first line that looks like a name
                name = re.sub(r"[^a-zA-Z\s]", "", line).strip()
                if name and 2 <= len(name.split()) <= 4:
                    return name

        return "Unknown"

    def _extract_email(self, text: str) -> Optional[str]:
        """Extract email address"""
        email_pattern = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"
        match = re.search(email_pattern, text)
        return match.group(0) if match else None

    def _extract_phone(self, text: str) -> Optional[str]:
        """Extract phone number"""
        phone_patterns = [
            r"\+?1?\d{9,15}",  # International format
            r"\(\d{3}\)\s*\d{3}-\d{4}",  # (123) 456-7890
            r"\d{3}-\d{3}-\d{4}",  # 123-456-7890
        ]

        for pattern in phone_patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(0)

        return None

    def _extract_education(self, text: str) -> str:
        """Extract education information"""
        education_keywords = [
            "bachelor",
            "master",
            "phd",
            "doctorate",
            "mba",
            "b.sc",
            "m.sc",
            "university",
            "college",
            "degree",
            "diploma",
        ]

        lines = text.lower().split("\n")
        education_lines = []

        for line in lines:
            if any(keyword in line for keyword in education_keywords):
                education_lines.append(line.strip())

        return "; ".join(education_lines[:3]) if education_lines else "Not specified"

    def _estimate_experience(self, text: str) -> float:
        """Estimate years of experience"""
        # Look for explicit experience mentions
        exp_patterns = [
            r"(\d+)\+?\s*years?\s+(?:of\s+)?experience",
            r"experience[:\s]+(\d+)\+?\s*years?",
        ]

        for pattern in exp_patterns:
            match = re.search(pattern, text.lower())
            if match:
                return float(match.group(1))

        # Count year ranges (e.g., 2018-2022, 2018 to 2022)
        year_pattern = r"(20\d{2})\s*(?:[-–]|to)\s*(20\d{2}|present|current)"
        matches = re.findall(year_pattern, text.lower())

        if matches:
            total_years = 0
            current_year = 2026

            for start, end in matches:
                end_year = current_year if end in ["present", "current"] else int(end)
                total_years += max(0, end_year - int(start))

            return min(float(total_years), 50.0)  # Cap at 50 years

        return 0.0

    def _extract_skills(self, text: str) -> List[str]:
        """Extract technical and soft skills"""
        text_lower = text.lower()
        found_skills = []

        # Check against skills taxonomy
        all_skills = self.skills_taxonomy.get("technical", []) + self.skills_taxonomy.get(
            "soft", []
        )

        for skill in all_skills:
            if skill.lower() in text_lower:
                found_skills.append(skill)

        # Remove duplicates and return
        return list(set(found_skills))

    def _extract_languages(self, text: str) -> List[str]:
        """Extract spoken languages"""
        text_lower = text.lower()
        found_languages = []

        language_list = self.skills_taxonomy.get(
            "languages",
            [
                "English",
                "Spanish",
                "French",
                "German",
                "Chinese",
                "Japanese",
                "Arabic",
                "Russian",
                "Portuguese",
                "Italian",
                "Hebrew",
            ],
        )

        for language in language_list:
            if language.lower() in text_lower:
                found_languages.append(language)

        return list(set(found_languages))
