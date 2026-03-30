#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Detect existing planning artifacts and determine pipeline resume point.

Scans a planning artifacts directory for files produced by each pipeline step.
Returns structured JSON indicating which artifacts exist and from which step
to resume.

Usage:
    python3 detect-artifacts.py <planning_artifacts_dir>
    python3 detect-artifacts.py <planning_artifacts_dir> -o output.json
"""

import argparse
import glob
import json
import os
import sys
from pathlib import Path

ARTIFACT_MAP = [
    {"step": 1, "name": "brainstorming", "pattern": "brainstorming*.md", "type": "glob"},
    {"step": 2, "name": "product_brief", "pattern": "product-brief.md", "type": "file"},
    {"step": 3, "name": "prd", "pattern": "prd.md", "type": "file"},
    {"step": 4, "name": "ux_design", "pattern": "ux-design*.md", "type": "glob"},
    {"step": 5, "name": "architecture", "pattern": "architecture.md", "type": "file"},
    {"step": 6, "name": "epics", "pattern": "epics", "type": "directory"},
]


def detect_artifacts(artifacts_dir: str) -> dict:
    base = Path(artifacts_dir)
    artifacts = {}
    completed_steps = []

    for entry in ARTIFACT_MAP:
        name = entry["name"]
        step = entry["step"]
        pattern = entry["pattern"]

        if entry["type"] == "directory":
            target = base / pattern
            exists = target.is_dir() and any(target.iterdir())
            path = str(target) if exists else None
        elif entry["type"] == "glob":
            matches = sorted(glob.glob(str(base / pattern)))
            exists = len(matches) > 0
            path = matches[0] if exists else None
        else:
            target = base / pattern
            exists = target.is_file()
            path = str(target) if exists else None

        artifacts[name] = {"exists": exists, "path": path, "step": step}
        if exists:
            completed_steps.append(step)

    # Resume from the first incomplete step
    all_steps = [e["step"] for e in ARTIFACT_MAP]
    resume_from = 1
    for s in sorted(all_steps):
        if s in completed_steps:
            resume_from = s + 1
        else:
            resume_from = s
            break
    else:
        resume_from = max(all_steps) + 1  # All complete

    return {
        "artifacts_dir": str(base),
        "artifacts": artifacts,
        "completed_steps": sorted(completed_steps),
        "resume_from_step": min(resume_from, 7),
        "all_complete": len(completed_steps) == len(ARTIFACT_MAP),
    }


def main():
    parser = argparse.ArgumentParser(
        description="Detect existing planning artifacts and determine resume point."
    )
    parser.add_argument(
        "artifacts_dir", help="Path to the planning artifacts directory"
    )
    parser.add_argument(
        "-o", "--output", help="Write JSON output to file instead of stdout"
    )
    args = parser.parse_args()

    if not os.path.isdir(args.artifacts_dir):
        print(
            json.dumps(
                {"error": f"Directory not found: {args.artifacts_dir}",
                 "artifacts": {},
                 "completed_steps": [],
                 "resume_from_step": 1,
                 "all_complete": False}
            )
        )
        sys.exit(1)

    result = detect_artifacts(args.artifacts_dir)
    output = json.dumps(result, indent=2)

    if args.output:
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)
        Path(args.output).write_text(output + "\n")
        print(f"Results written to {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
