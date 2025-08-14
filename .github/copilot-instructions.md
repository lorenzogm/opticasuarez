# GitHub Copilot Instructions

## Development Workflow

### Pull Request Checks

**Important:** Always run `npm run check` before submitting pull requests. This script runs TypeScript checks and ESLint to ensure code quality and consistency.

```bash
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

**Important:** All files and folders in the `app/` directory must follow **kebab-case** naming convention.

Examples:

- ✅ `button.tsx` (not `Button.tsx`)
- ✅ `navigation.tsx` (not `Navigation.tsx`)
- ✅ `book-appointment.tsx` (not `BookAppointment.tsx`)
- ✅ `ui/` (not `UI/`)
- ✅ `sections/hero.tsx` (not `sections/Hero.tsx`)

### Component Naming

While file names should be kebab-case, React component names should still follow PascalCase:

```tsx
// File: app/ui/components/book-appointment.tsx
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
3. Follow the existing project structure under `app/ui/`

This convention ensures consistency across the codebase and follows modern web development best practices.

## Quality Assurance

### CI/CD Validation

**Critical:** Always run the exact same commands that are executed in the CI checks before making any code changes. These commands must all pass successfully, and any failures must be fixed immediately.

Required CI commands to run in order:

1. **Install dependencies**:
   ```bash
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
