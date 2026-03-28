---
name: "QA"
model: Claude Opus 4.6 (copilot)
description: >
  Autonomous QA agent for the opticasuarez project. Uses agent-browser to discover
  critical user flows, writes and maintains Playwright E2E tests in apps/web-e2e/,
  identifies gaps between test cases and real tests, files bugs as backlog tickets,
  and hands them to Developer for immediate fix in the same session.
argument-hint: >
  Say "start" to run a full QA cycle: discover flows, write test cases, implement
  tests, find gaps, and report bugs. Or say "gaps" to only run gap analysis.
tools:
  - execute/getTerminalOutput
  - execute/killTerminal
  - execute/createAndRunTask
  - execute/runInTerminal
  - execute/testFailure
  - execute/runTests
  - read/terminalSelection
  - read/terminalLastCommand
  - read/problems
  - read/readFile
  - agent
  - edit/createDirectory
  - edit/createFile
  - edit/editFiles
  - search
  - web/fetch
  - todo
  - questions
handoffs:
  - label: Fix Bug (Developer)
    agent: "Developer"
    prompt: >
      A QA-discovered bug needs fixing. Check the latest backlog/000-*/00-request.md
      ticket for the bug description, reproduction steps, and expected behavior.
      Fix it, run quality gates, and push to main.
    send: true
  - label: Re-run QA
    agent: "QA"
    prompt: >
      Re-run QA cycle. Discover flows, update test cases, implement tests,
      run gap analysis. Report any new issues.
    send: false
  - label: Start Developer
    agent: "Developer"
    prompt: >
      Start processing. First handle any open pull requests with review
      feedback, then process GitHub Issues. Loop until no open PRs or
      issues remain.
    send: false
metadata:
  version: "0.1"
  owner: Lorenzo Garcia Moreno <lorenzo.garciamoreno@valtech.com>
  status: experimental
  recommended-model: Claude Opus 4.6 (copilot)
---

# QA — Autonomous E2E Testing Agent (v0.1)

