# End-to-End Scenarios

## Scenario 1: CV Upload to Candidate Ranking (HR Recruiter Journey)

**Persona:** James Chen (HR_RECRUITER)  
**Duration:** ~15 minutes  
**Frequency:** 2-3 times per week

### Context
James received 35 CVs from a job board for the "Senior Python Developer" position. He needs to quickly identify the top candidates to present to the hiring manager.

### Preconditions
- James is logged into the system
- "Senior Python Developer" job position already exists in the system
- CVs are downloaded as PDF/DOCX files on his computer

### Step-by-Step Flow

#### 1. Login (Screen: Login Page)
**Action:** James enters credentials and clicks "Sign In"
- Email: james.chen@company.com
- Password: ********
- **System Response:** Redirects to Dashboard
- **Navigation:** Login → Dashboard

#### 2. Review Dashboard (Screen: Dashboard)
**Action:** James reviews quick stats
- Sees: 120 total candidates, 8 active jobs
- **System Response:** Displays current statistics
- **Navigation:** Dashboard (stay)

#### 3. Navigate to Upload (Screen: Upload CVs)
**Action:** James clicks "Upload CVs" in navigation menu
- **System Response:** Shows upload interface
- **Navigation:** Dashboard → Upload CVs

#### 4. Select Files (Screen: Upload CVs)
**Action:** James clicks "Choose Files" and selects 35 CV files
- Files: Mix of PDF (20), DOCX (10), TXT (5)
- **System Response:** Shows file list with size validation
- **Navigation:** Upload CVs (stay)

#### 5. Upload Files (Screen: Upload CVs)
**Action:** James clicks "Upload and Parse" button
- **System Response:** Shows progress bar
- **System Processing:**
  - Saves files to storage/
  - Parses each CV extracting: name, email, phone, skills, experience
  - Creates candidate records in database
  - Logs upload action in audit_logs table
- **Result:** Shows upload results: 33 success, 2 failed
- **Navigation:** Upload CVs (stay)

#### 6. Review Parse Results (Screen: Upload CVs)
**Action:** James reviews the results table
- Successful: 33 candidates parsed successfully
- Failed: 2 candidates with parsing errors (corrupted PDFs)
- **System Response:** Displays detailed results
- **Navigation:** Upload CVs (stay)

#### 7. Navigate to Candidates (Screen: Candidates List)
**Action:** James clicks "View All Candidates" link
- **System Response:** Shows paginated list of all 120 candidates
- **Navigation:** Upload CVs → Candidates List

#### 8. Navigate to Jobs (Screen: Jobs List)
**Action:** James clicks "Jobs" in navigation
- **System Response:** Shows list of 8 active jobs
- **Navigation:** Candidates List → Jobs List

#### 9. Select Job (Screen: Job Details)
**Action:** James clicks on "Senior Python Developer"
- **System Response:** Shows job details with requirements
  - Required skills: Python, FastAPI, PostgreSQL, Docker
  - Minimum experience: 5 years
  - Keywords: backend, API, microservices
- **Navigation:** Jobs List → Job Details

#### 10. Trigger Ranking (Screen: Job Details)
**Action:** James clicks "Rank Candidates" button
- **System Response:** Shows loading indicator
- **System Processing:**
  - Fetches all successfully parsed candidates (118 total)
  - For each candidate, calculates:
    - Skills match score (50% weight)
    - Experience match score (30% weight)
    - Keywords match score (20% weight)
  - Generates explanations for rankings
  - Saves scores to candidate_scores table
  - Logs ranking action in audit_logs
- **Result:** Redirects to ranking results
- **Navigation:** Job Details → Ranking Results

#### 11. Review Rankings (Screen: Ranking Results)
**Action:** James reviews top 10 candidates
- **System Response:** Shows ranked list with:
  - Rank #1: John Smith - Score: 92.5
  - Rank #2: Michael Chen - Score: 85.0
  - Rank #3: Sarah Johnson - Score: 78.5
  - ... (continues)
