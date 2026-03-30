---
name: custom-plan
description: 'Orchestrate the full planning pipeline from idea to backlog-ready epics. Use when the user says "plan to backlog", "run planning pipeline", or "create the full plan".'
---

# Plan to Backlog

## Overview

This workflow orchestrates the complete BMad planning pipeline — from brainstorming an idea to having implementation-ready epics and stories in the backlog. It invokes 7 existing skills in sequence, each building on the artifacts of the previous one. Designed for yolo execution: maximum autonomy, minimum interruption.

**Args:** Accepts a product idea, problem statement, or context as initial input.

**Output:** Complete planning artifacts: brainstorming report, product brief, PRD, UX design, architecture, epics & stories — all validated for implementation readiness.

## On Activation

### 1. Configuration

Load config from `{project-root}/_bmad/bmm/config.yaml` and resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`
- `{planning_artifacts}` — where output documents are saved
- `{project_knowledge}` — existing project docs for context

Search for `**/project-context.md`. If found, load as foundational reference.

### 2. Artifact Detection

Run `python3 ./scripts/detect-artifacts.py {planning_artifacts}` to scan for existing artifacts. The script returns JSON:

```json
{
  "artifacts": { "brainstorming": { "exists": true, "path": "..." }, ... },
  "resume_from_step": 3,
  "completed_steps": [1, 2]
}
```

If `resume_from_step` > 1, acknowledge completed artifacts and resume from that step. If all steps are incomplete, start from Step 1.

### 3. Capture Initial Input

If the user provided a product idea, problem statement, or context when invoking this workflow, capture it as the seed input for Step 1. If not, ask briefly: "What product or idea do you want to take from concept to backlog?"

Once input is captured, begin the pipeline.

## Context Passing Protocol

Artifacts are passed between steps as **file paths**, not inline content. Each step reads only the artifacts it needs from `{planning_artifacts}/`:

| Step | Reads | Writes |
|------|-------|--------|
| 1. Brainstorming | — | `brainstorming*.md` |
| 2. Product Brief | brainstorming report | `product-brief.md` |
| 3. PRD | product brief | `prd.md` |
| 4. UX Design | PRD | `ux-design*.md` |
| 5. Architecture | PRD | `architecture.md` |
| 6. Epics & Stories | PRD + architecture + UX | `epics/` |
| 7. Readiness Check | PRD + architecture + UX + epics | validation report |

When invoking a sub-skill, reference prior artifacts by path (e.g., "Use `{planning_artifacts}/prd.md` as the primary input"). Do NOT paste full artifact content into the prompt — let the sub-skill read the file.

After each step completes, emit a progress checkpoint:

```
✅ Step N (Name) — Complete
   Artifact: {path}
→ Step N+1: {description}...
```

## Pipeline Resilience

After each step, verify the expected artifact exists in `{planning_artifacts}/` before proceeding:

- If the artifact exists → proceed to next step
- If the artifact does NOT exist → halt and report: "Step N did not produce the expected artifact. Check the output and re-run this step."
- If a sub-skill encounters an error → halt and report the error. Do not proceed to dependent steps.

Individual sub-skills handle their own quality. The orchestrator's job is verifying artifact existence and sequencing.

## Pipeline

Execute each step by invoking the corresponding skill. Between steps, verify the artifact was produced, emit a progress checkpoint, then immediately proceed — no pause, no menu, no confirmation needed.

### Step 1: Brainstorming

Invoke `bmad-brainstorming` with the user's idea as input.

**Goal:** Explore the idea space, generate diverse perspectives, identify key themes and opportunities.

When the brainstorming session produces its output, capture the key insights and proceed immediately.

### Step 2: Product Brief

Invoke `bmad-product-brief` in autonomous mode.

**Goal:** Synthesize brainstorming output into a focused 1-2 page executive product brief.

Feed the brainstorming report as context. The brief defines the product vision, target users, key differentiators, and success metrics.

### Step 3: PRD

Invoke `bmad-create-prd`.

**Goal:** Create a comprehensive Product Requirements Document from the product brief.

The PRD should build directly on the product brief, expanding into detailed requirements, user stories scope, functional specifications, and success criteria. Operate with maximum autonomy — make reasonable decisions instead of asking, and present the complete draft for review.

### Steps 4 & 5: UX Design + Architecture (parallel)

These two steps are independent — both build on the PRD but not on each other. Run them in parallel when possible (e.g., using subagents). If parallel execution is not available, run them sequentially.

**Step 4 — UX Design:** Invoke `bmad-create-ux-design`.

**Goal:** Plan UX patterns and design specifications informed by the PRD.

Use `{planning_artifacts}/prd.md` as the primary input. Define user flows, interaction patterns, component specifications, and responsive behavior. Prioritize decisions over open questions.

**Step 5 — Architecture:** Invoke `bmad-create-architecture`.

**Goal:** Document technical architecture decisions that ensure consistent AI implementation.

Use `{planning_artifacts}/prd.md` as the primary input. Define technology choices, data models, API patterns, deployment architecture, and technical constraints. For this project, align with the existing TanStack Start + Sanity CMS stack documented in project-context.md.

Wait for both steps to complete and verify both artifacts exist before proceeding.

### Step 6: Epics & Stories

Invoke `bmad-create-epics-and-stories`.

**Goal:** Break down the PRD into implementation-ready epics and user stories, informed by architecture decisions.

Use `{planning_artifacts}/prd.md` + `{planning_artifacts}/architecture.md` + `{planning_artifacts}/ux-design*.md` as inputs. Each story should have clear acceptance criteria, technical context, and be sized for a single development session. This is the primary deliverable — the backlog content.

### Step 7: Implementation Readiness Check

Invoke `bmad-check-implementation-readiness`.

**Goal:** Validate that PRD, UX, Architecture, and Epics are all aligned and ready for development.

This is the quality gate. If gaps or misalignments are found, report them clearly. The pipeline is complete when this check passes.

## Completion

When all 7 steps complete successfully:

1. Summarize what was produced — list all artifacts with their locations
2. Report the implementation readiness status
3. Suggest next steps: `bmad-sprint-planning` to initialize sprint tracking, then `bmad-create-story` to begin development
