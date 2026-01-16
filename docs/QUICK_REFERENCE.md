# 🚀 QUICK REFERENCE GUIDE
## CV Sorting System - Jira Project Setup

**⏱️ Time to Complete:** 2-3 hours  
**📋 Complexity:** Medium  
**🎯 Goal:** Fully configured Jira Scrum board with 7 Epics, 10 Stories, 30 Subtasks

---

## 📖 BEFORE YOU START

### Read These First:
1. ✅ [PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md) - 5 min read
2. ✅ [JIRA_SETUP_GUIDE.md](docs/JIRA_SETUP_GUIDE.md) - Complete instructions

### Have Ready:
- ✅ Jira account (https://yoursite.atlassian.net)
- ✅ Project creation permissions
- ✅ 2-3 hours of focused time
- ✅ This guide

---

## ⚡ SPEED SETUP (Step-by-Step)

### STEP 1: Create Project (5 min)
```
1. Login to Jira
2. Click "Projects" → "Create Project"
3. Select "Scrum" template
4. Name: "CV Sorting System - Agile Project"
5. Key: PROCV
6. Click "Create"
```

### STEP 2: Create Epics (15 min)
Copy these 7 epics from [JIRA_SETUP_GUIDE.md](docs/JIRA_SETUP_GUIDE.md):

1. **EPIC-CV-01:** Authentication & Authorization
2. **EPIC-CV-02:** CV Upload & Parsing
3. **EPIC-CV-03:** Job Position Management
4. **EPIC-CV-04:** Matching & Ranking Algorithm
5. **EPIC-CV-05:** Reports & Analytics
6. **EPIC-CV-06:** Audit Logging
7. **EPIC-CV-07:** Dashboard & UI

**Tip:** Use bulk create or copy-paste descriptions

### STEP 3: Create User Stories (30 min)
Create these 10 stories (full details in guide):

**Sprint 1 (4 stories):**
- US-1: User Login with Role-Based Access (8 pts)
- US-2: Upload Multiple CV Files (13 pts)
- US-3: Parse CV Content (13 pts)
- US-4: Create Job Position (8 pts)

**Sprint 2 (6 stories):**
- US-5: Rank Candidates for Job (13 pts)
- US-6: View Top Skills Report (8 pts)
- US-7: View Candidate Pipeline Statistics (8 pts)
- US-8: View Audit Logs (5 pts)
- US-9: Navigate Dashboard (5 pts)
- US-10: Manage Users (8 pts)

**Tip:** Link each story to its Epic

### STEP 4: Create Subtasks (45 min)
For EACH of the 10 stories, create 3 subtasks:

**Pattern for US-1:**
- US-1.1: Frontend - Login UI
- US-1.2: Backend - Auth Endpoints
- US-1.3: Testing - Auth Tests

**Repeat for US-2 through US-10**

**Tip:** Use templates or bulk operations

### STEP 5: Create Sprints (10 min)

**Sprint 1:**
- Name: "Sprint 1 - Foundation"
- Start: Dec 18, 2024
- End: Jan 3, 2025
- Add: US-1, US-2, US-3, US-4

**Sprint 2:**
- Name: "Sprint 2 - Completion"
- Start: Jan 4, 2025
- End: Jan 20, 2025
- Add: US-5, US-6, US-7, US-8, US-9, US-10

### STEP 6: Apply Labels (15 min)
Create and apply these labels:

**Persona Labels:**
- HR_ADMIN
- HR_RECRUITER

**Feature Labels:**
- Feature-Auth
- Feature-CV-Upload
- Feature-Jobs
- Feature-Matching
- Feature-Reports
- Feature-Audit
- Feature-UI

**Sprint Labels:**
- Sprint-1
- Sprint-2

**Type Labels:**
- Frontend
- Backend
- Testing

### STEP 7: Configure Board (10 min)
1. Go to Board Settings
2. Configure columns:
   - To Do
   - In Progress
   - In Review
   - Done
3. Set board filters
4. Save configuration

---

## ✅ VERIFICATION CHECKLIST

After setup, verify:

- [ ] Project "PROCV" exists
- [ ] Scrum board created
- [ ] 7 Epics created and labeled
- [ ] 10 User Stories created
- [ ] Each story linked to an Epic
- [ ] 30 Subtasks created (3 per story)
- [ ] 2 Sprints configured with dates
- [ ] Sprint 1 has 4 stories (42 points)
- [ ] Sprint 2 has 6 stories (47 points)
- [ ] All labels applied correctly
- [ ] Board columns configured
- [ ] Stories have story points
- [ ] Stories have acceptance criteria

---

## 🎯 COMMON ISSUES & FIXES

### Issue: Can't create Epics
**Solution:** Ensure you're using Scrum template, not Kanban

### Issue: Stories won't link to Epics
**Solution:** Use "Link" → "Relates to" or "Parent" field

### Issue: Sprint dates wrong
**Solution:** Edit sprint, change start/end dates

### Issue: Story points not showing
**Solution:** Board settings → Estimation → Story points

---

## 📊 FINAL JIRA STRUCTURE

```
PROCV (Project)
│
├── Sprint 1 (Dec 18 - Jan 3)
│   ├── US-1 (8 pts) → EPIC-CV-01
│   │   ├── US-1.1 Frontend
│   │   ├── US-1.2 Backend
│   │   └── US-1.3 Testing
│   ├── US-2 (13 pts) → EPIC-CV-02
│   ├── US-3 (13 pts) → EPIC-CV-02
│   └── US-4 (8 pts) → EPIC-CV-03
│
└── Sprint 2 (Jan 4 - Jan 20)
    ├── US-5 (13 pts) → EPIC-CV-04
    ├── US-6 (8 pts) → EPIC-CV-05
    ├── US-7 (8 pts) → EPIC-CV-05
    ├── US-8 (5 pts) → EPIC-CV-06
    ├── US-9 (5 pts) → EPIC-CV-07
    └── US-10 (8 pts) → EPIC-CV-01
```

---

## 📱 MOBILE QUICK TIPS

Setting up from phone/tablet?
1. Use Jira mobile app
2. Create epics first (easiest on mobile)
3. Use desktop for bulk story creation
4. Mobile good for review and updates

---

## 🔗 HELPFUL LINKS

- **Full Setup Guide:** [docs/JIRA_SETUP_GUIDE.md](docs/JIRA_SETUP_GUIDE.md)
- **Project Summary:** [docs/PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md)
- **Epics Details:** Section 2 of JIRA_SETUP_GUIDE.md
- **Stories Details:** Section 3 of JIRA_SETUP_GUIDE.md
- **CSV Import:** Section 7 of JIRA_SETUP_GUIDE.md

---

## ⏱️ TIME BREAKDOWN

| Task | Estimated Time |
|------|---------------|
| Create Project | 5 minutes |
| Create 7 Epics | 15 minutes |
| Create 10 Stories | 30 minutes |
| Create 30 Subtasks | 45 minutes |
| Create 2 Sprints | 10 minutes |
| Apply Labels | 15 minutes |
| Configure Board | 10 minutes |
| **TOTAL** | **2 hours 10 min** |

**Tip:** Take a 10-minute break after subtasks!

---

## 🎓 LEARNING OBJECTIVES

By completing this setup, you'll learn:
- ✅ Jira project configuration
- ✅ Scrum board setup
- ✅ Epic/Story/Subtask hierarchy
- ✅ Sprint planning
- ✅ Agile estimation (story points)
- ✅ User story formatting
- ✅ Acceptance criteria writing

---

## 🏁 NEXT STEPS AFTER SETUP

1. ✅ **Take screenshot** of your Jira board
2. ✅ **Start Sprint 1** (Dec 18 or when ready)
3. ✅ **Move US-1 to "In Progress"**
4. ✅ **Begin implementation**
5. ✅ **Update board daily**

---

## 💡 PRO TIPS

### Tip 1: Use Templates
Create story template with:
```
As a [persona]
I want [feature]
So that [benefit]

Acceptance Criteria:
- [ ] ...
- [ ] ...
```

### Tip 2: Bulk Operations
- Select multiple issues
- Apply labels in batch
- Move to sprint together

### Tip 3: Keyboard Shortcuts
- `C` = Create issue
- `G` then `B` = Go to board
- `/` = Quick search

### Tip 4: Save Time
- Use CSV import for stories (see guide)
- Clone subtasks from US-1 to others
- Set up custom filters

---

## 🆘 NEED HELP?

### Documentation:
- [JIRA_SETUP_GUIDE.md](docs/JIRA_SETUP_GUIDE.md) - Complete instructions
- [PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md) - Project overview

### Jira Help:
- Atlassian Documentation: https://support.atlassian.com
- Jira Academy: https://university.atlassian.com

### Contact:
- Email: GazalAg@ac.sce.ac.il

---

## ✅ SUCCESS!

Once you see your Jira board with:
- 7 Epics
- 10 Stories
- 30 Subtasks
- 2 Sprints

**You're ready to begin development! 🎉**

---

**Quick Ref Version:** 1.0  
**Last Updated:** January 16, 2026  
**Estimated Setup Time:** 2-3 hours  

---

🚀 **Ready? Open [JIRA_SETUP_GUIDE.md](docs/JIRA_SETUP_GUIDE.md) and let's go!**
