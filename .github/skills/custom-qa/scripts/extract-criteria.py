#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# ///
"""Extract acceptance criteria from story files into structured JSON.

Scans story markdown files in an epic directory, extracts acceptance criteria
sections, and outputs a compact JSON inventory for LLM consumption.

Usage:
    python3 scripts/extract-criteria.py {planning_artifacts}/epics/{epic}/stories/
    python3 scripts/extract-criteria.py {path} -o output.json
"""

import argparse
import json
import re
import sys
from pathlib import Path


def extract_section(content: str, heading: str) -> str:
    """Extract content under a specific markdown heading until the next heading."""
    pattern = rf"^#{{1,3}}\s+{re.escape(heading)}\s*$"
    match = re.search(pattern, content, re.MULTILINE | re.IGNORECASE)
    if not match:
        return ""
    start = match.end()
    next_heading = re.search(r"^#{1,3}\s+", content[start:], re.MULTILINE)
    end = start + next_heading.start() if next_heading else len(content)
    return content[start:end].strip()


def parse_criteria(text: str) -> list[dict]:
    """Parse acceptance criteria from markdown text into structured list."""
    criteria = []
    lines = text.split("\n")
    current = None

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Detect Given/When/Then patterns (check before generic bullets)
        given_match = re.match(r"[-*]?\s*\*?\*?[Gg]iven\*?\*?\s*:?\s*(.*)", line)
        when_match = re.match(r"[-*]?\s*\*?\*?[Ww]hen\*?\*?\s*:?\s*(.*)", line)
        then_match = re.match(r"[-*]?\s*\*?\*?[Tt]hen\*?\*?\s*:?\s*(.*)", line)

        if given_match:
            if current:
                criteria.append(current)
            current = {"given": given_match.group(1).strip(), "when": "", "then": ""}
        elif when_match and current:
            current["when"] = when_match.group(1).strip()
        elif then_match and current:
            current["then"] = then_match.group(1).strip()
        elif re.match(r"^[-*]\s+", line):
            # Bullet point criteria (not Given/When/Then)
            if current:
                criteria.append(current)
                current = None
            criteria.append({"criterion": re.sub(r"^[-*]\s+", "", line)})

    if current:
        criteria.append(current)

    # If no structured criteria found, treat non-empty lines as individual criteria
    if not criteria:
        for line in lines:
            line = line.strip()
            if line and not line.startswith("#"):
                criteria.append({"criterion": line})

    return criteria


def extract_story(filepath: Path) -> dict | None:
    """Extract structured data from a single story file."""
    content = filepath.read_text(encoding="utf-8")

    # Extract title from first heading
    title_match = re.search(r"^#\s+(.+)", content, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else filepath.stem

    # Extract key sections
    ac_text = extract_section(content, "Acceptance Criteria")
    tech_text = extract_section(content, "Technical Context")
    if not tech_text:
        tech_text = extract_section(content, "Technical Notes")

    criteria = parse_criteria(ac_text) if ac_text else []

    return {
        "story_id": filepath.stem,
        "story_title": title,
        "story_file": str(filepath),
        "acceptance_criteria": criteria,
        "technical_context": tech_text[:500] if tech_text else "",
        "has_criteria": len(criteria) > 0,
        "criteria_count": len(criteria),
    }


def main():
    parser = argparse.ArgumentParser(
        description="Extract acceptance criteria from story files into structured JSON."
    )
    parser.add_argument(
        "path",
        help="Path to stories directory (e.g., planning_artifacts/epics/epic-1/stories/)",
    )
    parser.add_argument("-o", "--output", help="Output file path (default: stdout)")
    parser.add_argument("--verbose", action="store_true", help="Print progress to stderr")
    args = parser.parse_args()

    stories_dir = Path(args.path)
    if not stories_dir.is_dir():
        print(f"Error: {stories_dir} is not a directory", file=sys.stderr)
        sys.exit(2)

    story_files = sorted(stories_dir.glob("*.md"))
    if args.verbose:
        print(f"Found {len(story_files)} story files in {stories_dir}", file=sys.stderr)

    stories = []
    for f in story_files:
        story = extract_story(f)
        if story:
            stories.append(story)
            if args.verbose:
                print(
                    f"  {story['story_id']}: {story['criteria_count']} criteria",
                    file=sys.stderr,
                )

    total_criteria = sum(s["criteria_count"] for s in stories)
    with_criteria = sum(1 for s in stories if s["has_criteria"])
    without_criteria = sum(1 for s in stories if not s["has_criteria"])

    result = {
        "epic_dir": str(stories_dir),
        "stories": stories,
        "summary": {
            "total_stories": len(stories),
            "total_criteria": total_criteria,
            "stories_with_criteria": with_criteria,
            "stories_missing_criteria": without_criteria,
        },
    }

    output = json.dumps(result, indent=2, ensure_ascii=False)
    if args.output:
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)
        Path(args.output).write_text(output, encoding="utf-8")
        print(f"Results written to {args.output}", file=sys.stderr)
    else:
        print(output)


if __name__ == "__main__":
    main()
