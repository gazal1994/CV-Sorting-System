# Contributing to CV Sorting System

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/cv-sorting-system.git`
3. Create a feature branch: `git checkout -b feature/US#-description`

## Branch Naming Convention

- Feature branches: `feature/US1-user-authentication`
- Bug fixes: `bugfix/issue-123-login-error`
- Hotfixes: `hotfix/critical-security-patch`

## Commit Message Format

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature (US#)
- `fix`: Bug fix
- `docs`: Documentation only
- `test`: Adding tests
- `refactor`: Code refactoring
- `style`: Code style changes
- `chore`: Build/config changes

Example:
```
feat(auth): implement JWT authentication (US1)

- Add login endpoint
- Implement password hashing
- Create JWT token generation

Jira: CVSR-1
```

## Jira Integration

Link commits to Jira tickets:
- Include `CVSR-#` in commit messages
- Reference user story ID in branch name

## Pull Request Process

1. Update tests for new features
2. Run all tests locally: `pytest` and `npm test`
3. Update documentation if needed
4. Create PR with description:
   - What changed
   - Why it changed
   - How to test
5. Link to Jira ticket
6. Request review from 2 team members

## Code Style

### Backend (Python)
- Follow PEP 8
- Use `black` for formatting
- Use `isort` for import sorting
- Maximum line length: 100

### Frontend (TypeScript)
- Follow ESLint rules
- Use TypeScript strict mode
- Component naming: PascalCase
- File naming: kebab-case

## Testing Requirements

- Minimum 80% code coverage
- Unit tests for all services
- Integration tests for API endpoints
- Frontend component tests

## License

MIT
