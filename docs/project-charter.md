# Project Charter
## CV Sorting & Candidate Recommendation System

**Document Version:** 1.0  
**Date:** January 16, 2026  
**Project Key:** PROCV  
**Project Type:** Scrum/Agile Software Development

---

## 1. Executive Summary

The CV Sorting & Candidate Recommendation System is an intelligent recruitment platform designed to streamline the hiring process for HR departments. The system automates CV parsing, candidate evaluation, and job matching using advanced algorithms, reducing manual effort and improving hiring quality.

---

## 2. Project Vision

**Vision Statement:**  
To revolutionize the recruitment process by providing HR professionals with an intelligent, automated system that identifies the best candidates for job positions based on skills, experience, and qualifications.

**Mission:**  
Deliver a user-friendly, secure, and efficient platform that:
- Reduces time-to-hire by 60%
- Improves candidate-job matching accuracy to 85%+
- Provides actionable insights through comprehensive analytics
- Ensures compliance through complete audit trails

---

## 3. Business Objectives

### Primary Objectives:
1. **Automation**: Automate 80% of initial candidate screening
2. **Accuracy**: Achieve 85%+ matching accuracy between candidates and jobs
3. **Efficiency**: Reduce CV processing time from 15 minutes to 2 minutes per candidate
4. **Insights**: Provide data-driven hiring insights and trends

### Success Metrics:
- Time-to-hire reduced by 60%
- CV processing time < 2 minutes per candidate
- User satisfaction score > 4.5/5
- System uptime > 99%
- Zero security breaches

---

## 4. Scope

### In Scope:
✅ User authentication with role-based access (HR_ADMIN, HR_RECRUITER)  
✅ CV upload and automated parsing (PDF, TXT, DOCX)  
✅ Job position creation and management  
✅ Skills-based candidate ranking algorithm  
✅ Reports and analytics dashboard  
✅ Audit logging for compliance  
✅ Responsive web interface  

### Out of Scope:
❌ Email integration for candidate communication  
❌ Video interview scheduling  
❌ Background check integration  
❌ Mobile native applications (Phase 2)  
❌ Integration with external ATS systems (Phase 2)

---

## 5. Stakeholders

| Role | Name | Responsibility |
|------|------|----------------|
| **Project Sponsor** | Academic Supervisor | Final approval, budget oversight |
| **Product Owner** | Gazal Agbaria | Requirements, prioritization |
| **Development Team** | Gazal Agbaria | Design, development, testing |
| **End Users** | HR Admins & Recruiters | Testing, feedback |

---

## 6. Project Organization

### Roles and Personas:

**HR_ADMIN (Administrator)**
- Full system access
- User management capabilities
- View all reports and audit logs
- System configuration

**HR_RECRUITER (Recruiter)**
- Upload and manage CVs
- Create job positions
- Run candidate rankings
- View recruitment reports

---

## 7. High-Level Requirements

### Functional Requirements:

**FR-1: Authentication & Authorization**
- Secure login with email/password
- Role-based access control (RBAC)
- Session management
- Password encryption

**FR-2: CV Management**
- Upload multiple CVs (batch processing)
- Support PDF, TXT, DOCX formats
- Automatic parsing of skills, experience, education
- Store CV metadata and original files

**FR-3: Job Position Management**
- Create, update, delete job positions
- Define required skills and experience levels
- Set job status (open/closed)
- Track applications per job

**FR-4: Matching & Ranking**
- Calculate match score (0-100%)
- Rank candidates by relevance
- Consider skills, experience, education
- Configurable weighting algorithm

**FR-5: Reports & Analytics**
- Top skills frequency per job
- Candidate pipeline statistics
- Time-to-hire metrics
- Skills gap analysis

**FR-6: Audit & Compliance**
- Log all user actions
- Track data modifications
- Maintain audit trail
- Export audit logs

**FR-7: User Interface**
- Responsive dashboard
- Intuitive navigation
- Data visualization (charts, graphs)
- Real-time updates

### Non-Functional Requirements:

**NFR-1: Performance**
- CV parsing < 5 seconds per document
- Page load time < 2 seconds
- Support 100+ concurrent users

**NFR-2: Security**
- HTTPS encryption
- Password hashing (bcrypt)
- JWT token authentication
- SQL injection prevention

**NFR-3: Usability**
- Intuitive UI requiring < 1 hour training
- Accessibility compliance (WCAG 2.1)
- Mobile-responsive design

**NFR-4: Reliability**
- 99% uptime
- Automatic error recovery
- Data backup (daily)

**NFR-5: Maintainability**
- Modular architecture
- Comprehensive documentation
- Unit test coverage > 80%
- Code review process

---

## 8. Technology Stack

### Backend:
- **Language:** Python 3.9+
- **Framework:** FastAPI
- **Database:** SQLite (development) / PostgreSQL (production)
- **Authentication:** JWT tokens
- **CV Parsing:** NLP libraries (spaCy, NLTK)

### Frontend:
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **State Management:** Zustand
- **UI Components:** Custom + CSS
- **Charts:** Chart.js / D3.js

