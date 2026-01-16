# Quick Start Guide

## Prerequisites
- Python 3.11+
- Node.js 18+
- Git

## Installation (5 minutes)

### 1. Clone the Repository
```bash
cd "/Users/Gazal.Agbaria/Desktop/final project"
```

### 2. Setup Backend
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Initialize database and seed data
python scripts/seed_data.py

# Run backend server
uvicorn app.main:app --reload
```

Backend will run at: http://localhost:8000  
API Docs: http://localhost:8000/docs

### 3. Setup Frontend (New Terminal)
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run at: http://localhost:5173

## First Login

Open http://localhost:5173 in your browser

**Admin Account:**
- Email: admin@example.com
- Password: admin123

**Recruiter Account:**
- Email: recruiter@example.com
- Password: recruiter123

## Quick Test Workflow

1. Login as recruiter
2. Go to "Upload CVs"
3. Select sample CVs from `data/sample_cvs/`
4. Upload and wait for parsing
5. Go to "Jobs" → Select "Senior Python Developer"
6. Click "Rank Candidates"
7. View ranked results!

## Running Tests

### Backend Tests
```bash
cd backend
pytest tests/ -v
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## Common Issues

**Issue:** Database errors  
**Solution:** Delete `cv_sorting.db` and run `python scripts/seed_data.py` again

**Issue:** Port already in use  
**Solution:** Change port in backend config or kill process on port 8000/5173

**Issue:** Module not found  
**Solution:** Ensure virtual environment is activated

## Next Steps

- Read full [README.md](README.md)
- Review [User Stories](docs/user-stories.md)
- Check [Architecture](docs/architecture.md)
- See [AI Prompts Log](docs/ai-prompts-log.md)
