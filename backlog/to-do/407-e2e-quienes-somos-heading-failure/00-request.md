# Bug: E2E test "navigate to Quienes Somos" fails in CI — missing NUESTRA HISTORIA heading

## Description
The E2E test `about-contact.spec.ts:6` ("navigate to Quienes Somos via nav and verify content")
fails in CI because the "NUESTRA HISTORIA" heading is not rendered on the `/quienes-somos` page.
This blocks the entire deploy pipeline (preview → e2e → production).

## Pipeline Run
- Run: https://github.com/lorenzogm/opticasuarez/actions/runs/23696047894
- Result: 35 passed, 1 failed, 1 flaky, 2 skipped

## Failing Test
```
[chromium] › tests/about-contact.spec.ts:6:7 › About & Contact › navigate to Quienes Somos via nav and verify content
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
Locator: getByRole('heading', { name: /NUESTRA HISTORIA/i })
Expected: visible
Received: <element(s) not found>
```

## Root Cause
The Quienes Somos page is served by the catch-all Sanity CMS route. The `sectionTimeline`
in Sanity has no heading text "NUESTRA HISTORIA" rendered — the section title comes from
Sanity data which may not include it, or the component does not render a heading element.

Related: backlog item #404 (Quienes Somos empty timeline)

## Fix Options
1. Fix the timeline section component to render the heading from Sanity data
2. Update the E2E test to match what the page actually renders
3. Fix the Sanity content to include the heading

## Priority
High — blocks the full deploy pipeline from reaching production

## Labels
bug, pipeline, e2e
