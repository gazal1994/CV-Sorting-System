# GitHub Actions Quick Reference

## ✅ What Was Created

### 4 GitHub Actions Workflows:

1. **Build and Deploy** (`.github/workflows/build-and-deploy.yml`)
   - Builds backend and frontend
   - Runs E2E tests
   - Security scanning
   - Auto-deploys to staging and production

2. **Code Quality** (`.github/workflows/code-quality.yml`)
   - Backend: Black, flake8, pylint, Bandit, Safety
   - Frontend: ESLint, TypeScript, Prettier, npm audit
   - Secret scanning with Gitleaks
   - Code coverage tracking

3. **Branch Protection** (`.github/workflows/branch-protection.yml`)
   - Validates branch naming
   - Checks commit messages
   - Validates PR descriptions
   - Checks required files

4. **CI/CD Pipeline** (`.github/workflows/ci.yml`)
   - Updated to include staging branch
   - Runs comprehensive tests

---

## 🚀 How It Works

### Every Push to `main`, `develop`, or `staging`:
1. ✅ Backend builds and tests
2. ✅ Frontend builds with Vite
3. ✅ E2E tests run
4. ✅ Security scans execute
5. ✅ Code quality checks run

### On Push to `staging`:
- ✅ All above checks run
- 🚀 **Auto-deploys to staging environment**

### On Push to `main`:
- ✅ All above checks run
- ✅ Security scan mandatory
- 🚀 **Auto-deploys to production**
- 🏷️ Creates deployment tag

---

## 📋 Branch Naming Rules

**Valid formats:**
```bash
feature/CSSAP-13-user-login          ✅
bugfix/CSSAP-17-fix-ranking          ✅
hotfix/CSSAP-20-critical-fix         ✅
docs/CSSAP-21-update-readme          ✅
refactor/CSSAP-18-improve-algo       ✅
test/CSSAP-16-add-unit-tests         ✅
```

**Invalid formats:**
```bash
my-feature                           ❌
feature/my-cool-feature              ❌
CSSAP-13-user-login                  ❌
```

---

## 💬 Commit Message Format

**Required format:**
```bash
<Action> CSSAP-XX: <Description>
```

**Examples:**
```bash
Resolves CSSAP-13: Implement user authentication
Fixes CSSAP-17: Fix ranking algorithm bug
Relates to CSSAP-21: Add audit log filters
```

**Keywords:**
- `Resolves` - Closes the Jira ticket
- `Fixes` - Fixes a bug
- `Relates to` - Related work
- `WIP` - Work in progress

---

## 🔍 Viewing Workflow Results

1. Go to your GitHub repository
2. Click **Actions** tab
3. View workflow runs and their status
4. Click on any run to see detailed logs

**Direct link:**
https://github.com/gazal1994/CV-Sorting-System/actions

---

## 🛠️ What Gets Checked

### Backend:
- ✅ Python syntax errors
- ✅ pytest test suite
- ✅ Code formatting (Black)
- ✅ Import sorting (isort)
- ✅ PEP8 compliance (flake8)
- ✅ Code analysis (pylint)
- ✅ Security vulnerabilities (Bandit)
- ✅ Dependency vulnerabilities (Safety)

### Frontend:
- ✅ TypeScript type checking
- ✅ Build with Vite (production)
- ✅ ESLint rules
- ✅ Code formatting (Prettier)
- ✅ npm dependency audit

### Security:
- ✅ Secret scanning (Gitleaks)
- ✅ Vulnerability scanning (Trivy)
- ✅ File size checks
- ✅ Required files validation

---

## 🔧 Local Testing Commands

**Before pushing, test locally:**

### Backend:
```bash
cd backend

# Run tests
python -m pytest tests/ -v

# Check formatting
black --check app/ tests/

# Check imports
isort --check-only app/ tests/

# Lint code
flake8 app/ tests/

# Security scan
bandit -r app/
```

### Frontend:
```bash
cd frontend

# Type check
npm run type-check

# Build
npm run build

# Lint
npx eslint src/ --ext .ts,.tsx

# Format check
npx prettier --check "src/**/*.{ts,tsx}"

# Audit
npm audit
```

---

## 📊 Status Indicators

After setting up, you'll see:
- ✅ Green checkmark - All checks passed
- ❌ Red X - Some checks failed
- 🟡 Yellow dot - Checks in progress
- ⚪ Gray dot - Checks skipped

---

## 🚨 Common Issues

### Build Fails
**Solution:** Check the workflow logs for specific errors

### Tests Fail
**Solution:** Run tests locally first before pushing

### Branch Name Invalid
**Solution:** Rename branch to match `feature/CSSAP-XX-description` format

### Commit Message Missing Jira Reference
**Solution:** Add CSSAP-XX to your commit message

---

## 📝 Next Steps

1. ✅ Push code to any branch
2. ✅ Watch Actions tab for results
3. ✅ Create PR when ready
4. ✅ Wait for all checks to pass
5. ✅ Merge to develop → staging → main

---

## 🎯 Deployment Flow

```
Feature Branch
    ↓ (PR)
develop branch → Tests run
    ↓ (PR)
staging branch → Tests + Deploy to Staging 🚀
    ↓ (PR)
main branch → Tests + Deploy to Production 🚀 + Tag
```

---

## 📚 Full Documentation

See [docs/GITHUB_ACTIONS.md](GITHUB_ACTIONS.md) for complete details.

---

**Repository:** https://github.com/gazal1994/CV-Sorting-System  
**Actions:** https://github.com/gazal1994/CV-Sorting-System/actions

All workflows are now active and will run automatically! 🎉
