# 📥 JIRA CSV IMPORT GUIDE
## Quick Setup in 15 Minutes

**Files Ready for Import:**
- ✅ `epics.csv` - 7 Epics
- ✅ `user-stories.csv` - 10 User Stories

---

## 🚀 IMPORT STEPS

### STEP 1: Create Project First (5 min)
1. Login to Jira: https://yoursite.atlassian.net
2. Click **"Projects"** → **"Create Project"**
3. Select **"Scrum"** template
4. **Name:** CV Sorting System - Agile Project
5. **Key:** PROCV
6. Click **"Create"**

### STEP 2: Import Epics (3 min)
1. Go to your PROCV project
2. Click **Settings (⚙️)** → **"Issues"**
3. Click **"Import issues from CSV"**
4. Upload: `epics.csv`
5. Map columns:
   - **Summary** → Summary
   - **Issue Type** → Issue Type
   - **Description** → Description
   - **Priority** → Priority
   - **Labels** → Labels
   - **Epic Name** → Epic Name
6. Click **"Begin Import"**
7. Wait for completion (7 epics created)

### STEP 3: Import User Stories (3 min)
1. Click **"Import issues from CSV"** again
2. Upload: `user-stories.csv`
3. Map columns:
   - **Summary** → Summary
   - **Issue Type** → Issue Type
   - **Description** → Description
   - **Epic Link** → Epic Link
   - **Priority** → Priority
   - **Story Points** → Story Points
   - **Labels** → Labels
   - **Acceptance Criteria** → Description (append)
4. Click **"Begin Import"**
5. Wait for completion (10 stories created)

### STEP 4: Create Sprints (4 min)

**Sprint 1:**
1. Go to **Backlog**
2. Click **"Create Sprint"**
3. Name: **"Sprint 1 - Foundation"**
4. Start Date: **December 18, 2024**
5. End Date: **January 3, 2025**
6. Drag these stories into Sprint 1:
   - US-1: User Login with Role-Based Access
   - US-2: Upload Multiple CV Files
   - US-3: Parse CV Content
   - US-4: Create Job Position

**Sprint 2:**
1. Click **"Create Sprint"** again
2. Name: **"Sprint 2 - Completion"**
3. Start Date: **January 4, 2025**
4. End Date: **January 20, 2025**
5. Drag these stories into Sprint 2:
   - US-5: Rank Candidates for Job
   - US-6: View Top Skills Report
   - US-7: View Candidate Pipeline Statistics
   - US-8: View Audit Logs
   - US-9: Navigate Dashboard
   - US-10: Manage Users (Admin Only)

### STEP 5: Create Subtasks (Manual - 30 min)

For **each of the 10 User Stories**, create 3 subtasks:

**Example for US-1:**
1. Click on **US-1** to open
2. Click **"Create subtask"**
3. **Subtask 1:**
   - Summary: `US-1.1: Frontend - Login UI`
   - Description: `Create login form component with email/password fields, form validation, error display, remember me checkbox`
   - Labels: `Frontend`

4. **Subtask 2:**
   - Summary: `US-1.2: Backend - Auth Endpoints`
   - Description: `Implement POST /auth/login and /auth/logout endpoints, JWT token generation, password verification with bcrypt, session management`
   - Labels: `Backend`

5. **Subtask 3:**
   - Summary: `US-1.3: Testing - Auth Tests`
   - Description: `Write unit tests for auth logic, integration tests for endpoints, test role-based access, test session expiry, security testing`
   - Labels: `Testing`

**Repeat for US-2 through US-10** (follow pattern in JIRA_SETUP_GUIDE.md)

---

## ✅ VERIFICATION

After import, you should have:
- [x] 7 Epics (EPIC-CV-01 through EPIC-CV-07)
- [x] 10 User Stories (US-1 through US-10)
- [x] 2 Sprints configured with dates
- [x] Sprint 1: 4 stories (42 points)
- [x] Sprint 2: 6 stories (47 points)
- [ ] 30 Subtasks (create manually)

---

## ⚠️ TROUBLESHOOTING

### Issue: CSV Import Not Available
**Solution:** 
- Go to Project Settings → Apps
- Enable "Jira Importers" app
- Restart import process

### Issue: Epic Link Not Working
**Solution:**
- Import Epics first
- Then import Stories
- Epic Link field must match Epic Name exactly

### Issue: Story Points Not Showing
**Solution:**
- Go to Board Settings → Estimation
- Select "Story Points"
- Save

### Issue: Acceptance Criteria in Wrong Field
**Solution:**
- During import, append to Description
- Or manually add to stories after import

---

## 🎯 NEXT STEPS

1. ✅ Import Epics (Done with CSV)
2. ✅ Import User Stories (Done with CSV)
3. ✅ Create Sprints (Done)
4. 🔄 Create 30 Subtasks (Manual - 30 min)
5. ✅ Start Sprint 1
6. ✅ Begin Development

---

## 💡 PRO TIPS

### Faster Subtask Creation:
1. Create 3 subtasks for US-1
2. For US-2, clone US-1's subtasks
3. Update names: US-2.1, US-2.2, US-2.3
4. Update descriptions
5. Repeat for all stories

### Use Templates:
Create a template for subtask descriptions:
- **Frontend:** `Create [component] with [features]`
- **Backend:** `Implement [endpoint] with [logic]`
- **Testing:** `Write [test type] for [feature]`

---

## 📞 NEED HELP?

- **Full Manual Guide:** See `docs/JIRA_SETUP_GUIDE.md`
- **Subtask Details:** Section 3 of JIRA_SETUP_GUIDE.md
- **Quick Reference:** See `docs/QUICK_REFERENCE.md`

---

**Import Time:** 15 minutes + 30 minutes for subtasks = **45 minutes total**

Much faster than manual creation! 🚀
