# BMad Method · Quality Analysis: custom-qa

**QA to Done** — Workflow Orchestrator
**Analyzed:** 2026-03-30 | **Path:** .github/skills/custom-qa
**Interactive report:** quality-report.html

## Agent Portrait

QA to Done is a specification-first test orchestrator that generates failing test suites from planning artifacts — unit, integration, and E2E — before a single line of implementation exists. It runs in parallel with custom-dev, treating tests as executable contracts that drive implementation. The workflow is clean, linear, and resumable.

## Capabilities

| Capability | Status | Observations |
|-----------|--------|-------------|
| Test Planning (Step 1) | Needs attention | Script opportunity for criteria extraction |
| Unit Tests (Step 2) | Good | — |
| Integration Tests (Step 3) | Good | — |
| E2E Tests (Step 4) | Needs attention | No fallback if skill unavailable |
| Run & Validate (Step 5) | Good | Could be incremental |
| Coverage Summary (Step 6) | Needs attention | Script opportunity for counting |
| Epic Loop (Step 7) | Good | — |

## Assessment

**Good** — The workflow logic is well-architected: clear pipeline, resumable state, strong specification-first philosophy, and excellent token efficiency (1,866 tokens, zero waste). The primary opportunity is adding Identity/Style/Principles sections to give the executing LLM a decision framework for ambiguous situations — this single fix resolves the majority of findings.

## Opportunities

### 1. Add Agent Persona Sections (HIGH — 6 observations)

The agent lacks Identity, Communication Style, and Principles sections. Without these, the LLM has no decision framework for ambiguous situations — vague acceptance criteria, test layer trade-offs, coverage prioritization. Every scanner flagged this absence as the root cause of behavior inconsistency risks.

**Fix:** Add three sections after the frontmatter and before Overview:

- **Identity** — "You are a test architecture strategist who generates specification-first test suites from design documents."
- **Communication Style** — Explain test intent before listing tests; use acceptance criteria language as test names; call out coverage gaps.
- **Principles** — Specification first; layer by intent; fail gracefully on missing criteria; coverage over busywork.

**Constituent findings:**
- L1 Structure: Missing Identity section (SKILL.md, HIGH)
- L1 Structure: Missing Communication Style section (SKILL.md, HIGH)
- L1 Structure: Missing Principles section (SKILL.md, HIGH)
- L4 Cohesion: No persona to anchor behavior (SKILL.md, HIGH)
- L5 Enhancement: Philosophy unexplained to first-timers (SKILL.md, HIGH)
- L2 Prompt Craft: No improvement needed, but persona would enhance quality further

### 2. Add Pre-flight Validation (MEDIUM — 4 observations)

Agent doesn't validate prerequisites before pipeline execution. Missing config, absent planning artifacts, or wrong project structure surface as mid-pipeline failures.

**Fix:** After configuration, add a validation step: check config exists and is parseable, scan `{planning_artifacts}/epics/`, verify Vitest and Playwright are available. If anything is missing, print a diagnostic with next steps.

**Constituent findings:**
- L3 Efficiency: No pre-flight validation (MEDIUM)
- L5 Enhancement: Missing dependency contract (HIGH)
- L5 Enhancement: Confused user dead-end (HIGH)
- L6 Scripts: Configuration resolution opportunity (MEDIUM)

### 3. Extract Deterministic Operations to Scripts (MEDIUM — 6 observations)

Multiple pipeline steps spend LLM tokens on deterministic parsing — config YAML, qa-status.yaml, acceptance criteria extraction, test case counting. Estimated 1800-2600 tokens saved per epic by scripting these.

**Fix:** Create scripts for: acceptance criteria extraction (highest priority), test case counting, config resolution, state detection. Each outputs structured JSON for the LLM to consume.

**Constituent findings:**
- L6 Scripts: Acceptance criteria extraction (HIGH, 400-600 tokens)
- L6 Scripts: Test case counting & coverage metrics (HIGH, 250-380 tokens)
- L6 Scripts: Architecture & component inventory (MEDIUM, 300-450 tokens)
- L6 Scripts: Test pattern inventory (MEDIUM, 250-350 tokens)
- L6 Scripts: Configuration resolution (MEDIUM, 140-200 tokens)
- L6 Scripts: State detection & YAML parsing (MEDIUM, 160-240 tokens)

