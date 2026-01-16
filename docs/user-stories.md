# User Stories

## Overview
This document contains all user stories for the CV Sorting & Candidate Recommendation System. Stories are organized by feature area and priority.

**Total User Stories:** 12  
**Jira Project:** CVSR  
**Naming Convention:** US# (User Story #)

---

## US1: User Authentication
**As a** HR user (both admin and recruiter)  
**I want to** log into the system with my credentials  
**So that** I can securely access the application and my data is protected

**Tags:** `persona:both` `feature:authentication` `priority:highest`  
**Jira ID:** CVSR-1  
**Story Points:** 5  
**Priority Reason:** Login and security - system access control

### Acceptance Criteria
- AC1: User can enter email and password on login page
- AC2: System validates credentials against database
- AC3: Successful login redirects to dashboard
- AC4: Failed login shows error message
- AC5: JWT token is generated and stored
- AC6: Token expires after 30 minutes of inactivity

### Detailed Requirements

#### 1.1 Frontend Requirements
- Login page with email and password fields
- "Sign In" button
- Form validation (email format, required fields)
- Error message display
- Demo credentials shown for testing
- Responsive design

#### 1.2 Backend Requirements
- POST /api/auth/login endpoint
- Password hashing with bcrypt
- JWT token generation with user info
- Token includes: user_id, email, role
- Secure token signing
- Database query for user validation

#### 1.3 Testing Requirements
- Unit test: Password hashing function
- Unit test: Token generation
- Integration test: Login success
- Integration test: Login failure
- Security test: SQL injection protection
- Security test: Password not returned in response

---

## US2: CV Upload and Parsing
**As a** HR recruiter  
**I want to** upload multiple CV files at once  
**So that** I can quickly process large batches of candidate applications

**Tags:** `persona:recruiter` `feature:cv-parsing` `priority:highest`  
**Jira ID:** CVSR-2  
**Story Points:** 8  
**Priority Reason:** Sprint-1 core functionality - CV processing foundation

### Acceptance Criteria
- AC1: User can select multiple files (PDF, DOCX, TXT)
- AC2: System validates file types and sizes (max 10MB each)
- AC3: Upload progress shown to user
- AC4: System parses each CV and extracts structured data
- AC5: Results shown: success count, failed count, details
- AC6: Candidate records created in database
- AC7: Failed uploads logged with error messages

### Detailed Requirements

#### 2.1 Frontend Requirements
- File upload component with drag-and-drop
- Multi-file selection support
- File type validation (client-side)
- Upload progress indicator
- Results table showing filename, status, error (if any)
- "View Candidates" link after successful upload

#### 2.2 Backend Requirements
- POST /api/candidates/upload endpoint
- Multipart/form-data handling
- File type validation (server-side)
- File size validation (10MB limit)
- Save files to storage/cvs/ directory
- CV parsing service:
  - Extract name (first lines heuristic)
  - Extract email (regex pattern)
  - Extract phone (multiple formats)
  - Extract education (keyword matching)
  - Estimate years of experience (patterns + year ranges)
  - Extract skills (skills taxonomy matching)
  - Extract languages (language list matching)
- Create candidate records with parse_status
- Log upload action in audit_logs

#### 2.3 Testing Requirements
- Unit test: Email extraction
- Unit test: Phone extraction
- Unit test: Experience estimation
- Unit test: Skills extraction
- Integration test: Upload single CV
- Integration test: Upload multiple CVs
- Integration test: Handle corrupted file
- Test: Parse PDF file
- Test: Parse DOCX file
- Test: Parse TXT file

---

## US3: View Candidates List
**As a** HR recruiter  
**I want to** see a list of all candidates  
**So that** I can browse and review candidate information

**Tags:** `persona:recruiter` `feature:candidate-management` `priority:highest`  
**Jira ID:** CVSR-3  
**Story Points:** 3  
**Priority Reason:** Sprint-1 core functionality - essential candidate viewing after upload

### Acceptance Criteria
- AC1: Page shows paginated list of candidates
- AC2: Each row displays: name, email, years of experience, parse status
- AC3: User can click on candidate to view details
- AC4: Parse status shown with colored badge (success/failed)
- AC5: List loads within 2 seconds

### Detailed Requirements

#### 3.1 Frontend Requirements
- Candidates list page with table
- Columns: Name, Email, Experience, Skills Count, Status, Actions
- Status badges (green=success, red=failed)
- Pagination (50 per page)
- Click row to view details
- Loading indicator

