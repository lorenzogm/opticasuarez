# Task 03 — Migrate shared components and sections

## Objective
Copy all shared UI components and section components, updating imports from `react-router` to `@tanstack/react-router`.

## Components to Copy (13 files)
Source: `apps/opticasuarez-react-router/app/ui/components/`
Target: `apps/web/src/components/`

1. button.tsx
2. carousel.tsx
3. faq-accordion.tsx
4. global-navigation.tsx ← **Needs import updates** (Link from @tanstack/react-router)
5. google-tag-manager.tsx
6. hero-carousel.tsx
7. hero-slider.tsx
8. image.tsx
9. progress-indicator.tsx
10. social-share.tsx
11. structured-data.tsx
12. text.tsx
13. youtube-facade.tsx

## Sections to Copy (7 files)
Source: `apps/opticasuarez-react-router/app/ui/sections/`
Target: `apps/web/src/sections/`

1. about.tsx
2. book-appointment.tsx ← **Needs import updates** (Link)
3. brands.tsx
4. contact.tsx
5. customer-testimonials.tsx
6. locations-info.tsx
7. services-grid.tsx ← **Needs import updates** (Link)

## Changes Required
- Replace `import { Link } from 'react-router'` → `import { Link } from '@tanstack/react-router'`
- Replace `import { useNavigate } from 'react-router'` → `import { useNavigate } from '@tanstack/react-router'`
- TanStack Router Link uses `to` prop (same as React Router v7)
- Update `~/ui/components/` → `~/components/`
- Update `~/ui/sections/` → `~/sections/`
- Update `~/ui/lib/` → `~/lib/`

## Acceptance Criteria
- [ ] All 13 component files copied and adapted
- [ ] All 7 section files copied and adapted
- [ ] All `react-router` imports replaced with `@tanstack/react-router`
- [ ] All `~/ui/` import paths updated
- [ ] TypeScript compiles without errors on these files
