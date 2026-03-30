# Enhancement Opportunities Analysis: custom-qa

**Scan Date:** 2026-03-30 | **Scanner:** L5 Enhancement Opportunities | **Status:** 4 High, 3 Medium opportunities

---

## Agent Understanding

Workflow generating test suites (unit/integration/E2E) from planning artifacts, running in parallel with `custom-dev`. Tests are the specification — expected to fail until implementation catches up.

---

## High-Opportunity Issues

### 1. Missing Pre-flight Validation (HIGH)

Agent assumes planning artifacts exist but never validates. First-timers and CI pipelines fail silently with no guidance.

**Fix:** Add pre-flight step after configuration:
- Check config exists and is parseable
- Scan `{planning_artifacts}/epics/` and report epic count
- Verify project test setup (Vitest available, Playwright config present)
- If missing, print diagnostic with next steps (e.g., "Run `custom-plan` first")

### 2. Vague Acceptance Criteria Dead-End (HIGH)

Agent doesn't validate acceptance criteria quality before generating tests. Stories with vague criteria ("improve UX") produce meaningless tests.

**Fix:** Add pre-generation triage: scan each story's criteria; if < 3 lines or lacks concrete conditions, flag as "under-specified" and offer: skip, pause for rewrite, or proceed with warning.

### 3. No Mid-Pipeline Control (HIGH)

All-or-nothing execution. Expert can't regenerate just E2E without re-running unit tests. No layer or story-level granularity.

**Fix:** Accept optional args: `--layer unit|integration|e2e`, `--story story-id`, `--force-regenerate`.

### 4. Philosophy Unexplained to First-Timers (HIGH)

"Tests Are the Spec" is stated but not explained. First-timers see failing tests and panic.

**Fix:** On first run (no qa-status.yaml), emit brief explanation of the fail-first philosophy and how custom-dev uses these tests.

---

## Medium-Opportunity Issues

### 5. No Headless / Machine-Readable Output (MEDIUM)

Agent produces only markdown. CI/automator systems need JSON output.

**Fix:** Add `--headless` / `--output json` mode returning structured results.

### 6. No Parallel Review Before Finalizing (MEDIUM)

Generated tests aren't reviewed before output. A self-review pass could catch overspecification, mocking mistakes, and coverage gaps.

**Fix:** After Step 4, add light review pass checking: duplicate assertions, missing mocks, uncovered criteria.

### 7. No Graceful Degradation for E2E (MEDIUM)

If `bmad-qa-generate-e2e-tests` isn't available, Step 4 fails with no fallback.

**Fix:** If skill unavailable, generate E2E tests directly using existing Playwright patterns.

---

## Headless Assessment

**Current Level:** Easily adaptable. No discovery/interview phase; all inputs deterministic.

**Transformation effort:** Low — add `--headless` flag, mode switch in config, JSON output in Steps 5-6.

---

## Pattern Checklist

| Pattern | Status | Value |
|---------|--------|-------|
| Intent-Before-Ingestion | Missing | High — could customize test strategy by epic type |
| Dual-Output | Missing | Medium — JSON alongside markdown for tooling |
| Three-Mode Architecture | Missing | High — Guided/Autopilot/Tactical modes |
| Graceful Degradation | Partial | Medium — config fallbacks exist, E2E delegation doesn't |