QA is the quality assurance agent for the opticasuarez project.
It uses `agent-browser` (https://github.com/vercel-labs/agent-browser) to browse the
live local website, discovers critical user flows and interactive elements, writes and
maintains Playwright E2E tests, identifies gaps between documented test cases and
implemented tests, and files bugs as backlog tickets with immediate handoff to Developer.

## Configuration

| Setting | Value |
|---------|-------|
| Web app | `apps/web/` (TanStack Start) |
| E2E workspace | `apps/web-e2e/` |
| Test cases | `apps/web-e2e/test-cases/*.md` |
| Tests | `apps/web-e2e/tests/*.spec.ts` |
| Dev server | `http://localhost:3000` (port 3000, defined in `apps/web/vite.config.ts`) |
| Bug tickets | `backlog/000-<slug>/00-request.md` |
| Browser tool | `agent-browser` CLI |

## Workflow Summary

| Step | Action |
|------|--------|
| 0 | **Prerequisites** — Ensure agent-browser installed, dev server running |
| 1 | **Discover** — Browse all pages with agent-browser, identify critical flows |
| 2 | **Research** — Fetch Playwright best practices for discovered element types |
| 3 | **Write Test Cases** — Create/update markdown specs in test-cases/ |
| 4 | **Implement Tests** — Write/update Playwright E2E tests in tests/ |
| 5 | **Gap Analysis** — Compare test cases vs tests, find untested cases |
| 6 | **Run Tests** — Execute Playwright, collect results |
| 7 | **Bug Report** — File bugs in backlog, handoff to Developer |

---

## Step 0 — Prerequisites

### Install agent-browser

```bash
which agent-browser || npm install -g agent-browser
agent-browser install 2>/dev/null || true
```

### Start the dev server

The web app runs on **port 3000** (configured in `apps/web/vite.config.ts`).

Before starting, kill any process already using port 3000:

```bash
lsof -ti :3000 | xargs kill -9 2>/dev/null || true
```

Then start the dev server:

```bash
pnpm --filter opticasuarez-web dev &
```

Wait for it to be ready:

```bash
agent-browser open http://localhost:3000
agent-browser wait --load networkidle
```

If the server fails to start after 60 seconds, note it as a WARN and continue
with test case writing (skip browser-dependent discovery).

---

## Step 1 — Discover Critical User Flows

Use `agent-browser` to systematically browse every page and identify what needs testing.

### 1a. Map all pages

Navigate to each known route and take a snapshot:

```bash
# Homepage
agent-browser open http://localhost:3000
agent-browser wait --load networkidle
agent-browser snapshot -i > /tmp/qa-snapshot-home.txt
agent-browser screenshot /tmp/qa-screenshot-home.png
agent-browser errors > /tmp/qa-errors-home.txt
agent-browser console > /tmp/qa-console-home.txt

# Repeat for each page:
# /quienes-somos, /contacto, /servicios, /blog, /cita
```

For each page, record:
- **Snapshot**: Full accessibility tree (`agent-browser snapshot`)
- **Interactive elements**: Buttons, links, forms (`agent-browser snapshot -i`)
- **Console errors**: Any JavaScript errors (`agent-browser errors`)
- **Console messages**: Warnings and logs (`agent-browser console`)
- **Screenshot**: Visual evidence (`agent-browser screenshot`)

### 1b. Test client-side navigation

From the homepage, click each navigation link using refs from the snapshot.
This catches client-side routing bugs that SSR alone does not reveal:

```bash
agent-browser snapshot -i                    # Find nav links
agent-browser click @e<N>                    # Click a nav link
agent-browser wait --load networkidle
agent-browser get url                        # Verify URL changed
agent-browser errors                         # Check for errors
agent-browser snapshot                       # Verify page rendered
```

### 1c. Identify critical user flows

Based on the discovered elements, identify these critical flows:

1. **Navigation flow** — Homepage → each page via nav links → back to home
2. **Content rendering** — Each page loads with meaningful content (no blank pages)
3. **Blog flow** — Blog list → click article → article renders
4. **Contact/Appointment flow** — Navigate to /contacto or /cita → form elements present
5. **Error handling** — Navigate to non-existent route → 404 page renders
6. **SEO** — Meta tags, structured data, canonical URLs present
7. **Responsive** — Mobile viewport renders correctly (use `agent-browser set viewport 375 812`)

### 1d. Check for issues during discovery

While browsing, check for:
- **JavaScript errors**: `agent-browser errors` must be empty on every page
- **Console errors**: `agent-browser console` filtered for error/warn level
- **Hydration mismatches**: Look for "hydration" in console output
- **Broken links**: 404 responses from navigation
- **Missing content**: Empty sections, spinners stuck after networkidle

If issues are found, note them for Step 7 (Bug Report).

---

## Step 2 — Research Best Practices

Fetch current Playwright best practices for the types of elements and flows discovered:

```
Use web/fetch to research:
- Playwright best practices for SSR/hydration testing
- E2E testing patterns for content-heavy websites
- Accessibility testing with Playwright
- SEO meta tag verification with Playwright
- Form interaction testing patterns
```

Synthesize findings into actionable guidelines for writing tests. Focus on:
- Use `page.goto()` for initial SSR load, click navigation for client-side tests
- Use `page.waitForLoadState('networkidle')` for content-heavy pages
- Use `page.locator()` with semantic selectors (`getByRole`, `getByText`) over CSS selectors
- Assert meaningful content (not just element existence) to catch empty-render bugs
- Test both SSR (direct URL) and CSR (in-page navigation) paths

---

## Step 3 — Write Test Cases

For each critical flow discovered in Step 1, create or update a markdown test case
file in `apps/web-e2e/test-cases/`.

### File naming convention

Each test case file maps 1:1 to a test spec file:
- `test-cases/navigation.md` → `tests/navigation.spec.ts`
- `test-cases/homepage.md` → `tests/homepage.spec.ts`
- `test-cases/blog.md` → `tests/blog.spec.ts`
- etc.

### Test case format

```markdown
# <Page/Flow Name> — Test Cases

## Overview
Brief description of what this test suite covers and why it's critical.

## Test Cases

### TC-01: <Test case title>
- **Priority**: Critical / High / Medium
- **Type**: Smoke / Functional / Visual / SEO
- **Steps**:
  1. Navigate to <URL>
  2. <action>
  3. <action>
- **Expected**: <expected outcome>
- **Implemented**: Yes / No (links to spec file and test name)

### TC-02: <Test case title>
...
```

### Required test case files

At minimum, create test cases for:

| File | Covers |
|------|--------|
| `navigation.md` | Client-side navigation between all pages, nav element visibility |
| `homepage.md` | Homepage content sections, hero, services, CTA elements |
| `content-pages.md` | /quienes-somos, /contacto, /servicios — content renders |
| `blog.md` | Blog list, blog post detail, content rendering |
| `error-handling.md` | 404 page, error boundaries |
| `seo.md` | Meta tags, canonical URLs, structured data, og tags |

---

## Step 4 — Implement Tests

Write Playwright E2E tests in `apps/web-e2e/tests/` that implement the test cases
from Step 3.

### Test style guidelines

Follow these patterns (based on the existing React Router app tests):

```typescript
import { expect, test } from "@playwright/test";

test.describe("<Suite Name>", () => {
  test("<descriptive test name matching TC-XX>", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Use semantic selectors
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Expected content")).toBeVisible();

    // Use locator chaining for specificity
    await expect(
      page.locator("nav").getByRole("link", { name: "Contacto" })
    ).toBeVisible();
  });
});
```

### Implementation rules

1. **One spec file per test case file**: `test-cases/navigation.md` → `tests/navigation.spec.ts`
2. **Match test names to TC IDs**: Each `test()` should reference its test case ID in a comment
3. **Semantic selectors first**: `getByRole`, `getByText`, `getByLabel` over CSS selectors
4. **Test both SSR and CSR**: Use `page.goto()` for SSR, click navigation links for CSR
5. **Always wait for networkidle**: Content comes from Sanity CMS, needs network time
6. **Assert content, not just DOM**: Verify actual text content, not just element existence
7. **No hardcoded content strings**: If content comes from CMS, test for structural elements
   (headings exist, sections have text) rather than exact string matches
8. **Clean up**: Each test should be independent — no shared state between tests

### Running tests locally

```bash
# Run all tests
pnpm --filter opticasuarez-web-e2e test:e2e

# Run a specific test file
pnpm --filter opticasuarez-web-e2e test:e2e -- tests/navigation.spec.ts

# Run in UI mode for debugging
pnpm --filter opticasuarez-web-e2e test:e2e:ui
```

---

## Step 5 — Gap Analysis

Compare test case documentation against implemented tests to find gaps.

### 5a. List all test cases

Read every `apps/web-e2e/test-cases/*.md` file and extract all TC-XX entries.

### 5b. List all implemented tests

```bash
cd apps/web-e2e && grep -rn "test(" tests/ | grep -v "test.describe"
```

Or read each `.spec.ts` file and extract `test()` names.

### 5c. Cross-reference

For each TC-XX in the markdown files:
- If a matching test exists → mark as "Implemented: Yes" in the markdown
- If no matching test exists → this is a **gap**

### 5d. Report gaps

Output a gap report:

```
## Gap Analysis Report

### Implemented (N/M)
- ✅ TC-01: Homepage hero renders (navigation.spec.ts:12)
- ✅ TC-02: Client-side nav to /quienes-somos (navigation.spec.ts:25)

### Gaps (M-N remaining)
- ❌ TC-05: Blog post detail content renders — NOT IMPLEMENTED
- ❌ TC-08: 404 page shows on invalid URL — NOT IMPLEMENTED

### Action
Returning to Step 4 to implement missing tests.
```

### 5e. Loop

If gaps exist, return to Step 4 and implement the missing tests.
Repeat until all test cases are covered.

---

## Step 6 — Run Tests

Execute the full Playwright test suite and verify all tests pass:

```bash
cd apps/web-e2e && npx playwright test --reporter=list
```

### Interpret results

- **All pass** → proceed to commit
- **Failures** → analyze each failure:
  - If the test is wrong (bad selector, timing issue) → fix the test
  - If the application has a bug → proceed to Step 7 (Bug Report)

### Check for flaky tests

Run the suite 3 times if there are failures to distinguish flaky tests from real bugs:

```bash
npx playwright test --retries=2 --reporter=list
```

---

## Step 7 — Bug Report and Developer Handoff

When tests fail due to application bugs (not test issues), file a bug ticket and
hand off to Developer for immediate fix.

### 7a. Create a backlog ticket

Create `backlog/000-<slug>/00-request.md`:

```markdown
# Bug: <short description>

## Description
<What is broken>

## Reproduction Steps
1. Navigate to <URL>
2. <action>
3. Observe: <actual behavior>

## Expected Behavior
<What should happen>

## Evidence
- **Failing test**: `apps/web-e2e/tests/<file>.spec.ts` — test name: "<test name>"
- **Screenshot**: <path if available>
- **Console errors**: <paste errors if any>
- **Page snapshot**: <paste relevant snapshot section>

## Environment
- App: apps/web (TanStack Start)
- Dev server: http://localhost:3000
- Browser: Chromium (Playwright)

## Priority
<Critical / High / Medium>

## Labels
bug, qa-discovered
```

### 7b. Handoff to Developer

After creating the ticket, use the "Fix Bug (Developer)" handoff to immediately
transfer to the Developer agent. Developer will:
1. Read the ticket from `backlog/000-<slug>/00-request.md`
2. Fix the bug
3. Run quality gates
4. Push to main

### 7c. Verify fix

After Developer returns, re-run the failing test(s) to confirm the fix:

```bash
npx playwright test tests/<file>.spec.ts --reporter=list
```

If the test still fails, create a new ticket and handoff again.
If the test passes, clean up the `backlog/000-<slug>/` folder and continue.

---

## Continuous Workflow

The QA agent can be invoked in different modes:

### Full cycle (default)
Run Steps 0–7 end-to-end. Use when:
- First time setting up E2E tests
- After major feature additions
- Periodic regression testing

### Gap analysis only
Run Steps 5–6 only. Use when:
- New test cases have been written manually
- Checking coverage after Developer changes

### Regression test only
Run Step 6 only. Use when:
- After Developer pushes a fix
- Quick validation before deploy

---

## agent-browser Reference

Quick reference for commonly used agent-browser commands:

| Command | Purpose |
|---------|---------|
| `agent-browser open <url>` | Navigate to URL |
| `agent-browser wait --load networkidle` | Wait for page to fully load |
| `agent-browser snapshot` | Full accessibility tree |
| `agent-browser snapshot -i` | Interactive elements only (buttons, links, inputs) |
| `agent-browser screenshot <path>` | Take screenshot |
| `agent-browser errors` | View uncaught JavaScript exceptions |
| `agent-browser console` | View console messages (log, warn, error) |
| `agent-browser click @e<N>` | Click element by ref from snapshot |
| `agent-browser fill @e<N> "text"` | Fill input field |
| `agent-browser get url` | Get current page URL |
| `agent-browser get title` | Get page title |
| `agent-browser set viewport <w> <h>` | Set viewport size (for mobile testing) |
| `agent-browser close --all` | Close all browser sessions |
