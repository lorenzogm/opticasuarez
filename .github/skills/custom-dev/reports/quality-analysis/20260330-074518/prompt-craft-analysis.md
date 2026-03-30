# Prompt Craft Analysis: custom-dev

## Assessment

This is a high-quality workflow orchestration skill with clear state management, explicit execution loops, and well-balanced outcome-focused goals. The skill efficiently delegates tactical decisions to sub-skills while maintaining master control over sequencing and progress tracking. Only minor ambiguities in error handling language require attention.

## Overview Quality

**Rating: Very Good**

The 7-line overview effectively primes the LLM's behavior:
- **Purpose**: Clearly states its role as orchestrator from "sprint planning to implemented code with docs"
- **Context linkage**: Explicitly positions where it fits in the pipeline ("picks up where `custom-plan` left off")
- **Autonomy framing**: "Yolo execution: maximum autonomy, minimum interruption" — strong priming for independent operation
- **I/O clarity**: Specifies both inputs (optional epic ID, full backlog) and outputs (code, reviews, retrospectives, docs)

## Per-Step Craft Assessment

| Step | Craft Quality | Notes |
|------|---|---|
| **On Activation: Configuration** | Excellent | Concise list of config variables to resolve. No over-explanation. |
| **On Activation: State Detection** | Excellent | Table format: artifact→file→indicates. Clear skip/retry logic. |
| **On Activation: Determine Scope** | Good | Clear conditional logic (epic ID vs. all epics). |
| **Pipeline Preamble** | Good | "Confirm artifact produced, then immediately proceed" — quality checkpoints + speed. |
| **Step 1: Sprint Planning** | Excellent | Goal clear. Skip condition prevents re-work. Single responsibility. |
| **Step 2: Create Story** | Good | Clear trigger (next `ready-for-dev`). Smart skip condition. |
| **Step 3: Implement Story** | Good | Goal clear. Delegates TDD to `bmad-dev-story`. |
| **Step 4: Code Review** | Ambiguous | "Critical issues" vs "non-critical" threshold undefined. |
| **Step 5: Story Loop** | Excellent | Loop condition explicit, progress tracking stated. |
| **Step 6: Retrospective** | Excellent | Goal and context well-defined. Defers tactical structure to skill. |
| **Step 7: Documentation** | Excellent | Outcome-focused per-epic docs. Context provided. |
| **Step 8: Epic Loop** | Excellent | Loop condition and lesson carryforward explicit. |
| **Completion** | Good | Summarizes outputs and suggests next workflows. |

## Key Findings

### MEDIUM: Step 4 — "Critical Issues" Threshold Undefined
- **File:** SKILL.md lines 83-84
- **Issue:** "If the review surfaces critical issues, address them before proceeding. Non-critical findings are captured for future improvement" — what qualifies as "critical" is undefined.
- **Impact:** LLM may incorrectly classify severity, either pausing unnecessarily or shipping defects.
- **Fix:** Add a one-sentence definition: "Critical issues: defects that violate acceptance criteria or introduce security/data loss risks. All others are non-critical."

### LOW: Conversational Tone in Spec Language
- **File:** SKILL.md line 14
- **Issue:** "Designed for yolo execution" — colloquial phrasing in otherwise formal spec.
- **Impact:** Minor. Intent is clear.
- **Fix:** Rephrase to "Designed for autonomous execution" if pursuing formal consistency. Acceptable as-is.

### LOW: Implicit Skill Availability Assumption
- **File:** SKILL.md lines 57-109
- **Issue:** Each step assumes referenced skills exist and are callable. No fallback if missing.
- **Impact:** If a skill is not installed, workflow halts silently.
- **Fix:** Acceptable within BMad ecosystem where skills are pre-validated.

## Self-Containment Check

PASS — All config paths explicitly defined, state machine clear, skip/resume logic explicit, external skills named specifically.

## Token Efficiency

- **Baseline:** 124 lines, ~1386 tokens (~11 tokens/line)
- **0 waste patterns** detected
- **0 back-references** (no re-explained concepts)
- **0 repetition** across steps
- Table for state detection replaces 15+ lines of prose — excellent compression
- Each step structured as: Invoke → Goal → Summary. No defensive padding.

**Verdict:** Efficient. No genuine waste detected.

## Strengths

1. Outcome-focused step goals that delegate HOW to sub-skills
2. State detection table is exemplary compressed format
3. Lean token footprint with zero waste patterns
4. Self-contained — works standalone without external context
