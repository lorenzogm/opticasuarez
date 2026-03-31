---
name: custom-dev
description: 'Orchestrate the full build cycle from sprint planning to implemented code with docs. Use when the user says "dev to done", "run build cycle", or "implement the backlog".'
---

# Dev to Done

## Overview

This workflow orchestrates the complete BMad Step 2 build cycle — from initializing sprint tracking through implementing every story, reviewing code, running retrospectives per epic, and updating project documentation. It picks up where `custom-plan` left off, consuming the epics and stories it produced and turning them into working code. Designed for autonomous execution: maximum autonomy, minimum interruption. Only critical code review findings (acceptance criteria violations or security/data-loss risks) halt the pipeline — all others are deferred.

**Args:** Accepts an optional epic identifier to implement a single epic, or no args to process the entire backlog.

**Output:** Implemented code for all stories across all epics, code review reports, retrospective summaries per epic, and updated project documentation.

## On Activation

### 1. Configuration

Load config from `{project-root}/_bmad/bmm/config.yaml` and resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`
- `{planning_artifacts}` — where epics and stories live
- `{implementation_artifacts}` — where sprint tracking and implementation output go
- `{project_knowledge}` — existing project docs for context

Load `{project-root}/_bmad-output/project-context.md` if it exists. If not found at that path, search `**/project-context.md` as fallback.

### 2. Backlog Sync from GitHub

Download open GitHub issues into the backlog. This keeps `backlog/to-do/` in sync with issues opened by other contributors.

- Use the `github_repo` MCP tool to list all **open** GitHub issues
- For each issue:
  - Skip if a matching folder already exists in `backlog/to-do/{number}-*/` or `backlog/done/{number}-*/`
  - Otherwise: create `backlog/to-do/{number}-{slug}/00-request.md` with the issue title, body, and URL
  - Add a row to `backlog/README.md` under **To-Do** with columns `#` and `Title` only
- Strictly **read-only** — never create, comment on, or close GitHub issues

**Backlog numbering convention:**
- **GitHub-sourced items** — use the real issue number as-is: `{number}-{slug}/`
- **Locally-created items** — prefix with a leading zero: `0{number}-{slug}/` (e.g., `0210-comprar-producto`)
- This prevents number collisions between GitHub issues and locally-created tickets

### 3. Pre-flight Validation

Before proceeding, validate that planning artifacts from `custom-plan` exist:

- Check `{planning_artifacts}/epics/` directory exists and contains at least one epic
- If missing, halt immediately: "No planning artifacts found. Run `custom-plan` first to create epics and stories."

### 4. State Detection

Check `{implementation_artifacts}/` for existing state to determine where to resume:

| Artifact | File | Indicates |
|----------|------|-----------|
| Sprint status | `sprint-status.yaml` | Sprint planning done (Step 1) |
| Story files | `{planning_artifacts}/epics/*/stories/*.md` | Stories ready for dev |
| Story status | Status field in story files or sprint-status.yaml | Per-story progress |

If `sprint-status.yaml` exists, parse it to find the current state and resume using this decision tree:

| Story Status | Action |
|-------------|--------|
| `done` | Skip — story already complete |
| `in-review` | Resume from Step 4 (Code Review) — collect review and fix |
| `in-progress` | Resume from Step 3 (Implement) — re-validate previous output and continue |
| `ready-for-dev` | Normal flow — Steps 2–4 |

If `sprint-status.yaml` does not exist, start from Step 1 (Sprint Planning).

### 5. Determine Scope

If the user provided an epic identifier, scope the cycle to that single epic. Otherwise, process all epics in the order defined by sprint-status.yaml.

Once scope is determined, begin the pipeline.

## Pipeline

Execute the build cycle by invoking skills in sequence. Between steps, confirm the artifact was produced, then immediately proceed — no pause, no menu, no confirmation needed.

Maintain an orchestrator-level context cache: accumulated sprint-status, completed stories, and code review findings. Pass this cache to each sub-skill invocation to avoid redundant artifact re-reads. The sprint-status.yaml is the source of truth for progress — the orchestrator updates it after each step completes.

