#!/usr/bin/env python3
"""Tests for detect-artifacts.py"""

import json
import os
import subprocess
import tempfile
from pathlib import Path

SCRIPT = str(Path(__file__).parent.parent / "detect-artifacts.py")


def run_script(artifacts_dir: str, extra_args: list = None) -> dict:
    cmd = ["python3", SCRIPT, artifacts_dir]
    if extra_args:
        cmd.extend(extra_args)
    result = subprocess.run(cmd, capture_output=True, text=True)
    return json.loads(result.stdout), result.returncode


def test_empty_directory():
    with tempfile.TemporaryDirectory() as tmpdir:
        output, code = run_script(tmpdir)
        assert code == 0
        assert output["completed_steps"] == []
        assert output["resume_from_step"] == 1
        assert output["all_complete"] is False
        for art in output["artifacts"].values():
            assert art["exists"] is False


def test_missing_directory():
    result = subprocess.run(
        ["python3", SCRIPT, "/tmp/nonexistent_dir_abc123"],
        capture_output=True, text=True
    )
    assert result.returncode == 1
    output = json.loads(result.stdout)
    assert "error" in output
    assert output["resume_from_step"] == 1


def test_partial_artifacts():
    with tempfile.TemporaryDirectory() as tmpdir:
        # Create step 1 and 2 artifacts
        Path(tmpdir, "brainstorming-session-2026.md").write_text("# Brainstorming")
        Path(tmpdir, "product-brief.md").write_text("# Brief")

        output, code = run_script(tmpdir)
        assert code == 0
        assert output["artifacts"]["brainstorming"]["exists"] is True
        assert output["artifacts"]["product_brief"]["exists"] is True
        assert output["artifacts"]["prd"]["exists"] is False
        assert output["completed_steps"] == [1, 2]
        assert output["resume_from_step"] == 3


def test_all_artifacts():
    with tempfile.TemporaryDirectory() as tmpdir:
        Path(tmpdir, "brainstorming-session.md").write_text("# B")
        Path(tmpdir, "product-brief.md").write_text("# PB")
        Path(tmpdir, "prd.md").write_text("# PRD")
        Path(tmpdir, "ux-design-spec.md").write_text("# UX")
        Path(tmpdir, "architecture.md").write_text("# Arch")
        epics = Path(tmpdir, "epics")
        epics.mkdir()
        Path(epics, "epic-1.md").write_text("# Epic 1")

        output, code = run_script(tmpdir)
        assert code == 0
        assert output["all_complete"] is True
        assert output["completed_steps"] == [1, 2, 3, 4, 5, 6]
        assert output["resume_from_step"] == 7


def test_empty_epics_directory():
    with tempfile.TemporaryDirectory() as tmpdir:
        Path(tmpdir, "brainstorming-report.md").write_text("# B")
        Path(tmpdir, "product-brief.md").write_text("# PB")
        Path(tmpdir, "prd.md").write_text("# PRD")
        Path(tmpdir, "ux-design.md").write_text("# UX")
        Path(tmpdir, "architecture.md").write_text("# Arch")
        Path(tmpdir, "epics").mkdir()  # empty directory

        output, code = run_script(tmpdir)
        assert code == 0
        assert output["artifacts"]["epics"]["exists"] is False
        assert output["all_complete"] is False
        assert output["resume_from_step"] == 6


def test_gap_in_steps():
    """Step 1 and 3 exist but step 2 missing — resume from step 2."""
    with tempfile.TemporaryDirectory() as tmpdir:
        Path(tmpdir, "brainstorming-ideas.md").write_text("# B")
        Path(tmpdir, "prd.md").write_text("# PRD")

        output, code = run_script(tmpdir)
        assert code == 0
        assert output["completed_steps"] == [1, 3]
        assert output["resume_from_step"] == 2


def test_output_to_file():
    with tempfile.TemporaryDirectory() as tmpdir:
        outfile = os.path.join(tmpdir, "result.json")
        Path(tmpdir, "prd.md").write_text("# PRD")

        result = subprocess.run(
            ["python3", SCRIPT, tmpdir, "-o", outfile],
            capture_output=True, text=True
        )
        assert result.returncode == 0
        assert os.path.exists(outfile)
        with open(outfile) as f:
            output = json.load(f)
        assert output["artifacts"]["prd"]["exists"] is True


if __name__ == "__main__":
    tests = [
        test_empty_directory,
        test_missing_directory,
        test_partial_artifacts,
        test_all_artifacts,
        test_empty_epics_directory,
        test_gap_in_steps,
        test_output_to_file,
    ]
    passed = 0
    failed = 0
    for test in tests:
        try:
            test()
            print(f"  ✅ {test.__name__}")
            passed += 1
        except AssertionError as e:
            print(f"  ❌ {test.__name__}: {e}")
            failed += 1
        except Exception as e:
            print(f"  ❌ {test.__name__}: {type(e).__name__}: {e}")
            failed += 1

    print(f"\n{passed}/{passed + failed} tests passed")
    if failed:
        exit(1)