### DevOps:
- **Version Control:** Git
- **CI/CD:** GitHub Actions
- **Testing:** pytest, Jest, React Testing Library
- **Documentation:** Markdown

---

## 9. Project Timeline

### Sprint 1: Foundation (Dec 18, 2024 - Jan 3, 2025)
**Duration:** 17 days

**Deliverables:**
- Repository setup with CI/CD
- Authentication system (login/logout)
- User role management
- CV upload functionality
- Basic CV parsing
- Database schema
- Initial UI framework

**Key Milestones:**
- Day 5: Auth system complete
- Day 10: CV upload working
- Day 15: Basic parsing functional
- Day 17: Sprint 1 demo

---

### Sprint 2: Completion (Jan 4, 2025 - Jan 20, 2025)
**Duration:** 17 days

**Deliverables:**
- Matching algorithm implementation
- Job position management
- Reports and analytics
- Audit logging
- Dashboard UI completion
- Comprehensive testing
- Documentation
- Final deployment

**Key Milestones:**
- Day 5: Ranking algorithm complete
- Day 10: Reports functional
- Day 15: All testing complete
- Day 17: Final demo and handover

---

## 10. Budget & Resources

### Human Resources:
- 1 Full-stack Developer (Gazal Agbaria): 6 weeks
- 1 Academic Supervisor: Advisory role

### Infrastructure:
- Development environment: Local machine
- Cloud hosting: Free tier (Render/Railway)
- Domain: Optional
- Total estimated cost: $0-50

### Tools & Software:
- Jira (Free tier)
- GitHub (Free)
- VS Code (Free)
- Python/Node.js (Free/Open Source)

---

## 11. Risk Management

| Risk | Probability | Impact | Mitigation Strategy |
|------|------------|--------|-------------------|
| CV parsing accuracy issues | High | High | Use pre-trained NLP models, test with diverse CVs |
| Time constraints | Medium | High | Prioritize core features, reduce scope if needed |
| Algorithm complexity | Medium | Medium | Start with simple scoring, iterate based on results |
| Security vulnerabilities | Low | High | Follow OWASP guidelines, regular security audits |
| Data privacy concerns | Low | High | Implement GDPR-compliant data handling |
| Technology learning curve | Medium | Medium | Allocate time for learning, use documentation |

---

## 12. Quality Assurance

### Testing Strategy:
1. **Unit Testing:** 80%+ code coverage
2. **Integration Testing:** API endpoints, database operations
3. **UI Testing:** Component testing, user flows
4. **Performance Testing:** Load testing, stress testing
5. **Security Testing:** Penetration testing, vulnerability scanning
6. **User Acceptance Testing:** With HR personnel

### Quality Metrics:
- Zero critical bugs in production
- < 5 minor bugs per sprint
- All user stories meet acceptance criteria
- Documentation complete and current

---

## 13. Communication Plan

### Daily:
- Stand-up: Progress review (if team-based)
- Code commits with clear messages

### Weekly:
- Progress report to supervisor
- Update Jira board

### Sprint Events:
- Sprint Planning (Day 1)
- Sprint Review/Demo (Last day)
- Sprint Retrospective (Last day)

---

## 14. Acceptance Criteria

The project is considered complete when:

✅ All 10 user stories are implemented and tested  
✅ All acceptance criteria per user story are met  
✅ System passes security audit  
✅ Documentation is complete (technical + user)  
✅ Successful demo to stakeholders  
✅ Code is deployed and accessible  
✅ All tests pass (unit, integration, E2E)  
✅ Jira board reflects completed work  

---

## 15. Dependencies

### External Dependencies:
- Python libraries (FastAPI, spaCy, SQLAlchemy)
- Node.js packages (React, Vite, TypeScript)
- Jira API access
- GitHub repository

### Internal Dependencies:
- Database schema must be finalized before backend development
- Authentication must be complete before protected routes
- CV parsing must work before matching algorithm
- Backend APIs must be ready before frontend integration

---

## 16. Assumptions

1. Users have modern web browsers (Chrome, Firefox, Safari)
2. CVs are in English language
3. CVs follow standard formatting conventions
4. Internet connectivity is available
5. Sample CVs are available for testing
6. Skills taxonomy is predefined and available

---

## 17. Constraints

1. **Time:** 6 weeks total development time
2. **Budget:** Minimal ($0-50)
3. **Team Size:** 1 developer
4. **Technology:** Must use Python backend, React frontend
5. **Scope:** Academic project requirements must be met

---

## 18. Project Approval

| Approver | Signature | Date |
|----------|-----------|------|
| Project Sponsor | _________________ | _______ |
| Product Owner | _________________ | _______ |
| Development Lead | _________________ | _______ |

---

## 19. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-16 | Gazal Agbaria | Initial charter created |

---

**END OF PROJECT CHARTER**

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Sponsor | Dr. Sarah Martinez | _______________ | _______ |
| Product Owner | Alex Johnson | _______________ | _______ |
| Development Lead | Team Lead | _______________ | _______ |

---

**Document Version:** 1.0  
**Last Updated:** January 16, 2026  
**Next Review:** February 16, 2026
