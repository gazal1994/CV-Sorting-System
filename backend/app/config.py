"""Application configuration settings"""

from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    # Application
    app_name: str = "CV Sorting System"
    debug: bool = True
    version: str = "1.0.0"

    # Database
    database_url: str = "sqlite:///./cv_sorting.db"

    # Security
    secret_key: str = "dev-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # File Storage
    storage_path: str = "./storage"
    max_file_size: int = 10485760  # 10MB

    # CORS
    allowed_origins: List[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://192.168.68.121:5173",
        "http://192.168.68.121:5174",
    ]

    class Config:
        env_file = ".env"
        case_sensitive = False


# Create settings instance
settings = Settings()

# Ensure storage directory exists
os.makedirs(settings.storage_path, exist_ok=True)
os.makedirs(f"{settings.storage_path}/cvs", exist_ok=True)
