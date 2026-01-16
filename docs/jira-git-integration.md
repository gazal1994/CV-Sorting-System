# Jira Integration with Git Commits

## Overview
This document explains how to link Jira tickets to Git commits for better traceability and project management in the CV Sorting System project.

**Project Key:** CVSR  
**Jira Naming Convention:** CVSR-# (e.g., CVSR-1, CVSR-2)

---

## User Story to Jira ID Mapping

| User Story | Jira ID | Summary | Priority |
|------------|---------|---------|----------|
| US-1 | CVSR-1 | User Authentication | HIGHEST |
| US-2 | CVSR-2 | CV Upload and Parsing | HIGHEST |
| US-3 | CVSR-3 | View Candidates List | HIGHEST |
| US-4 | CVSR-4 | Create Job Position | HIGHEST |
| US-5 | CVSR-5 | Rank Candidates for Job | HIGH |
| US-6 | CVSR-6 | View Ranking Results | HIGH |
| US-7 | CVSR-7 | Skills Frequency Report | MEDIUM |
| US-8 | CVSR-8 | Pipeline Statistics Report | MEDIUM |
| US-9 | CVSR-9 | View Audit Logs (Admin Only) | HIGH |
| US-10 | CVSR-10 | User Management (Admin Only) | HIGHEST |
| US-11 | CVSR-11 | View Candidate Details | HIGH |
| US-12 | CVSR-12 | Update Candidate Information | MEDIUM |

---

## Git Commit Message Format

### Standard Format
```
[CVSR-#] Brief description of change

Detailed explanation of what was changed and why.

- Specific change 1
- Specific change 2

Resolves CVSR-#
```

### Examples

#### Example 1: Feature Implementation
```
[CVSR-2] Implement CV upload and parsing functionality

Added multi-file upload support for PDF, DOCX, and TXT files.
Implemented CV parser to extract structured data including:
- Name, email, phone extraction
- Skills matching against taxonomy
- Experience estimation from year ranges
- Education information parsing

- Created CVParser class in app/utils/cv_parser.py
- Added POST /api/candidates/upload endpoint
- Implemented file validation and error handling
- Added unit tests for parser functions

Resolves CVSR-2
```

#### Example 2: Bug Fix
```
[CVSR-2] Fix experience estimation regex pattern

Fixed regex pattern to support "to" keyword in year ranges
(e.g., "2018 to 2022" now correctly calculates 4 years).

- Updated pattern in _estimate_experience() method
- Added test cases for multiple year range formats
- Ensured backward compatibility

Resolves CVSR-2
```

#### Example 3: UI Enhancement
```
[CVSR-9] Add filters and export to Audit Logs UI

Enhanced the audit logs page with:
- Search functionality (user, action, details)
- Action type filter dropdown
- Date range filters (from/to)
- Export to CSV button
- Clear filters functionality

Related to CVSR-9
```

#### Example 4: Test Addition
```
[CVSR-5] Add E2E tests for ranking workflow

Created comprehensive E2E test covering:
1. CV upload
2. Job creation
3. Candidate ranking
4. Results verification

File: backend/tests/test_e2e.py

Resolves CVSR-5
```

---

## Commit Message Keywords

### Status Keywords
- **Resolves CVSR-#** - Closes the ticket (feature complete)
- **Fixes CVSR-#** - Bug fix
- **Relates to CVSR-#** - Partial work or related change
- **WIP CVSR-#** - Work in progress
- **Refactor CVSR-#** - Code refactoring
- **Docs CVSR-#** - Documentation update

### Type Prefixes
- `[CVSR-#]` - Standard commit
- `[CVSR-#][HOTFIX]` - Critical bug fix
- `[CVSR-#][TEST]` - Test addition/modification
- `[CVSR-#][DOCS]` - Documentation only

---

## Git Branch Naming Convention

### Format
```
feature/CVSR-#-brief-description
bugfix/CVSR-#-brief-description
hotfix/CVSR-#-brief-description
docs/CVSR-#-brief-description
```

