# BMad Method · Quality Analysis: custom-dev

**🔄 Dev to Done** — Build Cycle Orchestrator
**Analyzed:** 2026-03-30T07:45:18Z | **Path:** .github/skills/custom-dev
**Interactive report:** quality-report.html

## Agent Portrait

Autonomous execution engine that transforms planning artifacts into implemented, tested, reviewed, and documented code across multiple epics and stories. Picks up where `custom-plan-to-backlog` leaves off and drives the full Step 2 build cycle with maximum autonomy — sprint initialization, iterative story implementation with TDD, adversarial code review, per-epic retrospectives, and incremental documentation.

## Capabilities

| Capability | Status | Observations |
|-----------|--------|-------------|
| Sprint Planning | Good | — |
| Create Story | Good | — |
| Implement Story | Good | — |
| Code Review | Needs attention | 2 findings: threshold undefined, blocking semantics ambiguous |
| Story Loop | Good | 1 finding: parallelization opportunity |
| Retrospective | Good | 1 finding: could parallelize with docs |
| Documentation | Good | — |
| Epic Loop | Good | — |
| State Detection & Resumability | Needs attention | 1 finding: resume semantics undefined |

## Assessment

**Good** — Custom-dev is a lean, well-orchestrated workflow that successfully consumes planning artifacts and drives them through a complete build cycle. The skill exhibits strong structural integrity, efficient token usage, and appropriate task delegation. Two high-priority gaps exist: undefined code review severity thresholds and missing pre-flight artifact validation. Both are low-effort fixes with high impact.

## Opportunities

### 1. Operational Clarity: Define Gates and Thresholds (high — 3 observations)

Code review "critical issues" threshold is undefined, and the "yolo execution" claim is overstated by halting on undefined severity levels. The autonomy model needs explicit decision rules.

**Fix:** Add severity tier definitions to Step 4: "Critical: violates acceptance criteria or introduces security/data-loss risk. All others deferred." Align Overview autonomy claim with actual gate behavior.

- SKILL.md:83 — Critical issues threshold undefined (prompt-craft)
- SKILL.md:14 — Yolo execution claim overstated (agent-cohesion)
- SKILL.md:95 — Retrospective autonomous mode unclear (enhancement-opportunities)

### 2. Robustness: Pre-flight Validation and Error Recovery (high — 3 observations)

No validation that planning artifacts exist before starting. Missing artifacts cause cryptic failures. Resume semantics for in-progress stories undefined.

**Fix:** Add pre-flight check in Configuration: validate `{planning_artifacts}/epics/` exists, redirect to `custom-plan-to-backlog` if not. Add resume decision tree to State Detection.

- SKILL.md:18 — No pre-flight artifact validation (enhancement-opportunities)
- SKILL.md:35 — Resume semantics for in-progress undefined (enhancement-opportunities)
- SKILL.md:22 — Input artifact expectations implicit (agent-cohesion)

### 3. Execution Efficiency: Parallelization Opportunities (medium — 3 observations)

Sequential execution of independent operations creates unnecessary bottlenecks.

**Fix:** Background code review for story N while creating story N+1. Run retrospective and documentation concurrently.

- SKILL.md:83 — Code review blocks next story preparation (execution-efficiency)
- SKILL.md:95 — Retrospective and documentation serial (execution-efficiency)
- SKILL.md:27 — Glob search when deterministic path available (execution-efficiency)

### 4. Automation Readiness: Structured Output and Observability (medium — 3 observations)

Completion outputs prose narrative. No machine-readable format, exit codes, or timeout logic.

**Fix:** Emit build-result.json at Completion. Define exit codes. Add timeout per sub-skill.

- SKILL.md:115 — No machine-readable output (enhancement-opportunities)
- SKILL.md:53 — No timeout/retry logic (enhancement-opportunities)
- SKILL.md:53 — Context accumulation unspecified (execution-efficiency)

### 5. Token Efficiency: Script Candidates (low — 5 observations)

~9,500 tokens of deterministic operations per run could be offloaded to scripts.

**Fix:** Build `scripts/orchestration-engine.py` for config loading, state parsing, artifact validation, story selection, and progress updates.

## Strengths

- **Robust State Detection and Resumability** — Sprint-status.yaml as single source of truth enables fault recovery without replaying entire pipeline
- **Well-Scoped Pipeline with Clear Handoffs** — Eight sequential steps with explicit goals, success conditions, and bounded loops
- **Appropriate Skill Delegation** — Complex judgment tasks delegated to dedicated skills; orchestration stays lightweight
- **Incremental Per-Epic Documentation** — Reduces knowledge drift and end-of-cycle documentation burden
- **Clean Token Budget** — 124 lines, ~1386 tokens, zero waste patterns or repetition
- **Flexible Scope** — Single-epic or full-backlog from same invocation
- **High-Fidelity Triggers** — Three specific phrases reliably disambiguate from similar skills
- **Healthy Dependency DAG** — Zero cycles confirmed by prepass

## Detailed Analysis

### Structure & Capabilities

Solid structural integrity. Eight sequential steps with well-defined orchestration. Pre-pass false-positives for missing agent sections correctly dismissed — not applicable to workflow skills.

### Persona & Voice

Not applicable — workflow skill with no persona. Overview appropriately frames purpose and execution model.

### Identity Cohesion

Strong cohesion. Six sub-skills form coherent pipeline with clear input/output relationships. Minor implicit assumptions about artifact paths and state-update responsibility.

### Execution Efficiency

Clean skill separation and stateful resumability. Three parallelization opportunities exist. Zero dependency cycles confirmed.

### Conversation Experience

Strong for expert users. First-timers face friction from undefined gates and missing pre-flight validation. Headless operation needs timeout, exit codes, and structured output.

### Script Opportunities

No scripts exist. ~9,500 token savings available across artifact validation, state parsing, story selection, and progress tracking.

## Recommendations

1. **Define code review severity thresholds** (low effort, resolves 3 findings) — "Critical = violates acceptance criteria or security/data-loss risk"
2. **Add pre-flight artifact validation** (low effort, resolves 3 findings) — Check epics exist; redirect to plan-to-backlog if not
3. **Parallelize independent operations** (medium effort, resolves 3 findings) — Code review + next story; retrospective + docs
4. **Add resume decision tree** (medium effort, resolves 2 findings) — Explicit semantics for each story status
5. **Emit structured build-result.json** (low effort, resolves 2 findings) — Enable CI/CD integration
