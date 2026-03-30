# Agent Cohesion Analysis: custom-dev

## Assessment

The `custom-dev` workflow presents a well-structured build cycle that properly consumes epics and stories from `custom-plan-to-backlog` and orchestrates them through implementation, review, and documentation phases. The core pipeline is coherent and skills are appropriately integrated. Some operational details (input expectations, state management, failure handling) could be more explicit.

## Cohesion Dimensions

| Dimension | Score | Notes |
|-----------|-------|-------|
| Purpose-Capability Alignment | **Strong** | Claimed purpose maps directly to orchestrated steps |
| Capability Completeness | **Strong** | All essential build-cycle phases present; QA/deployment properly deferred |
| Redundancy Detection | **Strong** | No overlapping capabilities; code review and dev testing serve orthogonal purposes |
| External Skill Integration | **Strong** | Six skills form coherent pipeline with clear input→output relationships |
| Capability Granularity | **Moderate** | Steps well-scoped but loop nesting implicit rather than visually explicit |
| User Journey Coherence | **Moderate** | "Yolo execution" claim slightly overstated — critical review issues halt pipeline |
| Pipeline Continuity | **Moderate** | Correctly picks up from custom-plan-to-backlog but input artifact paths implicit |

## Key Findings

### MEDIUM: Input Artifact Expectations Implicit
- **Area:** On Activation / Configuration
- **Issue:** Consumes epics from `{planning_artifacts}` but doesn't explicitly state these come from `custom-plan-to-backlog`
- **Fix:** Add explicit path mapping in Configuration section

### MEDIUM: State Management Responsibility Unclear
- **Area:** Pipeline / Story Loop
- **Issue:** Claims sprint-status.yaml is source of truth but doesn't specify WHO updates it (orchestrator or sub-skills)
- **Fix:** Document state-update responsibility explicitly

### MEDIUM: "Yolo Execution" Claim Overstated
- **Area:** Overview + Step 4
- **Issue:** Promises "maximum autonomy" but halts on critical code review issues
- **Fix:** Clarify autonomy model — define "critical" explicitly

### LOW: Loop Structure Implied Not Explicit
- **Area:** Pipeline steps 5 and 8
- **Issue:** Story Loop and Epic Loop described in prose but nesting not visually clear
- **Fix:** Could restructure with nested headers for clarity

### LOW: Testing Failure Handling Vague
- **Area:** Step 4
- **Issue:** If code review finds test failures, recovery path is undefined
- **Fix:** Add explicit handling: story transitions to `needs-fixes`, re-invoke bmad-dev-story

## Strengths

1. **Strong skill integration** — six skills form coherent sequential pipeline
2. **Comprehensive coverage** — sprint tracking, dev, review, retrospectives, incremental docs
3. **Sound resumption logic** — state detection and resume-from-step documented
4. **Incremental documentation** — per-epic docs keeps output in sync
5. **Retrospectives per epic** — lessons cascade to subsequent epics within same run

## Creative Suggestions

1. **Cross-Epic Synthesis** — meta-retrospective after all epics for "lessons for next build cycle"
2. **Sprint Status Visualization** — invoke `bmad-sprint-status` after each story/epic loop for progress confirmation
3. **Artifact Lineage Tracking** — list implemented files with their story/epic lineage in Completion
4. **Failure Recovery Procedure** — explicit "Resume from Failure" section
5. **Review Strictness Flags** — optional `--skip-code-review` for spikes, `--strict-review` for critical stories
