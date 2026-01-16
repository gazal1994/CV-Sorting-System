# CV Sorting & Candidate Recommendation System

A comprehensive Agile project for automated CV parsing, candidate ranking, and job matching.

## 📋 Project Overview

This system allows HR professionals to:
- Upload candidate CVs (PDF, DOCX, TXT)
- Parse and extract structured information
- Create and manage job positions
- Automatically rank candidates against job requirements
- Generate detailed reports and analytics
- Manage users with role-based access control

## 🏗️ Architecture

### Tech Stack
- **Backend**: Python 3.11+ with FastAPI
- **Database**: PostgreSQL (or SQLite for local development)
- **Frontend**: React 18 + TypeScript + Vite
- **Authentication**: JWT with role-based access
- **Testing**: pytest (backend), Vitest + React Testing Library (frontend)
- **CI/CD**: GitHub Actions

### Data Sources (4+)
1. **Relational Database**: PostgreSQL with tables for users, jobs, candidates, scores, audit logs
2. **File Storage**: Local storage directory (`storage/`) for uploaded CVs
3. **Skills Taxonomy**: JSON dataset (`skills_taxonomy.json`) for skill matching
4. **Audit Logs**: Application logs and analytics data stored in DB

## 🚀 Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 14+ (or use SQLite)
- pip and npm

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup database
# For PostgreSQL:
createdb cv_sorting_system

# For SQLite (default):
# Database will be created automatically

# Run migrations
alembic upgrade head

# Seed initial data
python scripts/seed_data.py

# Run the server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at: http://localhost:8000
API documentation: http://localhost:8000/docs

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will be available at: http://localhost:5173

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
pytest tests/ -v --cov=app --cov-report=html
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## 👥 User Roles

### HR_ADMIN
- Full system access
- Manage users and permissions
- View all reports and analytics
- Manage job positions
- Access audit logs

### HR_RECRUITER
- Upload and manage CVs
- Create and edit job positions
- View candidate rankings
- Generate reports
- Limited admin access

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (admin only)
- `POST /api/auth/refresh` - Refresh JWT token

### Candidates
- `POST /api/candidates/upload` - Upload CV files
- `GET /api/candidates` - List all candidates
- `GET /api/candidates/{id}` - Get candidate details
- `PUT /api/candidates/{id}` - Update candidate info
- `DELETE /api/candidates/{id}` - Delete candidate

### Jobs
- `POST /api/jobs` - Create job position
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/{id}` - Get job details
- `PUT /api/jobs/{id}` - Update job
- `DELETE /api/jobs/{id}` - Delete job

### Matching & Ranking
- `POST /api/matching/rank` - Rank candidates for a job
- `GET /api/matching/results/{job_id}` - Get ranking results

### Reports
- `GET /api/reports/skills-frequency/{job_id}` - Top skills frequency report
- `GET /api/reports/pipeline-stats` - Candidate pipeline statistics
- `GET /api/reports/audit-logs` - System audit logs (admin only)

### Users (Admin Only)
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## 🖥️ Frontend Pages

1. **Login** (`/login`) - User authentication
2. **Dashboard** (`/dashboard`) - Overview and quick actions
3. **Candidates** (`/candidates`) - List and manage candidates
4. **Candidate Details** (`/candidates/:id`) - View single candidate
5. **Upload CVs** (`/upload`) - Bulk CV upload interface
6. **Jobs** (`/jobs`) - List and manage job positions
7. **Create/Edit Job** (`/jobs/new`, `/jobs/:id/edit`) - Job form
8. **Ranking Results** (`/jobs/:id/ranking`) - View ranked candidates
9. **Reports** (`/reports`) - Analytics and reports dashboard
10. **User Management** (`/admin/users`) - Admin user management

## 📝 Example Usage

### 1. Upload CVs

```bash
curl -X POST "http://localhost:8000/api/candidates/upload" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "files=@cv1.pdf" \
  -F "files=@cv2.docx"
```

### 2. Create Job Position

```bash
curl -X POST "http://localhost:8000/api/jobs" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Python Developer",
    "required_skills": ["Python", "FastAPI", "PostgreSQL"],
    "nice_to_have": ["Docker", "AWS"],
    "minimum_experience": 3,
    "keywords": ["backend", "API", "microservices"]
  }'
```

### 3. Rank Candidates

```bash
curl -X POST "http://localhost:8000/api/matching/rank" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "job_id": 1
  }'
```

## 🔒 Default Credentials

```
Admin User:
  Email: admin@example.com
  Password: admin123

Recruiter User:
  Email: recruiter@example.com
  Password: recruiter123
```

## 📂 Project Structure

```
final project/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── config.py
│   ├── tests/
│   ├── storage/
│   ├── alembic/
│   ├── requirements.txt
│   └── pytest.ini
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── docs/
│   ├── project-charter.md
│   ├── personas.md
│   ├── user-stories.md
│   ├── architecture.md
│   └── ai-prompts-log.md
├── scripts/
│   └── seed_data.py
├── data/
│   ├── skills_taxonomy.json
│   └── sample_cvs/
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```

## 🔄 E2E Processes

### Process 1: CV Upload to Ranking
1. HR Recruiter logs in
2. Uploads multiple CV files
3. System parses and extracts candidate information
4. Creates/selects job position
5. Triggers ranking algorithm
6. Views ranked candidates with explanations
7. Exports results

### Process 2: Job Management & Reporting
1. HR Admin logs in
2. Creates new job position with requirements
3. System matches against existing candidates
4. Generates skills frequency report
5. Reviews pipeline statistics
6. Analyzes audit logs

## 🧪 Testing Strategy

- **Unit Tests**: Individual functions and services
- **Integration Tests**: API endpoints with database
- **E2E Tests**: Complete user workflows
- **Coverage Target**: >80%

## 📈 CI/CD Pipeline

GitHub Actions workflow runs on every push:
1. Lint code (flake8, ESLint)
2. Run unit tests
3. Run integration tests
4. Generate coverage reports
5. Build artifacts

## 📚 Documentation

See `/docs` folder for:
- Project Charter
- Personas & Scenarios
- User Stories (8+ stories)
- Architecture Diagrams
- AI Usage Documentation

## 🤝 Contributing

1. Create feature branch from `main`
2. Follow naming: `feature/US1-description` or `bugfix/issue-description`
3. Write tests for new features
4. Submit PR with Jira ticket reference

## 📄 License

MIT License - Educational Project
