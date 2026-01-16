"""Main FastAPI application"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import init_db
from app.routes import auth, candidates, jobs, matching, reports, users

# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description="CV Sorting & Candidate Recommendation System"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(candidates.router)
app.include_router(jobs.router)
app.include_router(matching.router)
app.include_router(reports.router)
app.include_router(users.router)


@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    init_db()


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "CV Sorting & Candidate Recommendation System API",
        "version": settings.version,
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
