# GitHub Actions CI/CD Documentation

This document explains all GitHub Actions workflows configured for the CV Sorting System project.

## 📋 Overview

The project uses **4 main GitHub Actions workflows** to ensure code quality, security, and proper deployment:

1. **Build and Deploy** - Builds both backend and frontend, runs tests, and deploys to environments
2. **Code Quality Checks** - Ensures code follows best practices and standards
3. **Branch Protection** - Validates branch names, commit messages, and PR descriptions
4. **CI/CD Pipeline** - Original comprehensive testing pipeline

---

## 🔄 Workflows

### 1. Build and Deploy (`build-and-deploy.yml`)

**Triggers:**
- Push to `main`, `develop`, or `staging` branches
- Pull requests to these branches

**Jobs:**

#### 1.1 Build Backend
- ✅ Sets up Python 3.11
- ✅ Installs dependencies from requirements.txt
- ✅ Checks Python syntax
- ✅ Runs pytest tests
- ✅ Uploads backend artifacts

#### 1.2 Build Frontend
- ✅ Sets up Node.js 18
- ✅ Installs npm dependencies
- ✅ TypeScript type checking
- ✅ Builds production bundle with Vite
- ✅ Validates build output (dist/ directory)
- ✅ Uploads frontend build artifacts

#### 1.3 E2E Tests
- ✅ Runs end-to-end tests from `tests/test_e2e.py`
- ✅ Depends on successful backend and frontend builds

#### 1.4 Security Scan
- ✅ Runs Trivy vulnerability scanner
- ✅ Scans filesystem for security issues
- ✅ Uploads results to GitHub Security tab

#### 1.5 Deploy to Staging
- ✅ **Triggers:** Only on push to `staging` branch
- ✅ Downloads build artifacts
- ✅ Deploys to staging environment
- ✅ Sends deployment notifications

#### 1.6 Deploy to Production
- ✅ **Triggers:** Only on push to `main` branch
- ✅ Requires all tests and security scans to pass
- ✅ Creates deployment tag with timestamp
- ✅ Deploys to production environment
- ✅ Sends deployment notifications

#### 1.7 Notify Build Status
- ✅ Summarizes build results
- ✅ Reports success/failure status

**Environment URLs:**
- Production: `https://cv-sorting-system.com`
- Staging: `https://staging.cv-sorting-system.com`

---

### 2. Code Quality Checks (`code-quality.yml`)

**Triggers:**
- Push to `main`, `develop`, or `staging`
- Pull requests to these branches

**Jobs:**

#### 2.1 Backend Code Quality
- ✅ **Black** - Code formatting checker
- ✅ **isort** - Import sorting validation
- ✅ **flake8** - PEP8 style guide enforcement
- ✅ **pylint** - Code analysis for errors
- ✅ **Bandit** - Security vulnerability scanner
- ✅ **Safety** - Dependency vulnerability checker

#### 2.2 Frontend Code Quality
- ✅ **ESLint** - JavaScript/TypeScript linting
- ✅ **TypeScript** - Type checking (tsc --noEmit)
- ✅ **Prettier** - Code formatting checker
- ✅ **npm audit** - Dependency security audit

#### 2.3 Secret Scanning
- ✅ **Gitleaks** - Scans for secrets in git history
- ✅ Prevents API keys and credentials from being committed

#### 2.4 Code Coverage
- ✅ Runs pytest with coverage tracking
- ✅ Uploads coverage report to Codecov
- ✅ Generates HTML coverage report
- ✅ Uploads artifacts for review

---

### 3. Branch Protection (`branch-protection.yml`)

**Triggers:**
- Pull requests to `main`, `staging`, or `develop`
- Push events

**Jobs:**

#### 3.1 Validate Branch Name
Ensures feature branches follow convention:
- ✅ `feature/CSSAP-XX-description`
- ✅ `bugfix/CSSAP-XX-description`
- ✅ `hotfix/CSSAP-XX-description`
- ✅ `docs/CSSAP-XX-description`
- ✅ `refactor/CSSAP-XX-description`
- ✅ `test/CSSAP-XX-description`

**Example Valid Names:**
```
feature/CSSAP-13-user-login-role-based-access ✅
bugfix/CSSAP-17-fix-ranking-algorithm ✅
hotfix/CSSAP-20-critical-security-fix ✅
feature/my-cool-feature ❌
```

#### 3.2 Validate Commit Messages
- ✅ Checks for Jira reference (CSSAP-XX)
- ⚠️ Warns if missing but doesn't fail

**Example Valid Commits:**
```
Resolves CSSAP-13: Implement JWT authentication ✅
Fixes CSSAP-17: Fix ranking edge case ✅
Add new feature ⚠️ (warning - missing Jira ref)
```

#### 3.3 Validate PR Description
- ✅ Ensures PR has description
- ✅ Minimum 20 characters
- ✅ Recommends including Jira reference

#### 3.4 Check Required Files
Validates presence of:
- ✅ README.md
- ✅ backend/requirements.txt
- ✅ frontend/package.json
- ✅ .gitignore

#### 3.5 Check File Sizes
- ✅ Warns about files larger than 1MB
- ✅ Recommends Git LFS for large files

#### 3.6 PR Summary
- ✅ Generates summary report in PR
- ✅ Shows status of all validation checks

---

### 4. CI/CD Pipeline (`ci.yml`)