### Step 1: Sprint Planning

Invoke `bmad-sprint-planning`.

**Goal:** Initialize sprint tracking by generating `sprint-status.yaml` from the existing epics and stories.

Skip if `sprint-status.yaml` already exists and is valid. This step runs once per project, not per epic.

### Step 2: Create Story

Invoke `bmad-create-story` for the next story that has status `ready-for-dev` (or equivalent) in sprint-status.yaml.

**Goal:** Produce a fully-contextualized story file with all the implementation details the developer needs — acceptance criteria, technical context, dependencies, and scope.

If the story file already exists and is complete, skip creation and proceed to implementation.

### Step 3: Implement Story

Invoke `bmad-dev-story` with the story file from Step 2.

**Goal:** Implement the story so that all tests pass — both any pre-existing tests from `custom-qa` and any additional tests written during implementation.

**Test-first constraint:** Before implementing, check for existing test files that target this story's components (unit tests at `app/**/*.test.ts(x)`, integration tests at `app/**/*.integration.test.ts(x)`, E2E tests at `tests/e2e/*.spec.ts`). These tests were written by `custom-qa` from acceptance criteria and serve as the implementation contract. **Do not modify pre-existing tests** — implementation must satisfy them as-is. Additional tests may be added if gaps exist, but existing test assertions are immutable.

### Step 4: Code Review

Invoke `bmad-code-review` for the changes made in Step 3. While the review runs, begin Step 2 (Create Story) for the next story in parallel if one exists.

**Goal:** Adversarial quality validation — blind spot hunting, edge case analysis, and acceptance criteria audit.

**Severity tiers:**
- **Critical** (blocks progress): defects that violate acceptance criteria or introduce security/data-loss risks. Address before proceeding.
- **Non-critical** (deferred): all other findings are logged for future improvement and don't block progress.

### Step 5: Story Loop

Repeat Steps 2–4 for each remaining story in the current epic. Update sprint-status.yaml after each story completes.

When all stories in the current epic are done, proceed to Step 6.

### Step 6: Retrospective + Documentation (parallel)

Invoke both `bmad-retrospective` and `bmad-document-project` concurrently for the completed epic — neither depends on the other's output.

**Retrospective goal:** Extract lessons learned, assess what went well and what didn't, and capture actionable improvements for subsequent epics. Feed the epic's stories, code review findings, and any issues encountered as context. In autonomous mode, generate insights from metrics and review data rather than waiting for human input.

**Documentation goal:** Update project documentation to reflect the epic's implemented changes — architecture docs, component inventory, API contracts, and any other relevant documentation. Use the epic's implemented code and planning artifacts as context. Documenting per epic keeps docs in sync incrementally.

Wait for both to complete before proceeding.

### Step 7: Epic Loop

Repeat Steps 2–6 for each remaining epic in scope. Apply lessons from the retrospective to improve execution of subsequent epics.

When all epics are complete, the pipeline is done.

## Completion

When all steps complete successfully:

1. Summarize what was implemented — list epics, stories completed, and key decisions made
2. Report any code review findings that were deferred
3. Highlight retrospective insights across all epics
4. Confirm documentation is up to date for each epic
5. Emit a structured summary to `{implementation_artifacts}/build-result.json`:
   ```json
   {
     "epics": [{"name": "", "status": "", "stories": [{"name": "", "status": "", "review_findings": 0}]}],
     "total_stories": 0,
     "deferred_findings": 0,
     "docs_updated": true
   }
   ```
6. Suggest next steps: `custom-qa` for E2E test coverage, or `bmad-sprint-status` for a status overview

## Script Candidates

The following deterministic operations could be offloaded to `./scripts/orchestration-engine.py` to reduce LLM token overhead (~9,500 tokens per full run):

- **Config loading & path resolution** — YAML parsing with variable interpolation
- **State detection & sprint status parsing** — YAML filter for next `ready-for-dev` story
- **Artifact validation** — file existence and schema checks between steps
- **Progress tracking** — status field updates in sprint-status.yaml
- **Story selection** — deterministic filtering by status
