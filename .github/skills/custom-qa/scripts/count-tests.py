#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# ///
"""Count test cases in generated test files and produce coverage metrics.

Scans Vitest and Playwright test files, extracts describe/it/test blocks,
and outputs a JSON inventory grouped by story and test layer.

Usage:
    python3 scripts/count-tests.py apps/opticasuarez-react-router/
    python3 scripts/count-tests.py {path} --epic booking-flow -o output.json
"""

import argparse
import json
import re
import sys
from pathlib import Path


def count_vitest_tests(filepath: Path) -> dict:
    """Extract test counts and names from a Vitest test file."""
    content = filepath.read_text(encoding="utf-8")
    describes = re.findall(r"""describe\s*\(\s*['"`](.+?)['"`]""", content)
    its = re.findall(r"""it\s*\(\s*['"`](.+?)['"`]""", content)
    tests = re.findall(r"""test\s*\(\s*['"`](.+?)['"`]""", content)

    all_tests = its + tests
    return {
        "file": str(filepath),
        "describe_blocks": describes,
        "test_names": all_tests,
        "test_count": len(all_tests),
    }


def count_playwright_tests(filepath: Path) -> dict:
    """Extract test counts and names from a Playwright spec file."""
    content = filepath.read_text(encoding="utf-8")
    tests = re.findall(r"""test\s*\(\s*['"`](.+?)['"`]""", content)
    describes = re.findall(r"""test\.describe\s*\(\s*['"`](.+?)['"`]""", content)

    return {
        "file": str(filepath),
        "describe_blocks": describes,
        "test_names": tests,
        "test_count": len(tests),
    }


def infer_story(filepath: Path) -> str:
    """Try to infer story association from file path or content."""
    # Check filename for story reference
    name = filepath.stem.replace(".test", "").replace(".integration.test", "").replace(".spec", "")
    return name


def scan_directory(base_path: Path) -> dict:
    """Scan for all test files and categorize them."""
    unit_files = []
    integration_files = []
    e2e_files = []

    # Unit tests: *.test.ts(x) but not *.integration.test.ts(x)
    for f in sorted(base_path.rglob("*.test.ts")):
        if ".integration." not in f.name:
            unit_files.append(count_vitest_tests(f))
    for f in sorted(base_path.rglob("*.test.tsx")):
        if ".integration." not in f.name:
            unit_files.append(count_vitest_tests(f))

    # Integration tests: *.integration.test.ts(x)
    for f in sorted(base_path.rglob("*.integration.test.ts")):
        integration_files.append(count_vitest_tests(f))
    for f in sorted(base_path.rglob("*.integration.test.tsx")):
        integration_files.append(count_vitest_tests(f))

    # E2E tests: *.spec.ts in tests/e2e/
    e2e_dir = base_path / "tests" / "e2e"
    if e2e_dir.exists():
        for f in sorted(e2e_dir.rglob("*.spec.ts")):
            e2e_files.append(count_playwright_tests(f))

    return {
        "unit": unit_files,
        "integration": integration_files,
        "e2e": e2e_files,
    }


def main():
    parser = argparse.ArgumentParser(
        description="Count test cases in generated test files and produce coverage metrics."
    )
    parser.add_argument(
        "path",
        help="Base path to scan for test files (e.g., apps/opticasuarez-react-router/)",
    )
    parser.add_argument("--epic", help="Epic name for labeling output")
    parser.add_argument("-o", "--output", help="Output file path (default: stdout)")
    parser.add_argument("--verbose", action="store_true", help="Print progress to stderr")
    args = parser.parse_args()

    base_path = Path(args.path)
    if not base_path.is_dir():
        print(f"Error: {base_path} is not a directory", file=sys.stderr)
        sys.exit(2)

    if args.verbose:
        print(f"Scanning {base_path} for test files...", file=sys.stderr)

    tests = scan_directory(base_path)

    unit_count = sum(f["test_count"] for f in tests["unit"])
    integration_count = sum(f["test_count"] for f in tests["integration"])
    e2e_count = sum(f["test_count"] for f in tests["e2e"])

    result = {
        "epic": args.epic or "all",
        "scan_path": str(base_path),
        "unit": {
            "files": len(tests["unit"]),
            "test_count": unit_count,
            "details": tests["unit"],
        },
        "integration": {
            "files": len(tests["integration"]),
            "test_count": integration_count,
            "details": tests["integration"],
        },
        "e2e": {
            "files": len(tests["e2e"]),
            "test_count": e2e_count,
            "details": tests["e2e"],
        },
        "totals": {
            "files": len(tests["unit"]) + len(tests["integration"]) + len(tests["e2e"]),
            "test_count": unit_count + integration_count + e2e_count,
        },
    }

    if args.verbose:
        print(
            f"  Unit: {len(tests['unit'])} files, {unit_count} tests",
            file=sys.stderr,
        )
        print(
            f"  Integration: {len(tests['integration'])} files, {integration_count} tests",
            file=sys.stderr,
        )
        print(
            f"  E2E: {len(tests['e2e'])} files, {e2e_count} tests",
            file=sys.stderr,
        )

    output = json.dumps(result, indent=2, ensure_ascii=False)
    if args.output:
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)
        Path(args.output).write_text(output, encoding="utf-8")
        print(f"Results written to {args.output}", file=sys.stderr)
    else:
        print(output)


if __name__ == "__main__":
    main()