**Triggers:**
- Push to `main`, `develop`, or `staging`
- Pull requests to these branches

**Jobs:**
- ✅ Backend testing with multiple Python versions
- ✅ Caching pip dependencies for faster builds
- ✅ Linting with flake8
- ✅ Additional comprehensive testing

---

## 🎯 Workflow Execution Order

### On Feature Branch Push:
1. Code Quality Checks run
2. Builds are verified
3. Tests are executed

### On Pull Request:
1. **Branch Protection** validates:
   - Branch name format
   - Commit messages
   - PR description
   - Required files
2. **Code Quality** runs:
   - Linting
   - Type checking
   - Security scans
3. **Build and Deploy** executes:
   - Backend build
   - Frontend build
   - E2E tests

### On Merge to `develop`:
1. All quality checks run
2. Builds are created
3. Tests are executed
4. Artifacts are stored

### On Merge to `staging`:
1. All checks run
2. Builds are created
3. E2E tests execute
4. **Auto-deploy to staging environment** 🚀

### On Merge to `main`:
1. All checks run
2. Security scan executes
3. All tests must pass
4. **Auto-deploy to production** 🚀
5. Deployment tag created

---

## 🔐 Required GitHub Secrets

Configure these secrets in your GitHub repository settings:

### Deployment Secrets
```
VITE_API_URL           # API URL for frontend (e.g., https://api.yoursite.com)
VERCEL_TOKEN           # Vercel deployment token (if using Vercel)
NETLIFY_AUTH_TOKEN     # Netlify token (if using Netlify)
```

### Optional Secrets
```
CODECOV_TOKEN          # For code coverage uploads
SLACK_WEBHOOK          # For Slack notifications
DISCORD_WEBHOOK        # For Discord notifications
```

---

## 📊 Status Badges

Add these badges to your README.md:

```markdown
![Build](https://github.com/gazal1994/CV-Sorting-System/workflows/Build%20and%20Deploy/badge.svg)
![Code Quality](https://github.com/gazal1994/CV-Sorting-System/workflows/Code%20Quality%20Checks/badge.svg)
![Tests](https://github.com/gazal1994/CV-Sorting-System/workflows/CI%2FCD%20Pipeline/badge.svg)
```

---

## 🛠️ Local Testing

### Test Backend Locally
```bash
cd backend
python -m pytest tests/ -v
black --check app/ tests/
flake8 app/ tests/
bandit -r app/
```

### Test Frontend Locally
```bash
cd frontend
npm run type-check
npm run build
npx eslint src/ --ext .ts,.tsx
npx prettier --check "src/**/*.{ts,tsx}"
```

---

## 🚀 Deployment Configuration

### Vercel Deployment (Frontend)

Add to workflow:
```yaml
- name: Deploy to Vercel
  run: |
    npx vercel --token=${{ secrets.VERCEL_TOKEN }} \
      --prod \
      --yes
  working-directory: ./frontend
```

### Netlify Deployment (Frontend)

Add to workflow:
```yaml
- name: Deploy to Netlify
  uses: netlify/actions/cli@master
  with:
    args: deploy --prod --dir=frontend/dist
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Custom Server Deployment (Backend)

Add to workflow:
```yaml
- name: Deploy to Server
  uses: appleboy/ssh-action@master
  with:
    host: ${{ secrets.SERVER_HOST }}
    username: ${{ secrets.SERVER_USER }}
    key: ${{ secrets.SERVER_SSH_KEY }}
    script: |
      cd /var/www/cv-sorting-system
      git pull origin main
      pip install -r backend/requirements.txt
      systemctl restart cv-sorting-backend
```

---

## 📈 Monitoring and Notifications

### Slack Notifications

Add to any job:
```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Deployment to production completed!'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

### Discord Notifications

Add to any job:
```yaml
- name: Notify Discord
  uses: sarisia/actions-status-discord@v1
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK }}
    status: ${{ job.status }}
    title: "Deployment Status"
  if: always()
```

---

## 🔍 Troubleshooting

### Build Fails

1. **Check workflow logs** in GitHub Actions tab
2. **Review error messages** in job output
3. **Test locally** using commands from "Local Testing" section

### Tests Fail

1. **Run tests locally** to reproduce
2. **Check database/dependencies** are properly set up
3. **Review test logs** for specific failures

### Deployment Fails

1. **Verify secrets** are correctly configured
2. **Check deployment service status** (Vercel/Netlify/etc.)
3. **Review deployment logs** in GitHub Actions

---

## 📚 Best Practices

1. ✅ **Always create feature branches** from `develop`
2. ✅ **Include Jira reference** in branch names and commits
3. ✅ **Write descriptive PR descriptions**
4. ✅ **Wait for all checks to pass** before merging
5. ✅ **Test locally** before pushing
6. ✅ **Review code coverage** reports
7. ✅ **Fix security vulnerabilities** promptly
8. ✅ **Keep dependencies updated**

---

## 🔄 Workflow Updates

To update workflows:

1. Edit `.github/workflows/*.yml` files
2. Test changes in feature branch
3. Create PR to merge to develop
4. Workflows will auto-update on merge

---

## 📞 Support

For issues with GitHub Actions:
- Check [GitHub Actions documentation](https://docs.github.com/en/actions)
- Review workflow logs
- Contact DevOps team

---

**Last Updated:** January 16, 2026  
**Maintained by:** CV Sorting System Team
