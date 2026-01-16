# JIRA Project Setup Guide
## CV Sorting & Candidate Recommendation System

**Project:** PROCV - CV Sorting System  
**Date:** January 16, 2026  
**Board Type:** Scrum  

---

## 📋 TABLE OF CONTENTS
1. [Project Setup](#project-setup)
2. [Epics](#epics)
3. [User Stories](#user-stories)
4. [Subtasks](#subtasks)
5. [Sprints](#sprints)
6. [Labels & Components](#labels-components)
7. [CSV Import Files](#csv-import-files)

---

## 1. PROJECT SETUP

### Step 1: Create Project
1. Log into Jira: https://yoursite.atlassian.net
2. Click "Projects" → "Create Project"
3. Select "Scrum" template
4. Fill in details:
   - **Name:** CV Sorting System - Agile Project
   - **Key:** PROCV
   - **Project type:** Team-managed
   - **Template:** Scrum
5. Click "Create"

### Step 2: Configure Board
1. Go to Board Settings
2. Rename board: "CV Sorting Scrum Board"
3. Configure columns:
   - **To Do** (Backlog items)
   - **In Progress** (Active development)
   - **In Review** (Code review, testing)
   - **Done** (Completed)

---

## 2. EPICS

Create 7 Epics representing major features:

### EPIC-CV-01: Authentication & Authorization
**Epic Name:** Authentication & Authorization  
**Summary:** User authentication, role-based access control, and security features  
**Description:**  
```
Implement secure authentication system with role-based access control.

Features:
- User login/logout
- JWT token authentication
- Password hashing
- Role management (HR_ADMIN, HR_RECRUITER)
- Session management
- Password reset functionality

Success Criteria:
- Secure authentication with JWT
- Role-based access working
- All passwords encrypted
- Session timeout after 30 min inactivity
```

**Label:** `Feature-Auth`  
**Priority:** Highest  

---

### EPIC-CV-02: CV Upload & Parsing
**Epic Name:** CV Upload & Parsing  
**Summary:** Upload CVs, parse content, and extract candidate information  
**Description:**  
```
Build CV upload and parsing system to extract candidate data.

Features:
- Batch file upload (drag-and-drop)
- Support PDF, TXT, DOCX formats
- NLP-based text extraction
- Skills identification
- Experience extraction
- Education parsing
- Store CV files and metadata

Success Criteria:
- Upload 50+ CVs simultaneously
- 90%+ parsing accuracy
- Parse time < 5 seconds per CV
- Support all specified formats
```

**Label:** `Feature-CV-Upload`  
**Priority:** Highest  

---

### EPIC-CV-03: Job Position Management
**Epic Name:** Job Position Management  
**Summary:** Create and manage job positions with required skills  
**Description:**  
```
CRUD operations for job positions with skill requirements.

Features:
- Create job positions
- Define required/preferred skills
- Set experience requirements
- Edit and close positions
- Track candidates per job
- Job status management

Success Criteria:
- Full CRUD functionality
- Link skills to jobs
- View all active positions
- Archive closed positions
```

**Label:** `Feature-Jobs`  
**Priority:** High  

---

### EPIC-CV-04: Matching & Ranking Algorithm
**Epic Name:** Matching & Ranking Algorithm  
**Summary:** Match candidates to jobs and rank by compatibility  
**Description:**  
```
Intelligent matching algorithm to rank candidates for jobs.

Features:
- Skills matching algorithm
- Experience weighting
- Education consideration
- Configurable weights
- Match score calculation (0-100%)
- Ranking explanation
- Export rankings

Success Criteria:
- Match accuracy > 85%
- Calculation time < 3 seconds
- Clear score explanation
- Adjustable weights
```

**Label:** `Feature-Matching`  
**Priority:** Highest  

---

### EPIC-CV-05: Reports & Analytics
**Epic Name:** Reports & Analytics  
**Summary:** Generate insights and reports on candidates and hiring  
**Description:**  
```
Comprehensive reporting and analytics dashboard.

Features:
- Top skills frequency report
- Candidate pipeline statistics
- Time-to-hire metrics
- Skills gap analysis
- Export to PDF/CSV
- Date range filtering
- Visual charts and graphs

Success Criteria:
- Generate reports < 5 seconds
- Export functionality working
- Charts visually clear
- Historical data tracking
```

**Label:** `Feature-Reports`  
**Priority:** Medium  

---

### EPIC-CV-06: Audit Logging
**Epic Name:** Audit Logging  
**Summary:** Track all system activities for compliance and debugging  
**Description:**  
```
Complete audit trail for all user actions.

Features:
- Log all CRUD operations
- Track user logins
- Record data access
- Capture IP and timestamp
- Searchable audit logs
- Export logs
- Retention policy

Success Criteria:
- All actions logged
- Searchable by user/date/action
- Performance not impacted
- Logs exportable
```

**Label:** `Feature-Audit`  
**Priority:** Medium  

---

### EPIC-CV-07: Dashboard & UI
**Epic Name:** Dashboard & UI Navigation  
**Summary:** User interface for all system features  
**Description:**  
```
Responsive web interface with intuitive navigation.

Features:
- Main dashboard
- Navigation menu
- Responsive design
- Data visualizations
- Quick actions
- User profile
- System notifications

Success Criteria:
- Mobile responsive
- Load time < 2 seconds
- Intuitive UX
- Accessible (WCAG 2.1)
```

**Label:** `Feature-UI`  
**Priority:** High  

---

## 3. USER STORIES

### US-1: User Login with Role-Based Access
**Story:**  
```
As an HR_ADMIN or HR_RECRUITER
I want to log in with my credentials
So that I can access system features based on my role
```

**Acceptance Criteria:**
```
- [ ] User can enter email and password
- [ ] System validates credentials
- [ ] JWT token generated on success
- [ ] User redirected to appropriate dashboard
- [ ] HR_ADMIN sees admin features
- [ ] HR_RECRUITER sees recruiter features
- [ ] Invalid credentials show error message
- [ ] Session expires after 30 min inactivity
```

**Epic Link:** EPIC-CV-01  
**Labels:** `HR_ADMIN`, `HR_RECRUITER`, `Sprint-1`  
**Priority:** Highest  
**Story Points:** 8  
**Sprint:** Sprint 1  

**Subtasks:**
1. **US-1.1: Frontend - Login UI**
   - Create login form component
   - Email and password input fields
   - Form validation
   - Error message display
   - Remember me checkbox

2. **US-1.2: Backend - Auth Endpoints**
   - POST /auth/login endpoint
   - POST /auth/logout endpoint
   - JWT token generation
   - Password verification (bcrypt)
   - Session management

3. **US-1.3: Testing - Auth Tests**
   - Unit tests for auth logic
   - Integration tests for endpoints
   - Test role-based access
   - Test session expiry
   - Security testing

---

### US-2: Upload Multiple CV Files
**Story:**  
```
As an HR_RECRUITER
I want to upload multiple CV files
So that I can evaluate candidates efficiently
```

**Acceptance Criteria:**
```
- [ ] Drag-and-drop file upload
- [ ] Support PDF, TXT, DOCX formats
- [ ] Upload up to 50 files simultaneously
- [ ] Progress indicator shown
- [ ] Success/failure message per file
- [ ] Files stored in storage/cvs/
- [ ] Metadata saved to database
- [ ] Invalid files rejected with message
```

**Epic Link:** EPIC-CV-02  
**Labels:** `HR_RECRUITER`, `Sprint-1`  
**Priority:** Highest  
**Story Points:** 13  
**Sprint:** Sprint 1  

**Subtasks:**
1. **US-2.1: Frontend - File Upload Component**
   - Drag-and-drop zone
   - File type validation
   - Progress bar
   - Upload queue management
   - Error handling UI

2. **US-2.2: Backend - CV Upload Endpoint**
   - POST /candidates/upload-cv endpoint
   - File storage logic
   - File type validation
   - Batch processing
   - Database record creation

3. **US-2.3: Testing - Upload Tests**
   - Test valid file uploads
   - Test invalid file types
   - Test file size limits
   - Test concurrent uploads
   - Test error handling

---

### US-3: Parse CV Content
**Story:**  
```
As an HR_RECRUITER
I want the system to automatically extract skills, experience, and education from CVs
So that I don't have to manually enter data
```

**Acceptance Criteria:**
```
- [ ] Extract candidate name
- [ ] Extract email and phone
- [ ] Identify skills from text
- [ ] Extract years of experience
- [ ] Parse education (degree, institution)
- [ ] Match skills to taxonomy
- [ ] Parsing time < 5 seconds per CV
- [ ] Accuracy > 85%
- [ ] Handle missing data gracefully
```

**Epic Link:** EPIC-CV-02  
**Labels:** `HR_RECRUITER`, `Sprint-1`  
**Priority:** Highest  
**Story Points:** 13  
**Sprint:** Sprint 1  

**Subtasks:**
1. **US-3.1: Frontend - Display Parsed Data**
   - Candidate profile card
   - Skills tags display
   - Experience timeline
   - Education section
   - Edit parsed data option

2. **US-3.2: Backend - CV Parsing Logic**
   - Text extraction from PDF/DOCX
   - NLP for skills extraction
   - Experience calculation
   - Education parsing
   - Skills taxonomy matching

3. **US-3.3: Testing - Parser Accuracy Tests**
   - Test with sample CVs
   - Validate extraction accuracy
   - Test edge cases
   - Performance testing
   - Compare with manual parsing

---

### US-4: Create Job Position
**Story:**  
```
As an HR_RECRUITER
I want to create job positions with required skills and experience
So that I can match candidates
```

**Acceptance Criteria:**
```
- [ ] Form to create job position
- [ ] Fields: title, description, location
- [ ] Add required skills (multi-select)
- [ ] Add preferred skills (multi-select)
- [ ] Set experience requirement (years)
- [ ] Set education requirement
- [ ] Save to database
- [ ] View created job in jobs list
```

**Epic Link:** EPIC-CV-03  
**Labels:** `HR_RECRUITER`, `Sprint-1`  
**Priority:** High  
**Story Points:** 8  
**Sprint:** Sprint 1  

**Subtasks:**
1. **US-4.1: Frontend - Job Creation Form**
   - Job details form
   - Skills multi-select
   - Experience dropdown
   - Form validation
   - Success message

2. **US-4.2: Backend - Job Management API**
   - POST /jobs endpoint
   - GET /jobs endpoint
   - PUT /jobs/{id} endpoint
   - DELETE /jobs/{id} endpoint
   - Database models

3. **US-4.3: Testing - Job Creation Tests**
   - Test CRUD operations
   - Validate required fields
   - Test skill associations
   - Test data persistence

---

### US-5: Rank Candidates for Job
**Story:**  
```
As an HR_RECRUITER
I want to see candidates ranked by match score for a job position
So that I can prioritize interviews
```

**Acceptance Criteria:**
```
- [ ] Select job position
- [ ] Click "Run Ranking" button
- [ ] System calculates match scores
- [ ] Candidates sorted by score (high to low)
- [ ] Display match percentage
- [ ] Show matching skills
- [ ] Show missing skills
- [ ] Calculation time < 3 seconds
```

**Epic Link:** EPIC-CV-04  
**Labels:** `HR_RECRUITER`, `Sprint-2`  
**Priority:** Highest  
**Story Points:** 13  
**Sprint:** Sprint 2  

**Subtasks:**
1. **US-5.1: Frontend - Ranking Display**
   - Ranked candidate list
   - Match score badges
   - Skills comparison view
   - Filter and sort options
   - Export to PDF

2. **US-5.2: Backend - Matching Algorithm**
   - Calculate skill match score
   - Weight experience
   - Weight education
   - Calculate overall score
   - Return ranked list

3. **US-5.3: Testing - Algorithm Validation**
   - Test scoring logic
   - Validate ranking order
   - Test edge cases
   - Performance testing
   - Accuracy validation

---

### US-6: View Top Skills Report
**Story:**  
```
As an HR_ADMIN
I want to see a report of top skills frequency per job
So that I can understand hiring trends
```

**Acceptance Criteria:**
```
- [ ] Navigate to Reports section
- [ ] Select "Top Skills" report
- [ ] Choose date range
- [ ] Display bar chart of skills
- [ ] Show count per skill
- [ ] Filter by job position
- [ ] Export to PDF/CSV
- [ ] Report generates < 5 seconds
```

**Epic Link:** EPIC-CV-05  
**Labels:** `HR_ADMIN`, `Sprint-2`  
**Priority:** Medium  
**Story Points:** 8  
**Sprint:** Sprint 2  

**Subtasks:**
1. **US-6.1: Frontend - Skills Chart Component**
   - Bar chart visualization
   - Date range picker
   - Job filter dropdown
   - Export buttons
   - Responsive design

2. **US-6.2: Backend - Skills Analytics Endpoint**
   - GET /reports/top-skills endpoint
   - Aggregate skills data
   - Filter by date range
   - Return JSON data
   - PDF generation

3. **US-6.3: Testing - Report Data Tests**
   - Validate calculations
   - Test date filtering
   - Test export functionality
   - Performance testing

---

### US-7: View Candidate Pipeline Statistics
**Story:**  
```
As an HR_ADMIN
I want to view candidate pipeline statistics
So that I can monitor recruitment efficiency
```

**Acceptance Criteria:**
```
- [ ] Display total candidates
- [ ] Show candidates by stage (screening, interview, offer, hired)
- [ ] Display funnel chart
- [ ] Show conversion rates
- [ ] Display average time-to-hire
- [ ] Filter by date range
- [ ] Export to PDF
```

**Epic Link:** EPIC-CV-05  
**Labels:** `HR_ADMIN`, `Sprint-2`  
**Priority:** Medium  
**Story Points:** 8  
**Sprint:** Sprint 2  

**Subtasks:**
1. **US-7.1: Frontend - Dashboard Metrics**
   - KPI cards
   - Funnel chart
   - Conversion rate display
   - Date range filter
   - Export functionality

2. **US-7.2: Backend - Pipeline Analytics**
   - GET /reports/pipeline-stats endpoint
   - Calculate stage counts
   - Calculate conversion rates
   - Calculate time-to-hire
   - Return aggregated data

3. **US-7.3: Testing - Pipeline Metrics Tests**
   - Validate calculations
   - Test stage transitions
   - Test date filtering
   - Accuracy validation

---

### US-8: View Audit Logs
**Story:**  
```
As an HR_ADMIN
I want to view audit logs of all system activities
So that I can ensure compliance and troubleshoot issues
```

**Acceptance Criteria:**
```
- [ ] Display all logged activities
- [ ] Show timestamp, user, action, details
- [ ] Filter by user
- [ ] Filter by date range
- [ ] Filter by action type
- [ ] Search functionality
- [ ] Paginated results (50 per page)
- [ ] Export to CSV
```

**Epic Link:** EPIC-CV-06  
**Labels:** `HR_ADMIN`, `Sprint-2`  
**Priority:** Medium  
**Story Points:** 5  
**Sprint:** Sprint 2  

**Subtasks:**
1. **US-8.1: Frontend - Audit Log Viewer**
   - Table with sortable columns
   - Filter controls
   - Search box
   - Pagination
   - Export button

2. **US-8.2: Backend - Audit Log Retrieval**
   - GET /audit/logs endpoint
   - Filter by user/date/action
   - Pagination logic
   - CSV export
   - Query optimization

3. **US-8.3: Testing - Audit Logging Tests**
   - Verify all actions logged
   - Test filters
   - Test pagination
   - Test export

---

### US-9: Navigate Dashboard
**Story:**  
```
As an HR_RECRUITER
I want a dashboard showing recent activities and quick actions
So that I can work efficiently
```

**Acceptance Criteria:**
```
- [ ] Display recent CV uploads
- [ ] Show active job positions
- [ ] Display pending tasks
- [ ] Quick action buttons (Upload CV, Create Job)
- [ ] Recent rankings
- [ ] Responsive layout
- [ ] Load time < 2 seconds
```

**Epic Link:** EPIC-CV-07  
**Labels:** `HR_RECRUITER`, `Sprint-2`  
**Priority:** Medium  
**Story Points:** 5  
**Sprint:** Sprint 2  

**Subtasks:**
1. **US-9.1: Frontend - Dashboard Layout**
   - Grid layout design
   - Widget components
   - Quick action buttons
   - Recent activity feed
   - Responsive CSS

2. **US-9.2: Backend - Dashboard Data API**
   - GET /dashboard endpoint
   - Aggregate recent activities
   - Return counts and summaries
   - Optimize queries

3. **US-9.3: Testing - UI/UX Tests**
   - Test responsiveness
   - Test loading performance
   - Usability testing
   - Cross-browser testing

---

### US-10: Manage Users (Admin Only)
**Story:**  
```
As an HR_ADMIN
I want to create, edit, and deactivate users
So that I can control system access
```

**Acceptance Criteria:**
```
- [ ] View all users list
- [ ] Create new user (email, name, role)
- [ ] Edit user details
- [ ] Deactivate user account
- [ ] Assign roles (ADMIN, RECRUITER)
- [ ] Only HR_ADMIN can access
- [ ] Password sent to new user email
```

**Epic Link:** EPIC-CV-01  
**Labels:** `HR_ADMIN`, `Sprint-2`  
**Priority:** Medium  
**Story Points:** 8  
**Sprint:** Sprint 2  

**Subtasks:**
1. **US-10.1: Frontend - User Management UI**
   - User list table
   - Create user form
   - Edit user modal
   - Role selection
   - Deactivate button

2. **US-10.2: Backend - User Management Endpoints**
   - GET /users endpoint
   - POST /users endpoint
   - PUT /users/{id} endpoint
   - DELETE /users/{id} endpoint
   - Role authorization

3. **US-10.3: Testing - Authorization Tests**
   - Test role-based access
   - Verify ADMIN-only
   - Test CRUD operations
   - Security testing

---

## 4. SUBTASKS

Each User Story has 3 subtasks:
1. **Frontend Task** - React/TypeScript UI implementation
2. **Backend Task** - Python/FastAPI API implementation
3. **Testing Task** - pytest/Jest test coverage

**Naming Convention:**
- US-1.1, US-1.2, US-1.3
- US-2.1, US-2.2, US-2.3
- etc.

---

## 5. SPRINTS

### Sprint 1: Foundation (Dec 18, 2024 - Jan 3, 2025)
**Duration:** 17 days  
**Goal:** Build authentication, CV upload, and basic parsing  

**User Stories:**
- US-1: User Login with Role-Based Access (8 pts)
- US-2: Upload Multiple CV Files (13 pts)
- US-3: Parse CV Content (13 pts)
- US-4: Create Job Position (8 pts)

**Total Points:** 42  
**Capacity:** 40-45 points  

**Key Deliverables:**
- Working authentication system
- CV upload functionality
- Basic CV parsing
- Job creation feature
- Initial UI framework

---

### Sprint 2: Completion (Jan 4, 2025 - Jan 20, 2025)
**Duration:** 17 days  
**Goal:** Complete matching algorithm, reports, and UI polish  

**User Stories:**
- US-5: Rank Candidates for Job (13 pts)
- US-6: View Top Skills Report (8 pts)
- US-7: View Candidate Pipeline Statistics (8 pts)
- US-8: View Audit Logs (5 pts)
- US-9: Navigate Dashboard (5 pts)
- US-10: Manage Users (8 pts)

**Total Points:** 47  
**Capacity:** 45-50 points  

**Key Deliverables:**
- Matching algorithm functional
- Reports and analytics
- Audit logging
- Complete dashboard
- User management
- Full test coverage
- Documentation

---

## 6. LABELS & COMPONENTS

### Labels:
Create these labels in Jira:

**By Persona:**
- `HR_ADMIN`
- `HR_RECRUITER`

**By Feature:**
- `Feature-Auth`
- `Feature-CV-Upload`
- `Feature-Jobs`
- `Feature-Matching`
- `Feature-Reports`
- `Feature-Audit`
- `Feature-UI`

**By Sprint:**
- `Sprint-1`
- `Sprint-2`

**By Type:**
- `Frontend`
- `Backend`
- `Testing`
- `Documentation`

### Components:
Create these components:
- **Frontend** - React/TypeScript UI
- **Backend** - Python/FastAPI API
- **Database** - SQLite/PostgreSQL
- **Testing** - pytest/Jest
- **DevOps** - CI/CD, deployment

---

## 7. CSV IMPORT FILES

If you prefer to import via CSV, here's the structure:

### Epics CSV:
```csv
Summary,Issue Type,Epic Name,Description,Priority,Labels
Authentication & Authorization,Epic,EPIC-CV-01,User authentication and role-based access control,Highest,Feature-Auth
CV Upload & Parsing,Epic,EPIC-CV-02,Upload and parse CV files,Highest,Feature-CV-Upload
Job Position Management,Epic,EPIC-CV-03,Create and manage job positions,High,Feature-Jobs
Matching & Ranking Algorithm,Epic,EPIC-CV-04,Match candidates to jobs,Highest,Feature-Matching
Reports & Analytics,Epic,EPIC-CV-05,Generate insights and reports,Medium,Feature-Reports
Audit Logging,Epic,EPIC-CV-06,Track all system activities,Medium,Feature-Audit
Dashboard & UI,Epic,EPIC-CV-07,User interface for all features,High,Feature-UI
```

### User Stories CSV:
```csv
Summary,Issue Type,Description,Epic Link,Priority,Story Points,Sprint,Labels
User Login with Role-Based Access,Story,As an HR user I want to login,EPIC-CV-01,Highest,8,Sprint 1,"HR_ADMIN,HR_RECRUITER,Sprint-1"
Upload Multiple CV Files,Story,As an HR_RECRUITER I want to upload CVs,EPIC-CV-02,Highest,13,Sprint 1,"HR_RECRUITER,Sprint-1"
Parse CV Content,Story,As an HR_RECRUITER I want automatic parsing,EPIC-CV-02,Highest,13,Sprint 1,"HR_RECRUITER,Sprint-1"
Create Job Position,Story,As an HR_RECRUITER I want to create jobs,EPIC-CV-03,High,8,Sprint 1,"HR_RECRUITER,Sprint-1"
Rank Candidates for Job,Story,As an HR_RECRUITER I want candidate ranking,EPIC-CV-04,Highest,13,Sprint 2,"HR_RECRUITER,Sprint-2"
View Top Skills Report,Story,As an HR_ADMIN I want skills report,EPIC-CV-05,Medium,8,Sprint 2,"HR_ADMIN,Sprint-2"
View Candidate Pipeline Statistics,Story,As an HR_ADMIN I want pipeline stats,EPIC-CV-05,Medium,8,Sprint 2,"HR_ADMIN,Sprint-2"
View Audit Logs,Story,As an HR_ADMIN I want to view audit logs,EPIC-CV-06,Medium,5,Sprint 2,"HR_ADMIN,Sprint-2"
Navigate Dashboard,Story,As an HR_RECRUITER I want a dashboard,EPIC-CV-07,Medium,5,Sprint 2,"HR_RECRUITER,Sprint-2"
Manage Users,Story,As an HR_ADMIN I want to manage users,EPIC-CV-01,Medium,8,Sprint 2,"HR_ADMIN,Sprint-2"
```

---

## QUICK SETUP STEPS

### Manual Creation (Recommended):
1. Create Project (PROCV)
2. Create 7 Epics (copy descriptions above)
3. Create 10 User Stories (link to Epics)
4. Create 3 Subtasks per Story (Frontend, Backend, Testing)
5. Create 2 Sprints with dates
6. Add Stories to appropriate Sprints
7. Create Labels and apply to issues
8. Configure Board columns

### CSV Import:
1. Save CSV files above
2. Go to Jira → Issues → Import Issues from CSV
3. Map columns correctly
4. Import Epics first
5. Import User Stories (will link to Epics)
6. Manually create Subtasks

---

**END OF JIRA SETUP GUIDE**
