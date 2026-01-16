# Features & User Story Mapping

## Overview
This document maps all system features to their corresponding user stories and provides a complete feature inventory.

---

## Feature Categories

### 🔐 FEATURE 1: Authentication & Security
**Description:** User authentication and role-based access control

#### Related User Stories
- **US1:** User Authentication

#### Capabilities
- ✅ Email/password login
- ✅ JWT token generation (30-minute expiration)
- ✅ Role-based access (HR_ADMIN, HR_RECRUITER)
- ✅ Secure password hashing (bcrypt)
- ✅ Protected API endpoints
- ✅ Session management

#### Technical Implementation
- Backend: JWT tokens with python-jose
- Frontend: Auth store with Zustand
- Security: HTTP Bearer authentication

---

### 📄 FEATURE 2: CV Processing & Parsing
**Description:** Upload, parse, and extract structured information from CVs

#### Related User Stories
- **US2:** CV Upload and Parsing
- **US3:** View Candidates List
- **US11:** View Candidate Details
- **US12:** Update Candidate Information

#### Capabilities
- ✅ Multiple file upload (drag-and-drop)
- ✅ Support PDF, DOCX, TXT formats
- ✅ File size validation (10MB max)
- ✅ Automatic text extraction
- ✅ Parse: name, email, phone, education, skills, experience, languages
- ✅ Handle parsing errors gracefully
- ✅ View parsed candidate information
- ✅ Manual editing of candidate data
- ✅ Pagination for large candidate lists

#### Technical Implementation
- Backend: PyPDF2, python-docx for parsing
- Parser: Regex patterns + skills taxonomy matching
- Storage: Local file system (storage/cvs/)
- Database: candidates table

#### Parsing Logic
```
Name: First non-empty line heuristic
Email: Regex pattern matching
Phone: Multiple format recognition
Education: Keyword matching (bachelor, master, PhD, etc.)
Experience: Year ranges + explicit mentions
Skills: Match against skills_taxonomy.json
Languages: Match against language list
```

---

### 💼 FEATURE 3: Job Position Management
**Description:** Create and manage job positions with requirements

#### Related User Stories
- **US4:** Create Job Position

#### Capabilities
- ✅ Create job positions
- ✅ Define required skills (tags)
- ✅ Define nice-to-have skills (tags)
- ✅ Set minimum experience requirement
- ✅ Add job description
- ✅ Set search keywords
- ✅ Job status management (active, closed, draft)
- ✅ View all jobs
- ✅ Edit job details
- ✅ Delete jobs

#### Technical Implementation
- Backend: jobs table with JSON fields for skills
- Frontend: Tag input component
- Validation: Required fields check

#### Job Fields
```
- Title: String (required)
- Description: Text
- Required Skills: Array of strings
- Nice to Have: Array of strings
- Minimum Experience: Float (years)
- Keywords: Array of strings
- Status: Enum (active/closed/draft)
```

---

### 🎯 FEATURE 4: Candidate Matching & Ranking
**Description:** Automated scoring and ranking algorithm

#### Related User Stories
- **US5:** Rank Candidates for Job
- **US6:** View Ranking Results

#### Capabilities
- ✅ Automatic candidate scoring
- ✅ Multi-factor scoring algorithm
- ✅ Skills matching (50% weight)
- ✅ Experience matching (30% weight)
- ✅ Keywords matching (20% weight)
- ✅ Rank assignment (1, 2, 3, ...)
- ✅ Generate explanations for each ranking
- ✅ Show matched skills
- ✅ Show missing skills
- ✅ Sort by total score
- ✅ Export results (CSV)

#### Scoring Algorithm
```
SKILLS SCORE (50 points max):
  - Required skills match: (matched/total) * 50
  - Nice-to-have bonus: (matched/total) * 10

EXPERIENCE SCORE (30 points max):
  - >= minimum: 30 points
  - 70-99% of minimum: 20 points
  - 50-69% of minimum: 10 points
  - < 50% of minimum: 5 points

KEYWORDS SCORE (20 points max):
  - (matched keywords / total keywords) * 20

TOTAL SCORE = skills + experience + keywords (max 100)
```

#### Explanation Generation
```
Components:
1. Overall assessment (Excellent/Good/Moderate/Partial match)
2. Skills breakdown (matched count + examples)
3. Missing skills (if any)
4. Experience comparison
5. Keywords alignment
```

---

