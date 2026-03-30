# Script Opportunities Analysis: custom-dev

## Existing Scripts Inventory

No `scripts/` directory exists in `.github/skills/custom-dev/`. This is a pure prompt-based workflow.

## Assessment

The workflow contains several deterministic control-flow operations (config loading, state parsing, artifact validation, story selection, status tracking) that repeat across every story in every epic. These are script candidates that would reduce LLM token overhead and improve reliability. However, as a workflow orchestrator that delegates to sub-skills, most of the heavy work is already in those sub-skills — the orchestration layer is relatively lightweight.

## Key Findings

### HIGH: Artifact Validation Loop
- **File:** SKILL.md line 53 ("confirm the artifact was produced")
- **Current:** LLM checks file existence/validity after each step, 8+ times per epic
- **Script:** Check file existence, validate YAML/JSON schema, verify required keys
- **Token drain:** ~100 tokens x 8 steps x N stories = 800+ tokens per epic
- **Determinism:** Perfect — file exists or doesn't

### HIGH: State Detection & Sprint Status Parsing
- **File:** SKILL.md lines 31-41
- **Current:** LLM parses sprint-status.yaml, determines resume point
- **Script:** Load YAML → extract completion status → identify first `ready-for-dev` story
- **Token drain:** ~150 tokens per initialization + ~50 per story selection
- **Determinism:** Perfect

### MEDIUM: Configuration Loading & Path Resolution
- **File:** SKILL.md lines 20-27
- **Current:** LLM loads config, resolves template variables
- **Script:** YAML loader with variable interpolation + path resolver
- **Token drain:** ~50-75 tokens per run
- **Determinism:** Perfect

### MEDIUM: File System Discovery
- **File:** SKILL.md line 27
- **Current:** "Search for `**/project-context.md`"
- **Script:** Recursive directory search at known path
- **Token drain:** ~75 tokens per setup
- **Determinism:** Perfect

### MEDIUM: Story Selection & Filtering
- **File:** SKILL.md line 65
- **Current:** LLM filters sprint-status.yaml for next `ready-for-dev` story
- **Script:** Query YAML, filter by status, return first match
- **Token drain:** ~75-100 tokens per story loop
- **Determinism:** Perfect

### LOW: Progress Tracking Updates
- **File:** SKILL.md line 92 ("Track progress in sprint-status.yaml")
- **Script:** Update status field, write YAML
- **Token drain:** ~50-75 tokens per story
- **Determinism:** Perfect

## Aggregate Token Savings

| Operation | Frequency (10 stories, 2 epics) | Tokens/Instance | Total |
|-----------|--------------------------------|-----------------|-------|
| Artifact validation | 80 | 100 | 8,000 |
| Story selection | 10 | 75 | 750 |
| State detection | 1 | 150 | 150 |
| Config loading | 1 | 50 | 50 |
| FS discovery | 1 | 75 | 75 |
| Progress tracking | 10 | 50 | 500 |
| **Total** | | | **~9,525** |

## Recommendation

Build a `scripts/orchestration-engine.py` to handle initialization (config, state detection) and loop control (story selection, artifact validation, progress updates). This would reduce LLM to judgment-only tasks (implementation, review, retrospective, docs) and save ~9.5K tokens per full backlog run.
