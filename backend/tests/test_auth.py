"""Unit tests for authentication utilities"""

import pytest
from app.utils.auth import verify_password, get_password_hash, create_access_token


def test_password_hashing():
    """Test password hashing and verification"""
    password = "testpassword123"
    hashed = get_password_hash(password)
    
    # Hash should be different from original
    assert hashed != password
    
    # Verification should succeed
    assert verify_password(password, hashed) is True
    
    # Wrong password should fail
    assert verify_password("wrongpassword", hashed) is False


def test_create_access_token():
    """Test JWT token creation"""
    data = {"sub": "test@example.com"}
    token = create_access_token(data)
    
    # Token should be a string
    assert isinstance(token, str)
    
    # Token should have content
    assert len(token) > 0