- Each shows:
  - Name, email, years of experience
  - Total score and component scores
  - Matched skills: Python, FastAPI, PostgreSQL, Docker
  - Missing skills: (if any)
  - Explanation: "Excellent match. Has all required skills..."
- **Navigation:** Job Details → Ranking Results

#### 12. View Candidate Details (Screen: Candidate Details)
**Action:** James clicks on "John Smith" (rank #1)
- **System Response:** Shows full candidate profile
  - Personal info: email, phone
  - Education details
  - Full skills list
  - Languages spoken
  - Raw CV text
  - Ranking explanation
- **Navigation:** Ranking Results → Candidate Details

#### 13. Navigate Back (Screen: Ranking Results)
**Action:** James clicks "Back to Rankings" button
- **System Response:** Returns to ranking results
- **Navigation:** Candidate Details → Ranking Results (back navigation ✓)

#### 14. Export Results (Screen: Ranking Results)
**Action:** James clicks "Export Top 10" button
- **System Response:** Downloads CSV file with top candidates
- **Navigation:** Ranking Results (stay)

#### 15. Finish Session
**Action:** James reviews results one more time
- **Outcome:** Successfully identified top 10 candidates in 15 minutes
- **Next Steps:** Share results with hiring manager
- **Navigation:** Can navigate back to Dashboard

### Postconditions
- 33 new candidates added to database
- Ranking completed for "Senior Python Developer" position
- All actions logged in audit trail
- James has shortlist of top 10 candidates

### Alternative Flows

**Alt Flow 1:** Parse Failure
- If all CVs fail to parse:
  - System shows error message
  - James can download error report
  - Can manually create candidate records

**Alt Flow 2:** No Candidates Match
- If no candidates meet minimum requirements:
  - System shows "No qualified candidates" message
  - Suggests lowering minimum experience
  - James can adjust job requirements

### Success Metrics
- Time saved: 80% (from 75 minutes to 15 minutes)
- Candidates reviewed: 118 (vs 10-15 manually)
- Consistency: 100% (same criteria for all)

---

## Scenario 2: Job Management & Reporting (HR Admin Journey)

**Persona:** Amanda Rodriguez (HR_ADMIN)  
**Duration:** ~20 minutes  
**Frequency:** Weekly

### Context
It's Monday morning. Amanda needs to create a new job position for "DevOps Engineer", run analytics on existing positions, and review team activities from the past week.

### Preconditions
- Amanda is logged into the system
- Historical data exists (candidates, jobs, rankings)
- Multiple recruiters have been using the system

### Step-by-Step Flow

#### 1. Login (Screen: Login Page)
**Action:** Amanda enters admin credentials
- **System Response:** Redirects to Dashboard
- **Navigation:** Login → Dashboard

#### 2. Review Dashboard (Screen: Dashboard)
**Action:** Amanda checks weekly overview
- Sees statistics:
  - Total candidates: 120
  - Active jobs: 8
  - Parse success rate: 95%
  - Recent rankings count
- **System Response:** Shows metrics
- **Navigation:** Dashboard (stay)

#### 3. Create New Job (Screen: Create Job)
**Action:** Amanda clicks "Create Job" button
- **System Response:** Shows job creation form
- **Navigation:** Dashboard → Create Job

#### 4. Fill Job Details (Screen: Create Job)
**Action:** Amanda enters job information
- Title: "DevOps Engineer"
- Description: "Looking for DevOps engineer with cloud experience..."
- Required skills: Docker, Kubernetes, AWS, Terraform
- Nice to have: Python, Ansible
- Minimum experience: 4 years
- Keywords: devops, cloud, infrastructure, automation
- **System Response:** Form validation
- **Navigation:** Create Job (stay)

#### 5. Save Job (Screen: Create Job)
**Action:** Amanda clicks "Create Job" button
- **System Processing:**
  - Validates input
  - Creates job record in database
  - Links to Amanda's user ID
  - Logs creation in audit_logs
- **System Response:** Shows success message
- **Navigation:** Create Job → Job Details

#### 6. Verify Job Created (Screen: Job Details)
**Action:** Amanda reviews the created job
- **System Response:** Shows all job details
- **Navigation:** Job Details (stay)

#### 7. Navigate to Reports (Screen: Reports Dashboard)
**Action:** Amanda clicks "Reports" in navigation
- **System Response:** Shows reports menu
  - Skills Frequency Report
  - Pipeline Statistics
  - Audit Logs
- **Navigation:** Job Details → Reports Dashboard

#### 8. Generate Skills Report (Screen: Skills Frequency Report)
**Action:** Amanda selects "Skills Frequency" and chooses "Senior Python Developer" job
- **System Processing:**
  - Queries all candidates
  - Counts skill occurrences
  - Calculates percentages
  - Generates top 20 skills list
- **System Response:** Shows report:
  - Python: 85 candidates (71%)
  - JavaScript: 62 candidates (52%)
  - Docker: 58 candidates (48%)
  - ... (continues)
- **Navigation:** Reports Dashboard → Skills Frequency Report

#### 9. Review Pipeline Stats (Screen: Pipeline Statistics)
**Action:** Amanda clicks "Back" then "Pipeline Statistics"
- **System Processing:**
  - Aggregates candidate data
  - Calculates success rates
  - Computes average scores by job
- **System Response:** Shows comprehensive stats:
  - Total candidates: 120
  - Successfully parsed: 114 (95%)
  - Failed parsing: 6 (5%)
  - Total jobs: 9
  - Active jobs: 9
  - Average scores table:
    - Senior Python Developer: 68.5 avg, 118 candidates
    - Full Stack Developer: 72.3 avg, 95 candidates
    - DevOps Engineer: N/A (new job)
- **Navigation:** Skills Report → Pipeline Stats (back navigation ✓)

#### 10. Access Audit Logs (Screen: Audit Logs)
**Action:** Amanda clicks "Audit Logs"
- **System Response:** Shows recent activities:
  - James Chen: Uploaded 35 CVs (2 hours ago)
  - James Chen: Ran ranking for job #1 (2 hours ago)
  - Amanda Rodriguez: Created job #9 (just now)
  - Sarah Kim: Updated candidate #45 (yesterday)
  - ... (100 recent entries)
- **Navigation:** Pipeline Stats → Audit Logs

#### 11. Filter Audit Logs (Screen: Audit Logs)
**Action:** Amanda filters by action type "cv_uploaded"
- **System Response:** Shows only upload actions
- Can see who uploaded what and when
- **Navigation:** Audit Logs (stay)

#### 12. Navigate to User Management (Screen: Users List)
**Action:** Amanda clicks "Users" in navigation
- **System Response:** Shows list of all users:
  - Amanda Rodriguez (HR_ADMIN) - Active
  - James Chen (HR_RECRUITER) - Active
  - Sarah Kim (HR_RECRUITER) - Active
- **Navigation:** Audit Logs → Users List

#### 13. Create New User (Screen: Create User)
**Action:** Amanda clicks "Add User" button
- **System Response:** Shows user creation form
- **Navigation:** Users List → Create User

#### 14. Fill User Details (Screen: Create User)
**Action:** Amanda enters new recruiter information
- Email: mike.torres@company.com
- Full name: Mike Torres
- Role: HR_RECRUITER
- Password: (temporary password)
- **System Processing:**
  - Validates email not taken
  - Hashes password
  - Creates user record
  - Logs action
- **System Response:** Success message
- **Navigation:** Create User → Users List

#### 15. Return to Dashboard (Screen: Dashboard)
**Action:** Amanda clicks "Dashboard" in navigation
- **System Response:** Shows updated dashboard
- Now shows 121 candidates, 9 jobs
- **Navigation:** Users List → Dashboard (back navigation ✓)

### Postconditions
- New "DevOps Engineer" job created
- New user "Mike Torres" created
- Reports generated for analysis
- All activities logged

### Success Metrics
- Job creation time: 3 minutes
- Report generation: Instant
- User management: 2 minutes
- Full visibility into team activities

---

**Document Version:** 1.0  
**Last Updated:** January 16, 2026
