"""Unit tests for CV parser"""

import pytest
import os
from app.utils.cv_parser import CVParser


@pytest.fixture
def parser():
    """Create a CV parser instance"""
    return CVParser()


def test_extract_email(parser):
    """Test email extraction"""
    text = "Contact me at john.doe@example.com for more info"
    email = parser._extract_email(text)
    assert email == "john.doe@example.com"


def test_extract_phone(parser):
    """Test phone number extraction"""
    text = "Call me at 123-456-7890"
    phone = parser._extract_phone(text)
    assert phone is not None
    assert "123" in phone


def test_estimate_experience(parser):
    """Test experience estimation"""
    # Test explicit years mention
    text1 = "5 years of experience in software development"
    years1 = parser._estimate_experience(text1)
    assert years1 == 5.0
    
    # Test year range
    text2 = "Worked from 2018 to 2022"
    years2 = parser._estimate_experience(text2)
    assert years2 == 4.0
    
    # Test another pattern
    text3 = "Experience: 3 years"
    years3 = parser._estimate_experience(text3)
    assert years3 == 3.0
    
    # Test no experience found
    text4 = "Just graduated"
    years4 = parser._estimate_experience(text4)
    assert years4 == 0.0


def test_extract_skills(parser):
    """Test skill extraction"""
    # Set up taxonomy
    parser.skills_taxonomy = {
        "technical": ["Python", "JavaScript", "Docker"],
        "soft": ["Leadership", "Communication"],
        "languages": ["English"]
    }
    
    text = "Experienced with Python, JavaScript, and Docker"
    skills = parser._extract_skills(text)
    
    assert "Python" in skills
    assert "JavaScript" in skills
    assert "Docker" in skills
