# GitHub Copilot Instructions

## Repository Structure

This is a monorepo. The main application lives in `apps/opticasuarez-react-router/`.

```
├── .agents/              # Copilot agent customizations
├── .github/              # GitHub workflows, Copilot config
├── apps/
│   └── opticasuarez-react-router/   # Main web application
│       ├── app/           # React Router v7 application source
│       ├── public/        # Static assets
│       ├── tests/         # E2E tests (Playwright)
│       ├── docs/          # Documentation
│       └── ...            # Config files (package.json, vite.config.ts, etc.)
├── backlog/              # Issue tracking artifacts
├── skills-lock.json      # Copilot skills lock file
└── README.md
```

All `npm` commands must be run from `apps/opticasuarez-react-router/`.

## Development Workflow

### Pull Request Checks

**Important:** Always run `npm run check` before submitting pull requests. This script runs TypeScript checks and ESLint to ensure code quality and consistency.

```bash
cd apps/opticasuarez-react-router
npm run check
```

This single command executes:

- `npm run typecheck` - TypeScript type checking
- `npm run lint` - ESLint code quality checks

If any issues are found, use the fix commands:

- `npm run lint:fix` - Auto-fix ESLint issues

For code formatting, you can run Prettier separately:
- `npm run format` - Prettier code formatting validation
- `npm run format:fix` - Auto-fix Prettier formatting

## Code Style Guidelines

### File and Folder Naming Convention

**Important:** All files and folders in the `apps/opticasuarez-react-router/app/` directory must follow **kebab-case** naming convention.

Examples:

- ✅ `button.tsx` (not `Button.tsx`)
- ✅ `navigation.tsx` (not `Navigation.tsx`)
- ✅ `book-appointment.tsx` (not `BookAppointment.tsx`)
- ✅ `ui/` (not `UI/`)
- ✅ `sections/hero.tsx` (not `sections/Hero.tsx`)

### Component Naming

While file names should be kebab-case, React component names should still follow PascalCase:

```tsx
// File: apps/opticasuarez-react-router/app/ui/components/book-appointment.tsx
export default function BookAppointment() {
  // Component implementation
}
```

### Import Statements

Always use kebab-case file paths in import statements:

```tsx
// ✅ Correct
import BookAppointment from '../ui/components/book-appointment';
import { Button } from '../ui/components/button';

// ❌ Incorrect
import BookAppointment from '../ui/components/BookAppointment';
import { Button } from '../ui/components/Button';
```

### When Creating New Files

1. Always use kebab-case for file and folder names
2. Use descriptive names that clearly indicate the purpose
3. Follow the existing project structure under `apps/opticasuarez-react-router/app/ui/`

This convention ensures consistency across the codebase and follows modern web development best practices.

## Quality Assurance

### CI/CD Validation

**Critical:** Always run the exact same commands that are executed in the CI checks before making any code changes. These commands must all pass successfully, and any failures must be fixed immediately.

Required CI commands to run in order:

1. **Install dependencies**:
   ```bash
   cd apps/opticasuarez-react-router
   npm ci
   ```

2. **Code quality checks**:
   ```bash
   npm run check
   ```
   This executes:
   - `npm run typecheck` - TypeScript type checking
   - `npm run lint` - ESLint code quality checks

3. **Build validation**:
   ```bash
   npm run build
   ```

### Validation Workflow

1. **Before making changes**: Run all CI commands to establish baseline
2. **After making changes**: Re-run all CI commands to ensure nothing is broken
3. **Fix any failures**: Use available fix commands like `npm run lint:fix` if needed
4. **Verify success**: All commands must complete with exit code 0

**Important**: Never submit changes if any of these CI commands fail. Always investigate and fix the root cause of failures rather than ignoring them.

## Copilot Coding Agent — Cloud Workflow

When working on GitHub Issues as the Copilot coding agent (cloud), follow this workflow:

### Branch and PR workflow

- **Never push directly to `main`.** Always create a feature branch and open a pull request.
- Branch naming: `copilot/<issue-number>-<short-slug>` (e.g. `copilot/42-add-contact-form`).
- PR title: reference the issue number (e.g. "feat: add contact form — closes #42").
- PR body: include a summary of changes, link to the issue, and a checklist of acceptance criteria.

### Required reviewers

- Always request reviews from **juanpeich** and **lorenzogm** on every PR.
- Do **not** merge the PR yourself. Wait for an approving review from at least one of them.
- If reviewers request changes, address every comment and re-request review.

### Handling merge conflicts

- If the PR has merge conflicts, rebase the branch on the latest `main` and resolve conflicts.
- After resolving, push the updated branch and confirm all CI checks pass.

### Quality gates

Before marking a PR as ready for review, all of these must pass:

```bash
cd apps/opticasuarez-react-router
npm run check    # TypeScript + ESLint
npm run build    # Full production build
```

### Issue workflow

1. Read the full issue description and acceptance criteria.
2. Create a feature branch from `main`.
3. Implement the solution following the code style guidelines in this file.
4. Run quality gates and fix any failures.
5. Open a PR, request reviews from juanpeich and lorenzogm.
6. Address any review feedback until the PR is approved.

### PR review feedback

- When a reviewer leaves comments or requests changes, read every comment carefully.
- Make the requested changes, push new commits, and re-request review.
- Do not dismiss or resolve review threads yourself — let the reviewer resolve them.
