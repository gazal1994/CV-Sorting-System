"""Authentication routes"""

from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import Token, LoginRequest, UserCreate, UserResponse
from app.utils.auth import (
    authenticate_user,
    create_access_token,
    get_password_hash,
    get_current_admin_user,
)
from app.models import User
from app.config import settings
from app.services.audit_service import AuditService

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/login", response_model=Token)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate user and return JWT token"""
    user = authenticate_user(db, request.email, request.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    # Create access token
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    # Log the action
    AuditService.log_action(
        db=db, action="user_login", user_id=user.id, details={"email": user.email}
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", response_model=UserResponse)
async def register(
    user_data: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    """Register a new user (admin only)"""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    # Create new user
    new_user = User(
        email=user_data.email,
        full_name=user_data.full_name,
        role=user_data.role,
        hashed_password=get_password_hash(user_data.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Log the action
    AuditService.log_action(
        db=db,
        action="user_created",
        user_id=current_user.id,
        entity_type="user",
        entity_id=new_user.id,
        details={"email": new_user.email, "role": new_user.role},
    )

    return new_user
