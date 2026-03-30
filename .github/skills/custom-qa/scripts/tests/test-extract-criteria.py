#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# ///
"""Tests for extract-criteria.py"""

import json
import subprocess
import sys
import tempfile
from pathlib import Path

SCRIPT = Path(__file__).parent.parent / "extract-criteria.py"


def run_script(*args: str) -> tuple[int, str, str]:
    result = subprocess.run(
        [sys.executable, str(SCRIPT), *args],
        capture_output=True,
        text=True,
    )
    return result.returncode, result.stdout, result.stderr


def test_missing_directory():
    code, stdout, stderr = run_script("/nonexistent/path")
    assert code == 2, f"Expected exit code 2, got {code}"
    assert "not a directory" in stderr


def test_empty_directory():
    with tempfile.TemporaryDirectory() as tmpdir:
        code, stdout, stderr = run_script(tmpdir)
        assert code == 0
        data = json.loads(stdout)
        assert data["summary"]["total_stories"] == 0
        assert data["stories"] == []


def test_story_with_criteria():
    with tempfile.TemporaryDirectory() as tmpdir:
        story = Path(tmpdir) / "story-1.md"
        story.write_text(
            "# Book Appointment\n\n"
            "## Acceptance Criteria\n\n"
            "- Given I am on the booking page\n"
            "- When I click a time slot\n"
            "- Then a confirmation dialog appears\n"
            "- User can see available slots\n"
        )
        code, stdout, stderr = run_script(tmpdir)
        assert code == 0
        data = json.loads(stdout)
        assert data["summary"]["total_stories"] == 1
        assert data["summary"]["stories_with_criteria"] == 1
        assert data["stories"][0]["criteria_count"] >= 1


def test_story_without_criteria():
    with tempfile.TemporaryDirectory() as tmpdir:
        story = Path(tmpdir) / "story-2.md"
        story.write_text("# Some Story\n\nJust a description, no criteria.\n")
        code, stdout, stderr = run_script(tmpdir)
        assert code == 0
        data = json.loads(stdout)
        assert data["summary"]["stories_missing_criteria"] == 1


def test_output_file():
    with tempfile.TemporaryDirectory() as tmpdir:
        story = Path(tmpdir) / "story-1.md"
        story.write_text("# Story\n\n## Acceptance Criteria\n\n- AC1\n")
        outfile = Path(tmpdir) / "output.json"
        code, stdout, stderr = run_script(tmpdir, "-o", str(outfile))
        assert code == 0
        assert outfile.exists()
        data = json.loads(outfile.read_text())
        assert data["summary"]["total_stories"] == 1


def test_help():
    code, stdout, stderr = run_script("--help")
    assert code == 0
    assert "acceptance criteria" in stdout.lower() or "acceptance criteria" in stderr.lower()


if __name__ == "__main__":
    tests = [
        test_missing_directory,
        test_empty_directory,
        test_story_with_criteria,
        test_story_without_criteria,
        test_output_file,
        test_help,
    ]
    failed = 0
    for t in tests:
        try:
            t()
            print(f"  PASS: {t.__name__}")
        except AssertionError as e:
            print(f"  FAIL: {t.__name__} — {e}")
            failed += 1
        except Exception as e:
            print(f"  ERROR: {t.__name__} — {e}")
            failed += 1
    print(f"\n{len(tests) - failed}/{len(tests)} passed")
    sys.exit(1 if failed else 0)