#### 3.2 Backend Requirements
- GET /api/candidates endpoint
- Pagination support (skip, limit parameters)
- Return candidate objects with essential fields
- Order by created_at DESC

#### 3.3 Testing Requirements
- Integration test: Get candidates list
- Test: Pagination works correctly
- Frontend test: Table renders correctly
- Frontend test: Click navigates to details

---

## US4: Create Job Position
**As a** HR recruiter  
**I want to** create a new job position with requirements  
**So that** I can start matching candidates against this position

**Tags:** `persona:recruiter` `feature:job-management` `priority:highest`  
**Jira ID:** CVSR-4  
**Story Points:** 5  
**Priority Reason:** Sprint-1 core functionality - prerequisite for ranking/matching

### Acceptance Criteria
- AC1: Form to enter job title, description, required skills, nice-to-have skills, minimum experience, keywords
- AC2: Required skills can be added as tags
- AC3: Form validates required fields
- AC4: Job saved to database with creator info
- AC5: Success message shown
- AC6: User redirected to job details page

### Detailed Requirements

#### 4.1 Frontend Requirements
- Create job form page
- Fields: title (text), description (textarea), required_skills (tag input), nice_to_have (tag input), minimum_experience (number), keywords (tag input)
- Tag input component for skills
- Form validation
- "Create Job" button
- Cancel button (navigate back)

#### 4.2 Backend Requirements
- POST /api/jobs endpoint
- Validate input data
- Create job record linked to current user
- Default status: "active"
- Log action in audit_logs
- Return created job object

#### 4.3 Testing Requirements
- Unit test: Form validation
- Integration test: Create job
- Test: Required fields validation
- Test: Skills saved as JSON array
- Frontend test: Tag input works

---

## US5: Rank Candidates for Job
**As a** HR recruiter  
**I want to** automatically rank all candidates for a job position  
**So that** I can quickly identify the best matches

**Tags:** `persona:recruiter` `feature:matching` `priority:high`  
**Jira ID:** CVSR-5  
**Story Points:** 13  
**Priority Reason:** Sprint-2 core functionality - main business value (ranking algorithm)

### Acceptance Criteria
- AC1: "Rank Candidates" button available on job details page
- AC2: System calculates match score for each candidate
- AC3: Scores based on: skills match (50%), experience match (30%), keywords match (20%)
- AC4: Candidates ranked by total score
- AC5: Each candidate has explanation for ranking
- AC6: Results saved to database
- AC7: User redirected to ranking results page

### Detailed Requirements

#### 5.1 Frontend Requirements
- "Rank Candidates" button on job page
- Loading indicator during ranking
- Navigate to results page after completion

#### 5.2 Backend Requirements
- POST /api/matching/rank endpoint
- Input: job_id
- Matching service logic:
  - Get all candidates with parse_status=success
  - For each candidate:
    - Calculate skills_score:
      - Match required_skills: 50 points possible
      - Match nice_to_have: 10 bonus points
      - Formula: (matched_required / total_required) * 50 + (matched_nice / total_nice) * 10
    - Calculate experience_score:
      - Compare candidate experience vs minimum_experience
      - Full points (30) if >= minimum
      - Scaled down if below
    - Calculate keywords_score:
      - Count keyword matches in CV text
      - Formula: (matched_keywords / total_keywords) * 20
    - Total score = sum of components
    - Generate explanation text
    - Track matched and missing skills
  - Sort by total_score DESC
  - Assign rank (1, 2, 3, ...)
  - Save CandidateScore records
- Log ranking action
- Return ranked list

#### 5.3 Testing Requirements
- Unit test: Calculate score for perfect match
- Unit test: Calculate score for partial match
- Unit test: Calculate score for no match
- Unit test: Skills matching logic
- Unit test: Experience scoring
- Unit test: Keywords matching
- Unit test: Explanation generation
- Integration test: Rank candidates endpoint
- Test: Scores saved to database
- Test: Rankings ordered correctly

---

## US6: View Ranking Results
**As a** HR recruiter  
**I want to** see ranked candidates with scores and explanations  
**So that** I can make informed hiring decisions

**Tags:** `persona:recruiter` `feature:matching` `priority:high`  
**Jira ID:** CVSR-6  
**Story Points:** 5  
**Priority Reason:** Sprint-2 core functionality - essential to view ranking output

