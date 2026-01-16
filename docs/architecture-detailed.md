# System Architecture
## CV Sorting & Candidate Recommendation System

**Document Version:** 1.0  
**Date:** January 16, 2026  
**Project:** PROCV - CV Sorting System

---

## 🏗️ ARCHITECTURE OVERVIEW

### System Type
**3-Tier Web Application Architecture**
- **Presentation Layer:** React Frontend
- **Application Layer:** FastAPI Backend
- **Data Layer:** SQLite Database + File Storage

### Deployment Model
**Monolithic with Microservice-Ready Design**
- Single deployment unit (development/demo)
- Modular structure for future separation
- RESTful API for frontend-backend communication

---

## 📊 HIGH-LEVEL ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Web Browser (Chrome, Firefox, Safari)      │    │
│  │                                                          │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │    │
│  │  │ Login    │  │Dashboard │  │ Reports  │             │    │
│  │  │ Page     │  │   Page   │  │  Page    │   ... more   │    │
│  │  └──────────┘  └──────────┘  └──────────┘             │    │
│  └─────────────────────────────────────────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                        HTTPS / REST API
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                     PRESENTATION LAYER                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │           React 18 + TypeScript + Vite                  │    │
│  │                                                          │    │
│  │  Components:                State Management:           │    │
│  │  - Navbar        - Forms     Zustand Store             │    │
│  │  - Dashboard     - Tables    - authStore               │    │
│  │  - Job Cards     - Charts    - jobStore (future)       │    │
│  │  - CV Upload     - Modals    - candidateStore (future) │    │
│  │                                                          │    │
│  │  Services:                                              │    │
│  │  - api.ts (Axios HTTP client)                          │    │
│  │  - auth interceptors                                    │    │
│  └─────────────────────────────────────────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                          HTTP/JSON (Port 8000)
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                    APPLICATION LAYER                             │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Python 3.9+ FastAPI Backend                │    │
│  │                                                          │    │
│  │  API Routes:                                            │    │
│  │  ┌────────────────────────────────────────────┐        │    │
│  │  │ /auth/*     - Authentication endpoints     │        │    │
│  │  │ /users/*    - User management (admin)      │        │    │
│  │  │ /candidates/* - CV upload & management     │        │    │
│  │  │ /jobs/*     - Job position CRUD            │        │    │
│  │  │ /matching/* - Ranking algorithm            │        │    │
│  │  │ /reports/*  - Analytics & reporting        │        │    │
│  │  │ /audit/*    - Audit log retrieval          │        │    │
│  │  └────────────────────────────────────────────┘        │    │
│  │                                                          │    │
│  │  Services:                                              │    │
│  │  ┌────────────────────────────────────────────┐        │    │
│  │  │ matching_service.py - Ranking algorithm    │        │    │
│  │  │ audit_service.py    - Audit logging        │        │    │
│  │  │ cv_parser.py        - NLP text extraction  │        │    │
│  │  │ auth.py             - JWT & security       │        │    │
│  │  └────────────────────────────────────────────┘        │    │
│  │                                                          │    │
│  │  Middleware:                                            │    │
│  │  - CORS handler                                         │    │
│  │  - JWT authentication                                   │    │
│  │  - Audit logging interceptor                           │    │
│  │  - Error handling                                       │    │
│  └─────────────────────────────────────────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                      SQLAlchemy ORM / File I/O
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                       DATA LAYER                                 │
│                                                                   │
│  ┌─────────────────────────┐     ┌──────────────────────────┐   │
│  │   SQLite Database       │     │   File Storage           │   │
│  │                         │     │                          │   │
│  │  Tables:                │     │  storage/                │   │
│  │  - users                │     │  ├─ cvs/                 │   │
│  │  - candidates           │     │  │  ├─ candidate_1.pdf   │   │
│  │  - jobs                 │     │  │  ├─ candidate_2.docx  │   │
│  │  - skills               │     │  │  └─ ...               │   │
│  │  - candidate_skills     │     │  └─ temp/               │   │
│  │  - job_skills           │     │                          │   │
│  │  - match_results        │     │                          │   │
│  │  - audit_logs           │     │  External Data:          │   │
│  │                         │     │  ├─ skills_taxonomy.json │   │
│  │  Indexes:               │     │  └─ sample_cvs/         │   │
│  │  - users.email          │     │                          │   │
│  │  - audit_logs.timestamp │     │                          │   │
│  │  - jobs.status          │     │                          │   │
│  └─────────────────────────┘     └──────────────────────────┘   │
└───────────────────────────────────────────────────────────────────┘
```

---

## 🔐 SECURITY ARCHITECTURE

### Access Control Matrix

| Feature | HR_ADMIN | HR_RECRUITER | Guest |
|---------|----------|--------------|-------|
| Login | ✓ | ✓ | ✓ |
| View Dashboard | ✓ | ✓ | ✗ |
| Upload CVs | ✓ | ✓ | ✗ |
| Create Jobs | ✓ | ✓ | ✗ |
| Run Ranking | ✓ | ✓ | ✗ |
| View All Reports | ✓ | ✗ | ✗ |
| View Own Reports | ✓ | ✓ | ✗ |
| View Audit Logs | ✓ | ✗ | ✗ |
| Manage Users | ✓ | ✗ | ✗ |
| System Config | ✓ | ✗ | ✗ |

---

## 🔌 API ARCHITECTURE

### RESTful API Endpoints

```
/api/
  │
  ├─ /auth/
  │    ├─ POST   /login         - User authentication
  │    ├─ POST   /logout        - Terminate session
  │    └─ POST   /refresh       - Refresh JWT token
  │
  ├─ /users/
  │    ├─ GET    /              - List all users (ADMIN)
  │    ├─ POST   /              - Create user (ADMIN)
  │    ├─ GET    /{id}          - Get user details
  │    ├─ PUT    /{id}          - Update user (ADMIN)
  │    └─ DELETE /{id}          - Deactivate user (ADMIN)
  │
  ├─ /candidates/
  │    ├─ GET    /              - List all candidates
  │    ├─ POST   /upload-cv     - Upload CV file(s)
  │    ├─ GET    /{id}          - Get candidate details
  │    ├─ PUT    /{id}          - Update candidate info
  │    ├─ DELETE /{id}          - Delete candidate
  │    └─ GET    /{id}/cv       - Download CV file
  │
  ├─ /jobs/
  │    ├─ GET    /              - List all jobs
  │    ├─ POST   /              - Create job position
  │    ├─ GET    /{id}          - Get job details
  │    ├─ PUT    /{id}          - Update job
  │    ├─ DELETE /{id}          - Delete job
  │    └─ GET    /{id}/candidates - Candidates for job
  │
  ├─ /matching/
  │    ├─ POST   /rank          - Run ranking algorithm
  │    ├─ GET    /results/{job_id} - Get match results
  │    └─ GET    /explain/{candidate_id}/{job_id} - Explain score
  │
  ├─ /reports/
  │    ├─ GET    /top-skills    - Skills frequency report
  │    ├─ GET    /pipeline-stats - Pipeline statistics
  │    ├─ GET    /time-to-hire  - Time-to-hire metrics
  │    └─ POST   /export        - Export report (PDF/CSV)
  │
  └─ /audit/
       ├─ GET    /logs          - Retrieve audit logs
       └─ POST   /export        - Export logs (CSV)
```

---

## 📦 DATA SOURCES

The system integrates **4 distinct data sources**:

### 1. Database Tables (SQLite/PostgreSQL)
- **users** - User accounts and authentication
- **candidates** - Candidate profiles and metadata
- **jobs** - Job positions and requirements
- **skills** - Skills taxonomy
- **candidate_skills** - Candidate skill mappings
- **job_skills** - Job skill requirements
- **match_results** - Ranking algorithm results
- **audit_logs** - System activity logs

### 2. Uploaded CV Files (File System)
- **Location:** `storage/cvs/`
- **Formats:** PDF, TXT, DOCX
- **Purpose:** Original candidate resumes
- **Access:** Backend file serving endpoint

### 3. Skills Taxonomy JSON (Static Data)
- **File:** `data/skills_taxonomy.json`
- **Purpose:** Standardized skills catalog
- **Structure:** Skills with categories and synonyms
- **Usage:** Skills matching and normalization

### 4. Audit Logs Table (Database)
- **Table:** `audit_logs`
- **Purpose:** Compliance and security tracking
- **Fields:** user_id, action, timestamp, IP, details
- **Retention:** Configurable (default: 2 years)

---

**END OF ARCHITECTURE DOCUMENT**
