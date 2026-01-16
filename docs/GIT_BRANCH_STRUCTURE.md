# Git Branch Structure - CV Sorting System

**Repository:** https://github.com/gazal1994/CV-Sorting-System.git

---

## 🌳 Main Branches

### 1. **main** (Production)
- **Purpose:** Production-ready code
- **Protection:** Should be protected, requires PR approval
- **Merges from:** `staging` branch only
- **Status:** ✅ Created and pushed

### 2. **develop** (Development)
- **Purpose:** Integration branch for features
- **Merges from:** Feature branches
- **Merges to:** `staging` for testing
- **Status:** ✅ Created and pushed

### 3. **staging** (Pre-production)
- **Purpose:** Testing environment before production
- **Merges from:** `develop` branch
- **Merges to:** `main` after successful testing
- **Status:** ✅ Created and pushed

---

## 🔧 Feature Branches (Jira Items)

All feature branches follow the naming convention: `feature/CSSAP-#-brief-description`

### CSSAP-13: User Login with Role-Based Access
- **Branch:** `feature/CSSAP-13-user-login-role-based-access`
- **Jira Status:** ✅ DONE
- **Description:** US-1 - Authentication and role-based access control
- **Files:** 
  - `backend/app/routes/auth.py`
  - `backend/app/utils/auth.py`
  - `frontend/src/pages/Login.tsx`
  - `frontend/src/store/authStore.ts`

### CSSAP-14: Upload Multiple CV Files
- **Branch:** `feature/CSSAP-14-upload-multiple-cv-files`
- **Jira Status:** ✅ DONE
- **Description:** US-2 - Upload and parse multiple CV files
- **Files:**
  - `backend/app/routes/candidates.py`
  - `backend/app/utils/cv_parser.py`
  - `frontend/src/pages/UploadCV.tsx`

### CSSAP-16: Create Job Position
- **Branch:** `feature/CSSAP-16-create-job-position`
- **Jira Status:** ✅ DONE
- **Description:** US-4 - Create job positions with requirements
- **Files:**
  - `backend/app/routes/jobs.py`
  - `frontend/src/pages/JobForm.tsx`
  - `frontend/src/pages/JobsList.tsx`

### CSSAP-17: Rank Candidates for Job
- **Branch:** `feature/CSSAP-17-rank-candidates-for-job`
- **Jira Status:** 🔄 IN PROGRESS
- **Description:** US-5 - Rank candidates based on job requirements
- **Files:**
  - `backend/app/routes/matching.py`
  - `backend/app/services/matching_service.py`
  - `frontend/src/pages/RankCandidates.tsx`

### CSSAP-18: View Top Skills Report
- **Branch:** `feature/CSSAP-18-view-top-skills-report`
- **Jira Status:** ✅ DONE
- **Description:** US-6 - View skills frequency report
- **Files:**
  - `backend/app/routes/reports.py`
  - `frontend/src/pages/ReportsNew.tsx`

### CSSAP-20: View Audit Logs
- **Branch:** `feature/CSSAP-20-view-audit-logs`
- **Jira Status:** ✅ DONE
- **Description:** US-8 - View system audit logs (admin only)
- **Files:**
  - `backend/app/services/audit_service.py`
  - `frontend/src/pages/ReportsNew.tsx`

### CSSAP-21: Audit Logs Enhancement
- **Branch:** `feature/CSSAP-21-audit-logs-enhancement`
- **Jira Status:** ✅ DONE
- **Description:** US-8 - Enhanced audit logs with filters and export
- **Files:**
  - `frontend/src/pages/ReportsNew.tsx` (filters, search, CSV export)

---

## 🔄 Git Workflow

### Standard Development Flow

