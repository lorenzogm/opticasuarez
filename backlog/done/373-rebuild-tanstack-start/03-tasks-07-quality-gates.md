# Task 07 — Quality gates and verification

## Objective
Ensure the new app passes all quality checks and builds successfully.

## Steps

1. **Configure scripts** in package.json:
   ```json
   {
     "scripts": {
       "dev": "vite dev",
       "build": "vite build",
       "start": "node .output/server/index.mjs",
       "check": "npm run typecheck && npm run lint",
       "typecheck": "tsc --noEmit",
       "lint": "eslint src/",
       "lint:fix": "eslint src/ --fix",
       "format": "prettier --check .",
       "format:fix": "prettier --write ."
     }
   }
   ```

2. **Run TypeScript check**: `npm run typecheck`
   - Fix all type errors
   - Ensure strict mode compliance

3. **Run ESLint**: `npm run lint`
   - Fix all linting errors
   - Ensure no warnings

4. **Run build**: `npm run build`
   - Verify successful production build
   - Check build output for errors/warnings

5. **Verify dev server**: `npm run dev`
   - Navigate to each route
   - Confirm rendering

6. **Update repo docs**:
   - `.github/copilot-instructions.md` — Add `apps/web/` to structure
   - `README.md` — Add section for new app

## Acceptance Criteria
- [ ] `npm run check` → exit code 0
- [ ] `npm run build` → exit code 0
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors
- [ ] Dev server starts and routes render
- [ ] Repo documentation updated
