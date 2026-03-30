# Structure Analysis Report: custom-qa

**Scan Date:** 2026-03-30 | **Scanner:** L1 Structure | **Status:** WARNING — 4 Issues, 3 High Severity

---

## Assessment

The `custom-qa` agent has sound workflow logic and clear operational structure within its On Activation and Pipeline sections, but is structurally incomplete for production use. Three high-severity missing sections — **Identity**, **Communication Style**, and **Principles** — prevent the agent from being properly primed for its role. The agent is executable but not fully operational.

---

## Sections Found

| Section | Status | Line | Notes |
|---------|--------|------|-------|
| Frontmatter (name, description) | Present | 1-3 | Valid, name format non-standard |
| **Overview** | Present | 8 | Clear; explains positioning relative to custom-dev |
| **Identity** | **Missing** | — | HIGH — No persona definition |
| **Communication Style** | **Missing** | — | HIGH — No style guidance |
| **Principles** | **Missing** | — | HIGH — No decision framework |
| On Activation | Present | 16 | Well-structured with 3 substeps |
| Key Constraint | Present | 48 | Critical design rationale |
| Pipeline | Present | 58 | 7-step execution with conventions |
| Completion | Present | 167 | Final handoff guidance |

---

## Key Findings

### HIGH: Missing Identity Section

No Identity section defines the agent's persona or behavioral priming. Without it, the agent approaches test generation mechanically rather than strategically.

**Fix:** Add `## Identity` after frontmatter establishing the agent as a test architecture strategist generating specification-first test suites from design documents.

### HIGH: Missing Communication Style Section

No guidance on how the agent presents test plans, summaries, and status updates.

**Fix:** Add `## Communication Style` — explain test intent before listing tests, structure coverage summaries with decision rationale, use acceptance criteria language as test names.

### HIGH: Missing Principles Section

No decision framework for test trade-offs (unit vs E2E, vague acceptance criteria handling).

**Fix:** Add `## Principles` — specification first, layer by intent, fail gracefully, coverage over busywork.

### MEDIUM: Non-Standard Name Format

Frontmatter name `custom-qa` doesn't follow `bmad-agent-{name}` pattern. This is intentional for the custom workflow suite (matching `custom-dev` and `custom-plan`).

---

## Capabilities Routing

No separate capability files — self-contained workflow in SKILL.md. External references:

| External Reference | Purpose |
|-------------------|---------|
| `bmad-qa-generate-e2e-tests` | E2E test generation (Step 4) |
| `{project-root}/_bmad/bmm/config.yaml` | Configuration |
| `{planning_artifacts}/` | Story and epic data |

---

## Strengths

- Clear 7-step pipeline with defined inputs/outputs per step
- State detection via `qa-status.yaml` enables resumable execution
- "Tests Are the Spec" constraint is well-emphasized and architecturally sound
- Convention documentation (Steps 2-4) is concrete with file patterns and frameworks
- Valid frontmatter with specific trigger phrases

## Logical Consistency

All cross-references are consistent: Description matches capabilities, Activation feeds Pipeline, Overview aligns with Pipeline design.
