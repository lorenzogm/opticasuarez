# GitHub Copilot Instructions

## Repository Structure

This is a monorepo managed with pnpm workspaces and Turborepo.

```
├── .agents/              # Copilot agent customizations
├── .github/              # GitHub workflows, Copilot config
├── apps/
│   ├── opticasuarez-react-router/   # Main web application (React Router v7)
│   │   ├── app/           # Application source
│   │   ├── public/        # Static assets
│   │   ├── tests/         # E2E tests (Playwright)
│   │   ├── docs/          # Documentation
│   │   └── ...
│   └── web/               # TanStack Start application
│       └── src/
├── configs/               # Shared TypeScript configs (@opticasuarez/configs)
│   └── typescript/
├── backlog/              # Issue tracking artifacts
├── skills-lock.json      # Copilot skills lock file
└── README.md
```

All commands must be run from the **monorepo root**.

## Development Workflow

### Pull Request Checks

**Important:** Always run `pnpm check` before submitting pull requests. This command uses Turbo to run all quality checks across the monorepo.

```bash
pnpm check
```

This single command executes (via Turbo):

- `pnpm check:types` - TypeScript type checking across all workspaces
- `pnpm check:linter` - Biome linting and formatting checks
- `pnpm build` - Build validation

If any issues are found, use the fix command:

- `pnpm fix` - Auto-fix Biome linting and formatting issues

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

Required CI commands to run from the repo root:

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Code quality checks**:
   ```bash
   pnpm check
   ```
   This executes (via Turbo):
   - TypeScript type checking
   - Biome linting and formatting
   - Build validation

3. **Build validation** (already included in `pnpm check`, but can be run separately):
   ```bash
   pnpm build
   ```

### Validation Workflow

1. **Before making changes**: Run all CI commands to establish baseline
2. **After making changes**: Re-run all CI commands to ensure nothing is broken
3. **Fix any failures**: Use `pnpm fix` for auto-fixable issues
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
pnpm check    # TypeScript + Biome linting + Build
pnpm build    # Full production build
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
