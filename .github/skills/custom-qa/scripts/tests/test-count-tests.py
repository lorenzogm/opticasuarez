#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# ///
"""Tests for count-tests.py"""

import json
import subprocess
import sys
import tempfile
from pathlib import Path

SCRIPT = Path(__file__).parent.parent / "count-tests.py"


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
        assert data["totals"]["files"] == 0
        assert data["totals"]["test_count"] == 0


def test_unit_test_counting():
    with tempfile.TemporaryDirectory() as tmpdir:
        app_dir = Path(tmpdir) / "app" / "components"
        app_dir.mkdir(parents=True)
        test_file = app_dir / "button.test.ts"
        test_file.write_text(
            "import { describe, it, expect } from 'vitest'\n"
            "describe('Button', () => {\n"
            "  it('should render', () => { expect(true).toBe(true) })\n"
            "  it('should handle click', () => { expect(true).toBe(true) })\n"
            "})\n"
        )
        code, stdout, stderr = run_script(tmpdir)
        assert code == 0
        data = json.loads(stdout)
        assert data["unit"]["files"] == 1
        assert data["unit"]["test_count"] == 2


def test_integration_test_counting():
    with tempfile.TemporaryDirectory() as tmpdir:
        app_dir = Path(tmpdir) / "app" / "routes"
        app_dir.mkdir(parents=True)
        test_file = app_dir / "booking.integration.test.ts"
        test_file.write_text(
            "import { describe, it, expect } from 'vitest'\n"
            "describe('Booking Flow', () => {\n"
            "  it('should load data through loader', () => {})\n"
            "})\n"
        )
        code, stdout, stderr = run_script(tmpdir)
        assert code == 0
        data = json.loads(stdout)
        assert data["integration"]["files"] == 1
        assert data["integration"]["test_count"] == 1
        assert data["unit"]["files"] == 0  # Should not double-count


def test_e2e_test_counting():
    with tempfile.TemporaryDirectory() as tmpdir:
        e2e_dir = Path(tmpdir) / "tests" / "e2e"
        e2e_dir.mkdir(parents=True)
        spec_file = e2e_dir / "booking.spec.ts"
        spec_file.write_text(
            "import { test, expect } from '@playwright/test'\n"
            "test('user books appointment', async ({ page }) => {})\n"
            "test('user cancels booking', async ({ page }) => {})\n"
        )
        code, stdout, stderr = run_script(tmpdir)
        assert code == 0
        data = json.loads(stdout)
        assert data["e2e"]["files"] == 1
        assert data["e2e"]["test_count"] == 2


def test_epic_label():
    with tempfile.TemporaryDirectory() as tmpdir:
        code, stdout, stderr = run_script(tmpdir, "--epic", "booking-flow")
        assert code == 0
        data = json.loads(stdout)
        assert data["epic"] == "booking-flow"


def test_output_file():
    with tempfile.TemporaryDirectory() as tmpdir:
        outfile = Path(tmpdir) / "output.json"
        code, stdout, stderr = run_script(tmpdir, "-o", str(outfile))
        assert code == 0
        assert outfile.exists()
        data = json.loads(outfile.read_text())
        assert "totals" in data


def test_help():
    code, stdout, stderr = run_script("--help")
    assert code == 0
    assert "count" in stdout.lower() or "test" in stdout.lower()


if __name__ == "__main__":
    tests = [
        test_missing_directory,
        test_empty_directory,
        test_unit_test_counting,
        test_integration_test_counting,
        test_e2e_test_counting,
        test_epic_label,
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
