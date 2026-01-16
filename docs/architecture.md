# System Architecture

## Overview
The CV Sorting & Candidate Recommendation System follows a modern 3-tier architecture with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend Layer                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           React 18 + TypeScript + Vite              │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │   │
│  │  │  Pages   │ │Components│ │ Services │           │   │
│  │  │ ────────  │ │──────────│ │──────────│           │   │
│  │  │ Login    │ │  Navbar  │ │   API    │           │   │
│  │  │Dashboard │ │  Forms   │ │  Client  │           │   │
│  │  │Candidates│ │  Tables  │ │          │           │   │
│  │  │  Jobs    │ │  Cards   │ │          │           │   │
│  │  │ Reports  │ │          │ │          │           │   │
│  │  └──────────┘ └──────────┘ └──────────┘           │   │
│  │                                                     │   │
│  │  State: Zustand (Auth Store)                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP/REST (JSON)
                           │ JWT Token Auth
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend Layer (API)                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              FastAPI (Python 3.11+)                 │   │
│  │                                                      │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │           API Routes (REST)                  │  │   │
│  │  │  /api/auth      - Authentication            │  │   │
│  │  │  /api/candidates - CV Management            │  │   │
│  │  │  /api/jobs      - Job Positions             │  │   │
│  │  │  /api/matching  - Ranking Algorithm         │  │   │
│  │  │  /api/reports   - Analytics                 │  │   │
│  │  │  /api/users     - User Management (Admin)   │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                                                      │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │              Services Layer                  │  │   │
│  │  │  • MatchingService  - Scoring algorithm     │  │   │
│  │  │  • AuditService     - Action logging        │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                                                      │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │              Utilities                       │  │   │
│  │  │  • CVParser         - File parsing          │  │   │
│  │  │  • Auth Utils       - JWT, passwords        │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                                                      │   │
│  │  Middleware: CORS, Authentication, Error Handling   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ SQLAlchemy ORM
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Layer (4 Sources)                   │
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │ DATA SOURCE 1:       │  │ DATA SOURCE 2:       │        │
│  │ PostgreSQL / SQLite  │  │ File Storage         │        │
│  │ ──────────────────   │  │ ──────────────────   │        │
│  │ Tables:              │  │ storage/cvs/         │        │
│  │ • users              │  │ • cv1.pdf            │        │
│  │ • candidates         │  │ • cv2.docx           │        │
│  │ • jobs               │  │ • cv3.txt            │        │
│  │ • candidate_scores   │  │ • ...                │        │
│  │ • audit_logs         │  │                      │        │
│  └──────────────────────┘  └──────────────────────┘        │
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │ DATA SOURCE 3:       │  │ DATA SOURCE 4:       │        │
│  │ Skills Taxonomy      │  │ Analytics/Logs       │        │
│  │ ──────────────────   │  │ ──────────────────   │        │
│  │ data/               │  │ audit_logs table     │        │
│  │ skills_taxonomy.json│  │ + Application logs   │        │
│  │ {                   │  │                      │        │
│  │   "technical": [...] │  │ Logged actions:      │        │
│  │   "soft": [...]     │  │ • cv_uploaded        │        │
│  │   "languages": [...] │  │ • ranking_executed   │        │
│  │ }                   │  │ • user_created       │        │
│  └──────────────────────┘  └──────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow: CV Upload to Ranking

```
1. User uploads CV files
   └→ Frontend: File input
       └→ API POST /api/candidates/upload
           └→ Save to storage/cvs/
           └→ CVParser.parse_file()
               ├→ Extract text (PDF/DOCX/TXT)
               ├→ Load skills_taxonomy.json (DATA SOURCE 3)
               ├→ Extract: name, email, skills, experience
               └→ Create Candidate record (DATA SOURCE 1)
           └→ Log action to audit_logs (DATA SOURCE 4)
           └→ Return parse results

2. User creates job position
   └→ Frontend: Job form
       └→ API POST /api/jobs
           └→ Create Job record (DATA SOURCE 1)
           └→ Log action to audit_logs (DATA SOURCE 4)
           └→ Return job object

3. User triggers ranking
   └→ Frontend: Click "Rank Candidates"
       └→ API POST /api/matching/rank
           └→ MatchingService.rank_candidates_for_job()
               ├→ Fetch all candidates (DATA SOURCE 1)
               ├→ Fetch job requirements (DATA SOURCE 1)
               ├→ For each candidate:
               │   ├→ Calculate skills_score (50%)
               │   ├→ Calculate experience_score (30%)
               │   ├→ Calculate keywords_score (20%)
               │   ├→ Generate explanation
               │   └→ Create CandidateScore record
               └→ Sort by score, assign ranks
           └→ Save to candidate_scores table (DATA SOURCE 1)
           └→ Log action to audit_logs (DATA SOURCE 4)
           └→ Return ranked list

4. User views results
   └→ Frontend: Ranking results page
       └→ API GET /api/matching/results/{job_id}
           └→ Query candidate_scores (DATA SOURCE 1)
           └→ Join with candidates table
           └→ Return ranked candidates with details
```