### 4. Add Pipeline Flexibility (LOW — 3 observations)

Pipeline is all-or-nothing. Experts can't regenerate a single layer or story. Steps 2+3 could run in parallel.

**Fix:** Accept optional layer/story filters. Parallelize Steps 2+3 (independent outputs from same test plan).

**Constituent findings:**
- L3 Efficiency: Steps 2+3 could parallelize (MEDIUM)
- L5 Enhancement: No mid-pipeline control (HIGH)
- L3 Efficiency: Step 5 runs all tests, not incremental (MEDIUM)

## Strengths

- **Specification-First Philosophy** — "Tests Are the Spec" constraint is clearly stated and architecturally sound. This is the defining feature.
- **Parallel Execution Model** — Running alongside custom-dev (not after it) is a sophisticated design choice that enables true TDD.
- **Resumable Execution** — qa-status.yaml state tracking enables graceful restart across sessions.
- **Token Efficiency** — 1,866 tokens with zero waste patterns. No defensive padding, no meta-explanation. Every instruction carries weight.
- **Outcome-Driven Steps** — Each pipeline step opens with a "Goal:" statement describing what, not how.
- **Concrete Conventions** — File patterns, framework specifics, example test names prevent drift.
- **Clean E2E Delegation** — Delegates Playwright to specialized skill rather than reimplementing.

## Detailed Analysis

### Structure & Capabilities

Sound workflow logic with well-ordered activation and pipeline steps. State detection enables resumption. No circular dependencies. Three missing sections (Identity, Communication Style, Principles) are the sole structural gap. Name format `custom-qa` is non-standard but intentional for the custom workflow suite.

### Persona & Voice

Consistent technical, imperative tone throughout. Zero waste patterns. Overview establishes mental model in 7 lines. Progressive disclosure is excellent. Operational clarity is high with concrete paths, templates, and verification commands. No changes recommended to existing content.

### Identity Cohesion

Workflow steps are cohesive — every step serves the core mission. Zero redundancy. Clean separation between test layers. However, without persona sections, there's no persona-capability alignment to evaluate. The agent functions as a procedure, not a persona.

### Execution Efficiency

Clean dependency graph with no cycles. Main opportunities: parallelize Steps 2+3, add pre-flight validation, make Step 5 incremental. All improvements are additive (low risk). Lazy context loading and state resumption are efficient patterns worth preserving.

### Conversation Experience

**First-timer:** Low confidence — fail-first philosophy unexplained, silent failure on missing prerequisites.
**Expert:** Medium satisfaction — functional but rigid, no layer/story granularity.
**Automator:** Low — no headless mode or machine-readable output.
**Headless potential:** Easily adaptable — no discovery phase, all inputs deterministic. Low transformation effort.

### Script Opportunities

6 opportunities identified, estimated 1800-2600+ tokens saved per epic. Highest priority: acceptance criteria extraction (400-600 tokens). All scripts are reusable across custom-dev, sprint planning, and documentation agents. Intelligence placement is correct — judgment stays in prompts, parsing moves to scripts.

## Recommendations

1. **Add Identity/Style/Principles sections** — Resolves 6 findings, low effort, highest impact on behavior consistency
2. **Add pre-flight validation** — Resolves 4 findings, low effort, prevents first-timer frustration
3. **Create acceptance criteria extraction script** — Resolves 1 finding but saves 400-600 tokens per epic, medium effort
4. **Add test case counting script** — Resolves 1 finding, saves 250-380 tokens per epic, low effort
5. **Parallelize Steps 2+3** — Resolves 1 finding, low effort, ~30% speed improvement
6. **Add layer/story filter args** — Resolves 3 findings, medium effort, unlocks expert workflows
7. **Add headless mode** — Resolves 1 finding, low effort, enables CI integration