```bash
# 1. Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/CSSAP-XX-description

# 2. Work on feature
git add .
git commit -m "Resolves CSSAP-XX: Description of changes"
git push -u origin feature/CSSAP-XX-description

# 3. Create Pull Request
# - From: feature/CSSAP-XX-description
# - To: develop
# - Get code review and approval

# 4. Merge to develop
# - PR is merged
# - Feature branch can be deleted

# 5. Deploy to staging
git checkout staging
git pull origin staging
git merge develop
git push origin staging

# 6. Deploy to production (after testing)
git checkout main
git pull origin main
git merge staging
git push origin main
```

### Commit Message Format

Follow the format from [jira-git-integration.md](jira-git-integration.md):

```
<Action> CSSAP-#: <Brief description>

<Detailed description if needed>

<Additional notes or related tickets>
```

**Examples:**
```bash
git commit -m "Resolves CSSAP-13: Implement user authentication with JWT"
git commit -m "Fixes CSSAP-17: Fix ranking algorithm for edge cases"
git commit -m "Relates to CSSAP-21: Add CSV export button to audit logs"
```

---

## 📊 Branch Status Overview

| Branch Type | Branch Name | Status | Remote |
|------------|-------------|--------|--------|
| **Main** | `main` | ✅ Active | ✅ origin/main |
| **Main** | `develop` | ✅ Active | ✅ origin/develop |
| **Main** | `staging` | ✅ Active | ✅ origin/staging |
| **Feature** | `feature/CSSAP-13-user-login-role-based-access` | ✅ Created | ✅ origin/feature/... |
| **Feature** | `feature/CSSAP-14-upload-multiple-cv-files` | ✅ Created | ✅ origin/feature/... |
| **Feature** | `feature/CSSAP-16-create-job-position` | ✅ Created | ✅ origin/feature/... |
| **Feature** | `feature/CSSAP-17-rank-candidates-for-job` | ✅ Created | ✅ origin/feature/... |
| **Feature** | `feature/CSSAP-18-view-top-skills-report` | ✅ Created | ✅ origin/feature/... |
| **Feature** | `feature/CSSAP-20-view-audit-logs` | ✅ Created | ✅ origin/feature/... |
| **Feature** | `feature/CSSAP-21-audit-logs-enhancement` | ✅ Created | ✅ origin/feature/... |

---

## 🛡️ Branch Protection Recommendations

### For `main` branch:
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass (CI/CD)
- ✅ Require branches to be up to date before merging
- ✅ Include administrators in restrictions
- ✅ Require linear history
- ✅ Do not allow force pushes

### For `develop` branch:
- ✅ Require pull request reviews (at least 1 reviewer)
- ✅ Require status checks to pass
- ⚠️ Allow force pushes (for rebasing if needed)

### For `staging` branch:
- ✅ Require status checks to pass
- ⚠️ Can be more flexible for testing

---

## 📝 Quick Reference Commands

### View all branches
```bash
git branch -a
```

### Switch to a branch
```bash
git checkout feature/CSSAP-XX-description
```

### Update branch from remote
```bash
git pull origin branch-name
```

### Delete local feature branch (after merge)
```bash
git branch -d feature/CSSAP-XX-description
```

### Delete remote feature branch (after merge)
```bash
git push origin --delete feature/CSSAP-XX-description
```

### View branch history
```bash
git log --oneline --graph --all --decorate
```

---

## 🎯 Next Steps

1. **Set up branch protection rules** on GitHub for `main` and `develop`
2. **Create pull request templates** for consistent PR descriptions
3. **Configure CI/CD pipeline** to run tests on all PRs
4. **Link Jira integration** to automatically update tickets on commits
5. **Set up code review process** with at least 1 required reviewer

---

## 📚 Related Documentation

- [Jira-Git Integration Guide](jira-git-integration.md)
- [User Stories](user-stories.md)
- [Project Architecture](architecture.md)
- [Contributing Guidelines](../CONTRIBUTING.md)

---

**Last Updated:** January 16, 2026  
**Repository:** https://github.com/gazal1994/CV-Sorting-System.git  
**Total Branches:** 10 (3 main + 7 feature branches)
