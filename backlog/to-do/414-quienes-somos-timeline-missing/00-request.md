# Bug: Quienes Somos page missing "NUESTRA HISTORIA" timeline heading

## Description
The Quienes Somos page at `/quienes-somos` does not display the "NUESTRA HISTORIA" timeline section heading. Previously, this test was passing. The page now returns HTTP 404 status from the server but still renders some content. The old site has a full timeline with 6 events (1940-2020) and a team section.

## Reproduction Steps
1. Navigate to http://localhost:3000/quienes-somos
2. Look for the "NUESTRA HISTORIA" heading
3. Heading is not found

## Expected Behavior
The Quienes Somos page should render with:
- H1 heading
- "NUESTRA HISTORIA" section with timeline events (1940, 1960, 1970, 1998, 2009, 2020)
- "NUESTRO EQUIPO" section with team member cards

## Actual Behavior
The "NUESTRA HISTORIA" heading is not found on the page. The server returns HTTP 404.

## Failing Tests
- **File**: `apps/web-e2e/tests/about-contact.spec.ts`
- **Tests**: TC-ABOUT-01 (navigate via nav), TC-ABOUT-03 (SSR)
- **Error**: `getByRole('heading', { name: /NUESTRA HISTORIA/i })` not found

## Error Output
```
Error: Timed out 15000ms waiting for expect(locator).toBeVisible()
Locator: getByRole('heading', { name: /NUESTRA HISTORIA/i })
Expected: visible
Received: <element(s) not found>
```

## Priority
Critical — This is a core page that was previously working (regression)