### Acceptance Criteria
- AC1: Results page shows ranked list (rank #1, #2, #3, ...)
- AC2: Each candidate shows: name, score, matched skills, missing skills, explanation
- AC3: Click candidate to see full details
- AC4: Scores shown with color coding (green=high, yellow=medium, red=low)
- AC5: Can navigate back to job details

### Detailed Requirements

#### 6.1 Frontend Requirements
- Ranking results page
- Table with columns: Rank, Name, Email, Total Score, Skills Score, Experience Score, Explanation
- Score badges with colors
- Expandable rows for detailed skills
- "View Full Profile" link
- "Back to Job" button
- "Export Results" button (CSV download)

#### 6.2 Backend Requirements
- GET /api/matching/results/{job_id} endpoint
- Return candidate scores ordered by rank
- Include full candidate objects (join query)
- Filter by job_id

#### 6.3 Testing Requirements
- Integration test: Get ranking results
- Test: Results ordered by rank
- Test: Include candidate details
- Frontend test: Table renders
- Frontend test: Back navigation works

---

## US7: Skills Frequency Report
**As a** HR recruiter or admin  
**I want to** see which skills are most common among candidates  
**So that** I can understand market trends and adjust job requirements

**Tags:** `persona:both` `feature:reports` `priority:medium`  
**Jira ID:** CVSR-7  
**Story Points:** 5  
**Priority Reason:** Analytics feature - provides insights but not critical path

### Acceptance Criteria
- AC1: Report shows top 20 skills across all candidates
- AC2: Each skill shows count and percentage
- AC3: Can filter by specific job position
- AC4: Report generates within 5 seconds
- AC5: Visual chart optional (table minimum)

### Detailed Requirements

#### 7.1 Frontend Requirements
- Reports page with tabs
- Skills frequency report tab
- Job selector dropdown
- Table: Skill Name, Count, Percentage
- Sort by count (descending)

#### 7.2 Backend Requirements
- GET /api/reports/skills-frequency/{job_id} endpoint
- Query all candidates
- Extract all skills from candidates.skills JSON field
- Count occurrences using Counter
- Calculate percentages
- Return top 20
- Include job title in response

#### 7.3 Testing Requirements
- Integration test: Get skills report
- Test: Counts are accurate
- Test: Percentages calculated correctly
- Test: Top 20 returned

---

## US8: Pipeline Statistics Report
**As a** HR admin  
**I want to** see overall pipeline statistics  
**So that** I can monitor system performance and recruiter efficiency

**Tags:** `persona:admin` `feature:reports` `priority:medium`  
**Jira ID:** CVSR-8  
**Story Points:** 5  
**Priority Reason:** Analytics and dashboard metrics - business insights

### Acceptance Criteria
- AC1: Shows total candidates uploaded
- AC2: Shows parse success rate
- AC3: Shows total jobs and active jobs
- AC4: Shows average scores by job position
- AC5: Report updates in real-time

### Detailed Requirements

#### 8.1 Frontend Requirements
- Pipeline stats tab on reports page
- Stat cards for key metrics
- Table for average scores by job
- Refresh button

#### 8.2 Backend Requirements
- GET /api/reports/pipeline-stats endpoint
- Calculate:
  - total_candidates: COUNT(*)
  - parsed_successfully: COUNT WHERE parse_status=success
  - parse_failed: COUNT WHERE parse_status=failed
  - success_rate: (parsed_successfully / total_candidates) * 100
  - total_jobs: COUNT jobs
  - active_jobs: COUNT WHERE status=active
  - average_score_by_job: GROUP BY job, AVG(total_score)
- Return aggregated data

#### 8.3 Testing Requirements
- Integration test: Get pipeline stats
- Test: Calculations accurate
- Test: All metrics returned

---

## US9: View Audit Logs (Admin Only)
**As a** HR admin  
**I want to** view system audit logs  
**So that** I can track all user activities and ensure compliance

**Tags:** `persona:admin` `feature:audit` `priority:high`  
**Jira ID:** CVSR-9  
**Story Points:** 3  
**Priority Reason:** Security and compliance - audit trail for system activities

### Acceptance Criteria
- AC1: Admin can access audit logs page
- AC2: Non-admin users cannot access (403 error)
- AC3: Logs show: timestamp, user, action, entity type, entity ID, details
- AC4: Logs ordered by timestamp (newest first)
- AC5: Pagination supported (100 per page)

### Detailed Requirements

#### 9.1 Frontend Requirements
- Audit logs page (admin only)
- Table with columns: Timestamp, User, Action, Entity, Details
- Pagination controls
- Filter by action type

#### 9.2 Backend Requirements
- GET /api/reports/audit-logs endpoint
- Require HR_ADMIN role
- Return audit_logs ordered by timestamp DESC
- Pagination support
- Join with users table for user names

#### 9.3 Testing Requirements
- Integration test: Admin can access
- Integration test: Recruiter cannot access (403)
- Test: Logs ordered correctly
- Test: Pagination works

---

## US10: User Management (Admin Only)
**As a** HR admin  
**I want to** create, view, and manage user accounts  
**So that** I can control system access for my team

**Tags:** `persona:admin` `feature:user-management` `priority:highest`  
**Jira ID:** CVSR-10  
**Story Points:** 5  
**Priority Reason:** Security and system access control - manage team access

### Acceptance Criteria
- AC1: Admin can view list of all users
- AC2: Admin can create new user with role assignment
- AC3: Admin can update user details and activate/deactivate
- AC4: Admin can delete users (except self)
- AC5: Non-admin users cannot access user management

### Detailed Requirements

#### 10.1 Frontend Requirements
- Users list page (admin only)
- Table showing all users
- "Add User" button
- User creation form
- Edit/Delete actions per user

#### 10.2 Backend Requirements
- GET /api/users endpoint (admin only)
- POST /api/users endpoint (admin only)
- PUT /api/users/{id} endpoint (admin only)
- DELETE /api/users/{id} endpoint (admin only)
- Validate admin role on all endpoints
- Prevent self-deletion
- Log all user management actions

#### 10.3 Testing Requirements
- Integration test: Admin can list users
- Integration test: Admin can create user
- Integration test: Recruiter cannot access (403)
- Test: Cannot delete self
- Test: Email uniqueness validated

---

## US11: View Candidate Details
**As a** HR recruiter  
**I want to** view complete details of a specific candidate  
**So that** I can make informed decisions about their suitability

**Tags:** `persona:recruiter` `feature:candidate-management` `priority:high`  
**Jira ID:** CVSR-11  
**Story Points:** 3  
**Priority Reason:** Core candidate management - essential for informed decisions

### Acceptance Criteria
- AC1: Page shows all candidate information
- AC2: Displays: name, email, phone, education, experience, skills, languages
- AC3: Shows parse status and raw CV text
- AC4: Shows ranking history if candidate was ranked
- AC5: Can navigate back to candidates list

### Detailed Requirements

#### 11.1 Frontend Requirements
- Candidate details page
- Sections: Personal Info, Education, Skills, Experience, Raw CV
- Back button to candidates list
- Edit button (stretch goal)

#### 11.2 Backend Requirements
- GET /api/candidates/{id} endpoint
- Return full candidate object
- Include related scores if any

#### 11.3 Testing Requirements
- Integration test: Get candidate details
- Test: Returns 404 if not found
- Frontend test: Back button works

---

## US12: Update Candidate Information
**As a** HR recruiter  
**I want to** edit candidate information  
**So that** I can correct parsing errors or add missing details

**Tags:** `persona:recruiter` `feature:candidate-management` `priority:medium`  
**Jira ID:** CVSR-12  
**Story Points:** 3  
**Priority Reason:** Data correction and UI polish - nice to have, not critical

### Acceptance Criteria
- AC1: User can edit candidate fields
- AC2: Fields: name, email, phone, education, skills, experience, languages
- AC3: Form pre-populated with current values
- AC4: Changes saved to database
- AC5: Update logged in audit logs

### Detailed Requirements

#### 12.1 Frontend Requirements
- Edit candidate form
- Pre-populated fields
- Tag input for skills
- Save and Cancel buttons

#### 12.2 Backend Requirements
- PUT /api/candidates/{id} endpoint
- Validate input
- Update record
- Log update action
- Return updated candidate

#### 12.3 Testing Requirements
- Integration test: Update candidate
- Test: Validation works
- Test: Update logged

---

## Story Mapping

### Epic 1: Authentication & User Management
- US1: User Authentication
- US10: User Management (Admin Only)

### Epic 2: CV Processing
- US2: CV Upload and Parsing
- US3: View Candidates List
- US11: View Candidate Details
- US12: Update Candidate Information

### Epic 3: Job & Matching
- US4: Create Job Position
- US5: Rank Candidates for Job
- US6: View Ranking Results

### Epic 4: Reports & Analytics
- US7: Skills Frequency Report
- US8: Pipeline Statistics Report
- US9: View Audit Logs (Admin Only)

---

## Priority Matrix

### Must Have (Sprint 1-3)
- US1, US2, US3, US4, US5, US6

### Should Have (Sprint 4-5)
- US7, US8, US9, US10, US11

### Could Have (Sprint 6)
- US12

---

**Document Version:** 1.0  
**Last Updated:** January 16, 2026  
**Total Story Points:** 63
