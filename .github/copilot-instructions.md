# GitHub Copilot Instructions

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