### Examples
```
feature/CVSR-2-cv-upload-parsing
feature/CVSR-5-candidate-ranking
bugfix/CVSR-2-experience-regex
feature/CVSR-9-audit-logs-filters
docs/CVSR-all-jira-integration
```

---

## Workflow Example

### 1. Start Work on Ticket
```bash
# Create and checkout feature branch
git checkout -b feature/CVSR-9-audit-logs-filters

# Make changes...
```

### 2. Commit Changes
```bash
git add .
git commit -m "[CVSR-9] Add search and filter to audit logs

Implemented search functionality for audit logs with:
- User email search
- Action type filter
- Date range filtering

Related to CVSR-9"
```

### 3. Push and Create PR
```bash
git push origin feature/CVSR-9-audit-logs-filters

# Create Pull Request with title: "[CVSR-9] Add filters to audit logs"
```

### 4. Final Commit (Complete Feature)
```bash
git commit -m "[CVSR-9] Complete audit logs UI enhancements

Added all requested features:
- Search, filters, date range
- Export to CSV functionality
- Clear filters button
- Result count display

Resolves CVSR-9"
```

---

## Jira Automation (If Configured)

### Smart Commits
If Jira-Git integration is enabled, these keywords automatically update tickets:

```
[CVSR-5] Fix ranking algorithm #time 2h #comment Performance improvement
```

Keywords:
- `#comment` - Adds comment to ticket
- `#time` - Logs time spent
- `#resolve` - Transitions ticket to resolved
- `#close` - Closes the ticket

---

## Implementation Checklist

### For Each User Story:
- [ ] Create feature branch with `feature/CVSR-#-name`
- [ ] Include `[CVSR-#]` in all commit messages
- [ ] Reference ticket in PR title and description
- [ ] Final commit uses "Resolves CVSR-#"
- [ ] Link PR to Jira ticket
- [ ] Update ticket status after merge

---

## Current Project Status

### Completed Features (with Jira IDs)
- ✅ CVSR-1: User Authentication
- ✅ CVSR-2: CV Upload and Parsing (Fixed regex bug)
- ✅ CVSR-3: View Candidates List
- ✅ CVSR-4: Create Job Position
- ✅ CVSR-5: Rank Candidates for Job
- ✅ CVSR-6: View Ranking Results
- ✅ CVSR-7: Skills Frequency Report
- ✅ CVSR-8: Pipeline Statistics Report
- ✅ CVSR-9: Audit Logs with Filters (Enhanced)

### In Progress
- 🔄 CVSR-10: User Management (Admin Only)
- 🔄 CVSR-11: View Candidate Details
- 🔄 CVSR-12: Update Candidate Information

---

## Recent Commits Example

```
✅ [CVSR-2] Fix test_estimate_experience unit test
   - Fixed regex to support "to" keyword
   - Added comprehensive test cases
   
✅ [CVSR-9] Complete Audit Logs UI with filters and export
   - Search, action filter, date range
   - CSV export functionality
   
✅ [CVSR-2] Add 5 sample CVs and jobs for testing
   - Created realistic test data
   - Import script with database integration
   
✅ [CVSR-5,CVSR-9] Add E2E tests for two workflows
   - CV upload and ranking workflow
   - Reports and analytics workflow
```

---

## Best Practices

1. **Always include Jira ID** in commit message first line
2. **Use descriptive messages** - explain what and why
3. **Reference related tickets** when making cross-feature changes
4. **Close tickets properly** with "Resolves" keyword
5. **Keep commits atomic** - one logical change per commit
6. **Update ticket status** to match development progress

---

## Tools Integration

### Git Hooks (Optional)
Create `.git/hooks/commit-msg` to enforce Jira ID format:

```bash
#!/bin/sh
if ! grep -qE '^\[CVSR-[0-9]+\]' "$1"; then
    echo "ERROR: Commit message must start with [CVSR-#]"
    exit 1
fi
```

### VS Code Extension
- **Jira and Bitbucket (Official)** - View and update Jira tickets from VS Code
- **Git Graph** - Visualize commits with Jira IDs

---

**Last Updated:** January 16, 2026  
**Maintained By:** Development Team
