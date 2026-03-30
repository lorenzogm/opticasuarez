# Execution Efficiency Analysis: custom-dev

## Assessment

The workflow demonstrates solid orchestration design with clean skill separation and stateful resumability. Sequential story processing creates some bottlenecks where independent operations could theoretically be parallelized, and the context-carrying strategy could be more explicit. The prepass report confirms zero dependency cycles — the DAG structure is healthy.

## Key Findings

### HIGH: Glob Search for project-context.md
- **File:** SKILL.md line 27
- **Current:** `Search for **/project-context.md` — filesystem scan across entire project tree
- **Alternative:** Use deterministic path `{project-root}/_bmad-output/project-context.md`. Fallback to glob only if not found.
- **Impact:** Eliminates filesystem traversal in common case.

### MEDIUM: Sequential Code Review Blocks Next Story Prep
- **File:** SKILL.md lines 83-92 (Steps 3→4 in story loop)
- **Current:** Implement → Code Review → next story creation — all blocking sequential
- **Alternative:** Code review for story N could run while story creation for N+1 begins
- **Impact:** Removes one code review duration from critical path per story

### MEDIUM: Retrospective and Documentation Run Serially
- **File:** SKILL.md lines 95-113 (Steps 6→7)
- **Current:** Retrospective completes → Documentation starts
- **Alternative:** Both operate on completed epic state; neither depends on the other's output. Could run in parallel.
- **Impact:** Removes min(retrospective, documentation) time from critical path per epic

### MEDIUM: Context Accumulation Strategy Unspecified
- **File:** SKILL.md line 53
- **Current:** "Carry forward all context" — no explicit mechanism
- **Alternative:** Orchestrator-level context cache passed to each skill, avoiding redundant re-reads
- **Impact:** Eliminates O(N) redundant filesystem reads

### LOW: State Detection Sequential Checks
- **File:** SKILL.md lines 31-41
- **Current:** Sequential checks for sprint-status.yaml, story files, story status
- **Alternative:** Parallelize all state checks at initialization
- **Impact:** Minor latency improvement on resume

## Optimization Opportunities

1. **Parallelize Code Review + Next Story Prep** — background code review, unblock next story creation
2. **Parallelize Retrospective + Documentation** — both are independent producers after epic completion
3. **Replace glob search with deterministic path** for project-context.md
4. **Explicit context caching** at orchestrator level

## What's Already Efficient

1. **Stateful Resumability** — sprint-status.yaml as single source of truth enables fault recovery
2. **Skill Separation** — each phase delegated to dedicated skill, reducing orchestrator context bloat
3. **One-Time Config Load** — BMM config loaded once at init
4. **Per-Epic Retrospective** — enables lessons-learned feedback into next epic
5. **Explicit Step Gating** — "if artifact exists, skip" prevents redundant work on resume
6. **Zero Dependency Cycles** — healthy DAG structure confirmed by prepass