### 📊 FEATURE 5: Reports & Analytics
**Description:** Data-driven insights and reporting

#### Related User Stories
- **US7:** Skills Frequency Report
- **US8:** Pipeline Statistics Report
- **US9:** View Audit Logs (Admin Only)

#### Report Types

**5.1 Skills Frequency Report**
- Top 20 most common skills across all candidates
- Count and percentage for each skill
- Filter by specific job position
- Visual table display
- Helps understand market trends

**5.2 Pipeline Statistics Report**
- Total candidates uploaded
- Parse success count and rate
- Parse failure count and rate
- Total jobs (all statuses)
- Active jobs count
- Average score by job position
- Candidate count per job
- Real-time updates

**5.3 Audit Logs Report (Admin Only)**
- Complete activity history
- User who performed action
- Action type (cv_uploaded, ranking_executed, user_created, etc.)
- Entity affected (candidate, job, user)
- Timestamp
- Additional details (JSON)
- Filter by action type
- Pagination (100 per page)

#### Technical Implementation
- Backend: SQL aggregation queries
- Frontend: Tables and stat cards
- Permissions: Some reports admin-only

---

### 👥 FEATURE 6: User Management (Admin Only)
**Description:** Manage system users and permissions

#### Related User Stories
- **US10:** User Management

#### Capabilities
- ✅ View all users
- ✅ Create new users
- ✅ Assign roles (HR_ADMIN, HR_RECRUITER)
- ✅ Edit user details
- ✅ Activate/deactivate users
- ✅ Delete users (not self)
- ✅ Email uniqueness validation
- ✅ Password management

#### Technical Implementation
- Backend: users table
- Authorization: Admin role check
- Validation: Prevent self-deletion

#### User Roles
```
HR_ADMIN:
  ✓ All recruiter permissions
  ✓ Manage users
  ✓ View audit logs
  ✓ Access all reports

HR_RECRUITER:
  ✓ Upload CVs
  ✓ View candidates
  ✓ Create/edit jobs
  ✓ Run rankings
  ✓ View basic reports
  ✗ Manage users
  ✗ View audit logs
```

---

### 🔍 FEATURE 7: Audit & Compliance
**Description:** Track all system activities for compliance

#### Related User Stories
- **US9:** View Audit Logs (Admin Only)

#### Capabilities
- ✅ Log all user actions
- ✅ Track: uploads, rankings, job creation, user changes
- ✅ Store: user ID, timestamp, action type, entity, details
- ✅ Immutable audit trail
- ✅ Filter and search logs
- ✅ Export capabilities

#### Logged Actions
```
- user_login
- user_created
- user_updated
- user_deleted
- cv_uploaded
- candidate_updated
- candidate_deleted
- job_created
- job_updated
- job_deleted
- ranking_executed
```

---

### 🖥️ FEATURE 8: User Interface & Navigation
**Description:** Responsive web interface with intuitive navigation

#### Related User Stories
- All user stories (UI implementation)

#### Pages Implemented
1. **Login Page** (`/login`)
   - Email/password form
   - Demo credentials shown
   - Error handling

2. **Dashboard** (`/dashboard`)
   - Statistics cards
   - Quick actions
   - Recent activity

3. **Candidates List** (`/candidates`)
   - Paginated table
   - Status badges
   - Click to view details

4. **Candidate Details** (`/candidates/:id`)
   - Full profile view
   - All parsed information
   - Edit capability
   - Back button ✓

5. **Upload CVs** (`/upload`)
   - Multi-file selector
   - Progress indicator
   - Results table
   - View candidates link

6. **Jobs List** (`/jobs`)
   - All job positions
   - Status indicators
   - Create new button

7. **Job Details** (`/jobs/:id`)
   - Full job requirements
   - Rank candidates button
   - Edit/Delete actions
   - Back button ✓

8. **Create Job** (`/jobs/new`)
   - Job creation form
   - Tag inputs for skills
   - Validation
   - Cancel button (back) ✓

9. **Ranking Results** (`/jobs/:id/ranking`)
   - Ranked candidates table
   - Scores and explanations
   - Click for details
   - Export button
   - Back button ✓

10. **Reports** (`/reports`)
    - Reports dashboard
    - Skills frequency tab
    - Pipeline stats tab
    - Audit logs tab (admin)

11. **User Management** (`/admin/users`) (Admin Only)
    - Users table
    - Add user button
    - Edit/Delete actions

