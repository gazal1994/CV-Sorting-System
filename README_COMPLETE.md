# 🎓 CV Sorting & Candidate Recommendation System
## Agile Course Project - Complete Documentation

[![Project Status](https://img.shields.io/badge/Status-Ready%20for%20Implementation-green)]()
[![Documentation](https://img.shields.io/badge/Docs-85%2B%20Pages-blue)]()
[![Jira Ready](https://img.shields.io/badge/Jira-Setup%20Guide%20Available-orange)]()
[![AI Transparency](https://img.shields.io/badge/AI-Fully%20Documented-purple)]()

---

## 📋 PROJECT OVERVIEW

**Academic Project for:** Agile Software Engineering Course  
**Institution:** SCE - Shamoon College of Engineering  
**Student:** Gazal Agbaria (GazalAg@ac.sce.ac.il)  
**Project Code:** PROCV  
**Date:** January 16, 2026  

### 🎯 Vision
An intelligent recruitment platform that automates CV sorting and provides data-driven candidate recommendations, reducing hiring time by 60% and improving match accuracy to 85%+.

---

## 🚀 QUICK START

### Option 1: Automated Jira Setup (Requires Admin)
```bash
cd scripts
python3 jira_setup.py
```

### Option 2: Manual Jira Setup (Recommended)
1. Read [JIRA Setup Guide](docs/JIRA_SETUP_GUIDE.md)
2. Follow step-by-step instructions
3. Use CSV templates provided
4. Set up 7 Epics, 10 Stories, 30 Subtasks, 2 Sprints

### Option 3: Read Documentation First
Start with [Project Summary](docs/PROJECT_SUMMARY.md) for complete overview.

---

## 📚 DOCUMENTATION INDEX

### 🔵 Core Documents
1. **[PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md)** ⭐ **START HERE**
   - Complete project overview
   - All deliverables listed
   - Next steps guide
   - Success criteria checklist

2. **[JIRA_SETUP_GUIDE.md](docs/JIRA_SETUP_GUIDE.md)** 🎯 **ESSENTIAL**
   - Step-by-step Jira configuration
   - 7 Epics with descriptions
   - 10 User Stories with acceptance criteria
   - Sprint planning
   - CSV import templates

### 📘 Planning Documents
3. **[project-charter.md](docs/project-charter.md)**
   - 19 comprehensive sections
   - Vision, objectives, scope
   - Stakeholders, timeline, risks
   - 15+ pages

4. **[personas-detailed.md](docs/personas-detailed.md)**
   - HR_ADMIN (Rachel Cohen)
   - HR_RECRUITER (David Levi)
   - User journeys, pain points, success metrics
   - 12+ pages

5. **[scenarios-detailed.md](docs/scenarios-detailed.md)**
   - 7 realistic user scenarios
   - Step-by-step workflows
   - Time savings analysis
   - 10+ pages

### 🏗️ Technical Documents
6. **[architecture-detailed.md](docs/architecture-detailed.md)**
   - 3-tier architecture diagrams
   - Data flow visualization
   - Database schema (ERD)
   - Security architecture
   - API structure
   - 18+ pages

7. **[AI_USAGE_TRACKING.md](docs/AI_USAGE_TRACKING.md)**
   - Complete AI transparency
   - Prompt/output/outcome log
   - Productivity impact (32.5 hours saved)
   - Academic integrity statement
   - 10+ pages

---

## 🗂️ PROJECT STRUCTURE

```
📦 final project/
├── 📄 README.md (this file)
│
├── 📁 backend/               # Python FastAPI backend
│   ├── pytest.ini
│   ├── requirements.txt
│   ├── app/
│   │   ├── main.py          # FastAPI app
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models/          # SQLAlchemy ORM
│   │   ├── routes/          # API endpoints
│   │   │   ├── auth.py
│   │   │   ├── candidates.py
│   │   │   ├── jobs.py
│   │   │   ├── matching.py
│   │   │   ├── reports.py
│   │   │   └── users.py
│   │   ├── schemas/         # Pydantic validation
│   │   ├── services/        # Business logic
│   │   │   ├── matching_service.py
│   │   │   └── audit_service.py
│   │   └── utils/
│   │       ├── auth.py      # JWT utilities
│   │       └── cv_parser.py # NLP parsing
│   └── tests/               # pytest tests
│
├── 📁 frontend/              # React TypeScript frontend
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── components/      # Reusable UI
│       ├── pages/           # Route pages
│       ├── services/        # API client
│       ├── store/           # Zustand state
│       └── types/           # TypeScript types
│
├── 📁 data/                  # External data sources
│   ├── skills_taxonomy.json # Skills catalog ✅ DATA SOURCE 3
│   └── sample_cvs/          # Sample CVs ✅ DATA SOURCE 2
│
├── 📁 docs/ ⭐               # All documentation
│   ├── PROJECT_SUMMARY.md   # Start here!
│   ├── JIRA_SETUP_GUIDE.md  # Jira setup
│   ├── project-charter.md   # Vision & planning
│   ├── personas-detailed.md # User personas
│   ├── scenarios-detailed.md# User scenarios
│   ├── architecture-detailed.md # System design
│   └── AI_USAGE_TRACKING.md # AI transparency
│
└── 📁 scripts/
    ├── seed_data.py
    └── jira_setup.py ⭐      # Jira automation
```

---

## 🎯 JIRA PROJECT STRUCTURE

### 📦 Epics (7)
| ID | Name | Priority | Stories |
|----|------|----------|---------|
| **EPIC-CV-01** | Authentication & Authorization | Highest | 2 stories |
| **EPIC-CV-02** | CV Upload & Parsing | Highest | 2 stories |
| **EPIC-CV-03** | Job Position Management | High | 1 story |
| **EPIC-CV-04** | Matching & Ranking | Highest | 1 story |
| **EPIC-CV-05** | Reports & Analytics | Medium | 2 stories |
| **EPIC-CV-06** | Audit Logging | Medium | 1 story |
| **EPIC-CV-07** | Dashboard & UI | High | 1 story |

### 📝 User Stories (10)

#### Sprint 1: Foundation (Dec 18 - Jan 3)
| ID | Title | Persona | Points |
|----|-------|---------|--------|
| **US-1** | User Login with Role-Based Access | HR_ADMIN, HR_RECRUITER | 8 |
| **US-2** | Upload Multiple CV Files | HR_RECRUITER | 13 |
| **US-3** | Parse CV Content | HR_RECRUITER | 13 |
| **US-4** | Create Job Position | HR_RECRUITER | 8 |
| **Total** | | | **42** |

#### Sprint 2: Completion (Jan 4 - Jan 20)
| ID | Title | Persona | Points |
|----|-------|---------|--------|
| **US-5** | Rank Candidates for Job | HR_RECRUITER | 13 |
| **US-6** | View Top Skills Report | HR_ADMIN | 8 |
| **US-7** | View Candidate Pipeline Statistics | HR_ADMIN | 8 |
| **US-8** | View Audit Logs | HR_ADMIN | 5 |
| **US-9** | Navigate Dashboard | HR_RECRUITER | 5 |
| **US-10** | Manage Users (Admin Only) | HR_ADMIN | 8 |
| **Total** | | | **47** |

### ✅ Subtasks (30)
Each story has 3 subtasks:
- Frontend (React/TypeScript)
- Backend (Python/FastAPI)
- Testing (pytest/Jest)

---

## 👥 PERSONAS

### 👔 HR_ADMIN (Rachel Cohen)
- **Role:** HR Director
- **Focus:** Strategic oversight, compliance, analytics
- **Capabilities:**
  - ✅ Full system access
  - ✅ User management
  - ✅ View all reports
  - ✅ Audit logs
  - ✅ System configuration

### 💼 HR_RECRUITER (David Levi)
- **Role:** Senior Recruiter
- **Focus:** Candidate screening, job matching
- **Capabilities:**
  - ✅ Upload CVs
  - ✅ Create job positions
  - ✅ Run candidate rankings
  - ✅ View reports (own)
  - ✅ Dashboard access

[Full personas in docs/personas-detailed.md](docs/personas-detailed.md)

---

## 🏗️ SYSTEM ARCHITECTURE

### Technology Stack

#### Backend
- **Framework:** FastAPI (Python 3.9+)
- **Database:** SQLite ✅ **DATA SOURCE 1**
- **Authentication:** JWT + bcrypt
- **CV Parsing:** NLP (spaCy/NLTK)
- **Testing:** pytest

#### Frontend
- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **State:** Zustand
- **HTTP:** Axios
- **Testing:** Jest, RTL

#### Infrastructure
- **Version Control:** Git
- **CI/CD:** GitHub Actions
- **Documentation:** Markdown
- **Project Management:** Jira

### Data Sources (4 Required) ✅
1. **Database Tables** (users, candidates, jobs, skills, audit_logs)
2. **CV Files** (storage/cvs/ - PDF/TXT/DOCX)
3. **Skills Taxonomy** (data/skills_taxonomy.json)
4. **Audit Logs** (audit_logs table) ✅ **DATA SOURCE 4**

[Full architecture in docs/architecture-detailed.md](docs/architecture-detailed.md)

---

## 📊 FEATURES

### F1: Authentication & Roles ✅
- Secure login with JWT
- Role-based access (ADMIN, RECRUITER)
- Session management
- Password encryption

### F2: CV Upload & Parsing ✅
- Batch file upload
- Support PDF, TXT, DOCX
- NLP text extraction
- Skills identification
- Experience parsing

### F3: Job Management ✅
- Create job positions
- Define required skills
- Set experience levels
- Track candidates per job

### F4: Matching & Ranking ✅
- Skills-based algorithm
- Experience weighting
- Match score (0-100%)
- Explainable rankings

### F5: Reports & Analytics ✅
- Top skills frequency
- Pipeline statistics
- Time-to-hire metrics
- Export to PDF/CSV

### F6: Audit Logging ✅
- Track all user actions
- Compliance trail
- Searchable logs
- Export capability

### F7: Dashboard & UI ✅
- Responsive design
- Quick actions
- Data visualizations
- Mobile-friendly

---

## 📈 SUCCESS METRICS

From [Project Charter](docs/project-charter.md):

| Metric | Target | Impact |
|--------|--------|--------|
| **Time-to-hire** | 60% reduction | 45 days → 18 days |
| **CV processing** | < 2 min/CV | 15 min → 2 min |
| **Match accuracy** | 85%+ | Data-driven hiring |
| **System uptime** | 99%+ | Always available |
| **User satisfaction** | 4.5/5 | High adoption |
| **Test coverage** | 80%+ | Quality assurance |

---

## 🤖 AI TRANSPARENCY

This project used **GitHub Copilot (Claude Sonnet 4.5)** extensively for:
- ✅ Documentation generation (85+ pages)
- ✅ Jira automation script
- ✅ Architecture planning
- ✅ Best practices guidance

**Time Saved:** ~32.5 hours  
**Efficiency Gain:** 86%  

[Complete AI usage log in docs/AI_USAGE_TRACKING.md](docs/AI_USAGE_TRACKING.md)

### Academic Integrity ✅
All AI usage fully disclosed. Human oversight and validation applied to all content. Student takes full responsibility for all deliverables.

---

## ✅ CHECKLIST

### Documentation ✅
- [x] Project Charter (15 pages)
- [x] Personas (12 pages)
- [x] Scenarios (10 pages)
- [x] Architecture (18 pages)
- [x] Jira Guide (20 pages)
- [x] AI Tracking (10 pages)
- [x] Project Summary (10 pages)

### Jira Setup 🔄
- [ ] Create project PROCV
- [ ] Create 7 Epics
- [ ] Create 10 User Stories
- [ ] Create 30 Subtasks
- [ ] Configure 2 Sprints
- [ ] Apply labels

### Implementation (Future)
- [ ] Sprint 1 complete
- [ ] Sprint 2 complete
- [ ] Tests passing
- [ ] Demo ready
- [ ] Final submission

---

## 📞 NEXT STEPS

### Immediate Actions
1. ✅ Review [PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md)
2. 🔄 Set up Jira using [JIRA_SETUP_GUIDE.md](docs/JIRA_SETUP_GUIDE.md)
3. 📅 Initialize Sprint 1 (Dec 18)

### Week 1-2 (Sprint 1)
- Implement authentication (US-1)
- Build CV upload (US-2)
- Create CV parser (US-3)
- Add job management (US-4)

### Week 3-4 (Sprint 2)
- Complete matching algorithm (US-5)
- Add reports (US-6, US-7)
- Implement audit logs (US-8)
- Polish UI (US-9, US-10)

### Final Week
- Testing and QA
- Documentation finalization
- Demo preparation
- Project submission

---

## 📁 KEY FILES

### To Read Now:
1. [docs/PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md) ⭐ **START HERE**
2. [docs/JIRA_SETUP_GUIDE.md](docs/JIRA_SETUP_GUIDE.md) 🎯 **NEXT**

### To Reference During Implementation:
3. [docs/project-charter.md](docs/project-charter.md)
4. [docs/personas-detailed.md](docs/personas-detailed.md)
5. [docs/scenarios-detailed.md](docs/scenarios-detailed.md)
6. [docs/architecture-detailed.md](docs/architecture-detailed.md)

### For Academic Submission:
7. [docs/AI_USAGE_TRACKING.md](docs/AI_USAGE_TRACKING.md)

### To Run (Optional):
8. [scripts/jira_setup.py](scripts/jira_setup.py)

---

## 🏆 PROJECT HIGHLIGHTS

✅ **85+ pages** of professional documentation  
✅ **Complete Jira structure** ready to implement  
✅ **7 Epics, 10 Stories, 30 Subtasks** defined  
✅ **2 Sprints** planned with realistic timelines  
✅ **4 Data sources** documented  
✅ **Full AI transparency** maintained  
✅ **Production-ready** architecture  
✅ **Academic standards** met  

---

## 📧 CONTACT

**Student:** Gazal Agbaria  
**Email:** GazalAg@ac.sce.ac.il  
**Institution:** SCE - Shamoon College of Engineering  
**Course:** Agile Software Engineering  
**Date:** January 16, 2026  

---

## 📜 LICENSE

Academic Project - All Rights Reserved  
© 2026 Gazal Agbaria

---

**🚀 Ready to begin? Start with [PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md)**

---

*Last Updated: January 16, 2026*  
*Status: Ready for Jira Setup & Implementation*
