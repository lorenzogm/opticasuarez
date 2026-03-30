# Enhancement Opportunities Analysis: custom-dev

## Agent Understanding

**Purpose:** Orchestrate complete sprint execution from planning to implementation to documentation.
**Primary User:** Team lead or agent invoking end-to-end story implementation after planning artifacts are ready.
**Key Assumptions:** Planning artifacts exist, skills are available, sequential execution acceptable, story files well-formed.

## User Journeys

### First-Timer
- **Friction:** Unclear what happens when code review finds critical issues (who fixes? how?)
- **Friction:** Retrospective asks introspective questions without template or guidance
- **Bright Spot:** Per-epic docs update feels incremental and safe

### Expert
- **Friction:** Pipeline is strictly sequential — no parallelization
- **Friction:** No way to tune review depth (quick vs deep)
- **Bright Spot:** Can scope to single epic

### Confused User
- **Friction:** No pre-flight check — if no planning artifacts exist, sprint planning fails with unclear error
- **Dead End:** Circular dependency if invoked without epics/stories
- **Fix needed:** Pre-flight validation with redirect to `plan-to-backlog`

### Edge-Case User (Partial Progress)
- **Friction:** "In-progress" story resume semantics undefined — overwrite or inspect?
- **Friction:** No idempotency guarantees per step
- **Friction:** No cache invalidation for existing review artifacts

### Hostile Environment
- **Failure modes:** Missing config crashes hard, broken sprint-status.yaml halts with unclear error
- **No recovery:** No rollback, no checkpoint system
- **Silent failures:** Missing project-context doesn't halt but may degrade quality

### Automator (CI/CD)
- **Friction:** No machine-readable output format (JSON)
- **Friction:** No clear exit code contract
- **Friction:** No timeout logic — can hang indefinitely
- **Bright Spot:** Epic scoping enables per-epic CI jobs

## Headless Assessment

**Potential Level:** Easily Adaptable

The workflow's "no pause, no menu" design is already headless-friendly. Gaps:
- Add `--headless` flag for autonomous retrospective
- Define exit codes (0 = success, 1 = error, 42 = deferred findings)
- Emit structured JSON progress
- Add timeout per sub-skill invocation

## Key Findings

### HIGH-OPPORTUNITY: Pre-flight Validation Missing
- **Area:** On Activation
- **Issue:** No check that planning artifacts exist before starting pipeline
- **Suggestion:** Validate `{planning_artifacts}/epics/` exists; if not, redirect to `plan-to-backlog`

### HIGH-OPPORTUNITY: Code Review Gate Ambiguity
- **Area:** Step 4
- **Issue:** "Critical issues" undefined; who addresses them unclear
- **Suggestion:** Define severity tiers (blocker/major/minor) with explicit actions per tier

### HIGH-OPPORTUNITY: Resume Semantics Undefined
- **Area:** State Detection
- **Issue:** "In-progress" stories have no explicit resume strategy
- **Suggestion:** Decision tree: done→skip, in-review→re-review, in-progress→query, ready→normal flow

### MEDIUM-OPPORTUNITY: No Machine-Readable Output
- **Area:** Completion
- **Suggestion:** Emit `build-result.json` with epics completed, stories, test results, review findings

### MEDIUM-OPPORTUNITY: No Timeout/Retry Logic
- **Area:** Pipeline
- **Suggestion:** Wrap skill invocations with timeouts; add retry for transient errors

### MEDIUM-OPPORTUNITY: Retrospective Mode Unclear
- **Area:** Step 6
- **Suggestion:** Define interactive vs autonomous retrospective behavior

### LOW-OPPORTUNITY: No Dry-Run Mode
- **Suggestion:** `--dry-run` to preview what would execute

### LOW-OPPORTUNITY: No Inter-Epic Checkpoints
- **Suggestion:** Between epics, emit brief status and option to adjust before proceeding

## Top 3 Insights

1. **The Resume Paradox** — Claims resumability but has no explicit semantics for what "resume" means for in-progress work. Biggest pain for automators and edge-case users.

2. **The Headless Assumption Mismatch** — Claims "yolo execution, maximum autonomy" but retrospective and code-review gates imply human judgment. Needs explicit autonomous behavior definitions.

3. **The Missing Pre-flight** — Single biggest dead-end: confused user invokes without planning artifacts, hits cryptic failure. One validation check eliminates this entirely.

## Facilitative Patterns Check

| Pattern | Present? | Impact if Added |
|---------|----------|-----------------|
| Soft Gate Elicitation | Partial | Medium — code review gates need clarity |
| Graceful Degradation | No | High — hard failures on missing config |
| Capture-Don't-Interrupt | Partial | Medium — inter-epic checkpoints |
| Three-Mode Architecture | No | Medium — guided/yolo/headless |
| Visible Progress | Partial | Medium — structured output needed |