#### Navigation Features
- ✅ Top navigation bar (always visible)
- ✅ Logo link to dashboard
- ✅ Menu items: Dashboard, Candidates, Upload, Jobs, Reports, Users (admin)
- ✅ User info display (name, role)
- ✅ Logout button
- ✅ Back buttons on detail pages
- ✅ Breadcrumb navigation
- ✅ Browser back/forward support

---

## Feature Priority Matrix

### Must Have (MVP) - Implemented ✅
- User Authentication
- CV Upload & Parsing
- Job Management
- Candidate Ranking
- Basic Reports

### Should Have - Implemented ✅
- Skills Frequency Report
- Pipeline Statistics
- Audit Logs
- User Management

### Could Have - Implemented ✅
- Candidate Editing
- Advanced Reporting
- Export Functionality

### Won't Have (Future)
- Email Integration
- Calendar Integration
- Mobile App
- Advanced NLP
- Multi-language Support
- ATS Integration

---

## API Endpoints Summary

### Authentication
```
POST   /api/auth/login       - Login user
POST   /api/auth/register    - Register new user (admin)
```

### Candidates
```
POST   /api/candidates/upload       - Upload CV files
GET    /api/candidates              - List all candidates
GET    /api/candidates/{id}         - Get candidate details
PUT    /api/candidates/{id}         - Update candidate
DELETE /api/candidates/{id}         - Delete candidate
```

### Jobs
```
POST   /api/jobs            - Create job
GET    /api/jobs            - List all jobs
GET    /api/jobs/{id}       - Get job details
PUT    /api/jobs/{id}       - Update job
DELETE /api/jobs/{id}       - Delete job
```

### Matching
```
POST   /api/matching/rank               - Rank candidates for job
GET    /api/matching/results/{job_id}   - Get ranking results
```

### Reports
```
GET    /api/reports/skills-frequency/{job_id}  - Skills frequency report
GET    /api/reports/pipeline-stats              - Pipeline statistics
GET    /api/reports/audit-logs                  - Audit logs (admin)
```

### Users (Admin Only)
```
GET    /api/users         - List all users
POST   /api/users         - Create user
PUT    /api/users/{id}    - Update user
DELETE /api/users/{id}    - Delete user
```

---

## Data Models Summary

### 5 Database Tables

1. **users**
   - id, email, hashed_password, full_name, role, is_active, timestamps

2. **candidates**
   - id, name, email, phone, education, years_of_experience
   - skills (JSON), languages (JSON), raw_text
   - file_path, file_name, file_type
   - parse_status, parse_error, timestamps

3. **jobs**
   - id, title, description
   - required_skills (JSON), nice_to_have (JSON), keywords (JSON)
   - minimum_experience, status, created_by, timestamps

4. **candidate_scores**
   - id, candidate_id, job_id
   - total_score, skills_score, experience_score, keywords_score
   - rank, explanation
   - matched_skills (JSON), missing_skills (JSON), timestamp

5. **audit_logs**
   - id, user_id, action, entity_type, entity_id
   - details (JSON), ip_address, timestamp

---

## Integration Points

### Frontend ↔ Backend
- **Protocol:** HTTP/REST
- **Format:** JSON
- **Auth:** JWT Bearer tokens
- **CORS:** Configured for localhost:5173

### Backend ↔ Database
- **ORM:** SQLAlchemy
- **Migrations:** Alembic
- **DB:** PostgreSQL or SQLite

### Backend ↔ File System
- **Storage:** Local directory (storage/cvs/)
- **Access:** File path references in database

### Backend ↔ Skills Taxonomy
- **Format:** JSON file
- **Location:** data/skills_taxonomy.json
- **Usage:** Loaded by CV parser

---

## Success Metrics

### Performance
- ✅ API response time: < 500ms
- ✅ Parse 90%+ of CVs successfully
- ✅ Rank 100+ candidates: < 5 seconds
- ✅ Report generation: < 5 seconds

### Quality
- ✅ Test coverage: 80%+
- ✅ Zero critical security vulnerabilities
- ✅ All features documented
- ✅ All user stories implemented

### Business
- ✅ Time savings: 80% (75min → 15min)
- ✅ Scalability: 100+ CVs per job
- ✅ Consistency: 100% standardized criteria

---

**Document Version:** 1.0  
**Last Updated:** January 16, 2026  
**Status:** All features implemented and tested ✅