## Component Interactions

### Authentication Flow
```
Login Request
  → Backend validates credentials
  → Generate JWT token (30min expiry)
  → Return token to frontend
  → Frontend stores in localStorage
  → All subsequent requests include: Authorization: Bearer {token}
  → Backend verifies token on each request
  → Extract user info from token
  → Check role permissions (HR_ADMIN or HR_RECRUITER)
```

### Role-Based Access Control
```
HR_RECRUITER can:
  ✓ Upload CVs
  ✓ View candidates
  ✓ Create/edit jobs
  ✓ Run rankings
  ✓ View reports
  ✗ Manage users
  ✗ View audit logs (admin only)

HR_ADMIN can:
  ✓ All recruiter permissions
  ✓ Manage users (create, edit, delete)
  ✓ View audit logs
  ✓ Access all reports
```

## Technology Stack Details

### Frontend
- **Framework:** React 18.2
- **Language:** TypeScript 5.3
- **Build Tool:** Vite 5.0
- **Routing:** React Router DOM 6.21
- **State Management:** Zustand 4.4
- **HTTP Client:** Axios 1.6
- **Styling:** CSS Modules

### Backend
- **Framework:** FastAPI 0.109
- **Language:** Python 3.11+
- **ASGI Server:** Uvicorn 0.27
- **ORM:** SQLAlchemy 2.0
- **Migrations:** Alembic 1.13
- **Auth:** python-jose (JWT)
- **Password:** passlib + bcrypt
- **File Parsing:** PyPDF2, python-docx

### Database
- **Primary:** PostgreSQL 14+ (or SQLite for dev)
- **Schema:** 5 tables (users, candidates, jobs, candidate_scores, audit_logs)

### Testing
- **Backend:** pytest 7.4, pytest-asyncio, pytest-cov
- **Frontend:** Vitest 1.2, React Testing Library
- **Coverage Target:** 80%

### DevOps
- **CI/CD:** GitHub Actions
- **Version Control:** Git
- **Containerization:** Docker (optional)

## Security Architecture

### Authentication & Authorization
- JWT tokens with RS256 algorithm
- Password hashing with bcrypt (cost factor: 12)
- Token expiration: 30 minutes
- Role-based access control (RBAC)

### Data Protection
- Passwords never stored in plain text
- API requires authentication for all endpoints (except login)
- CORS configured for allowed origins only
- Input validation on all endpoints
- SQL injection prevention (ORM parameterized queries)

### Audit Trail
- All actions logged with: user, timestamp, action type, entity
- Immutable audit logs
- Admin-only access to logs

## Scalability Considerations

### Current Architecture (MVP)
- Single server deployment
- SQLite/PostgreSQL database
- Local file storage
- Synchronous processing

### Future Enhancements
- **Horizontal Scaling:** Load balancer + multiple API servers
- **Database:** Read replicas, connection pooling
- **File Storage:** S3 or cloud storage
- **Caching:** Redis for frequently accessed data
- **Async Processing:** Celery for CV parsing jobs
- **Message Queue:** RabbitMQ for background tasks

## Deployment Architecture

```
Development Environment:
  ├─ Local SQLite database
  ├─ Backend on localhost:8000
  ├─ Frontend on localhost:5173
  └─ Proxy: Vite proxies /api → localhost:8000

Production Environment (Proposed):
  ├─ PostgreSQL (managed service)
  ├─ Backend: Gunicorn + Uvicorn workers
  ├─ Frontend: Static files on CDN
  ├─ Reverse Proxy: Nginx
  └─ SSL/TLS certificates
```

## API Architecture

### RESTful Design Principles
- Resource-based URLs
- HTTP methods: GET (read), POST (create), PUT (update), DELETE (delete)
- JSON request/response format
- HTTP status codes: 200, 201, 400, 401, 403, 404, 500
- Consistent error response format

### API Versioning
- Current: /api/* (v1 implicit)
- Future: /api/v2/* (when breaking changes needed)

---

**Document Version:** 1.0  
**Last Updated:** January 16, 2026
