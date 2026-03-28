# Bug: "NUESTRA HISTORIA" timeline section on Quienes Somos page is empty

## Description
The "NUESTRA HISTORIA" section on the `/quienes-somos` page renders only the heading with no timeline content below it. The timeline component structure is present (a vertical line indicator), but the `<div class="space-y-12">` container that should hold timeline entries is completely empty. The JSON content file has 7 timeline entries that should be displayed.

## Reproduction Steps
1. Navigate to http://localhost:3001/quienes-somos
2. Scroll to the "NUESTRA HISTORIA" section (below the hero, above "NUESTRO EQUIPO")
3. Observe: Only the "NUESTRA HISTORIA" heading is visible with no timeline entries below it (just blank space)

## Expected Behavior
The "NUESTRA HISTORIA" section should display a vertical timeline with 7 entries:
- 1940 — APERTURA
- 1960 — HOGAR PERMANENTE
- 1970 — JUAN MIGUEL INICIA SU CARRERA
- 1998 — JUAN MIGUEL ASUME EL MANDO
- 2020 — NUEVA GENERACIÓN
- 2023 — NUEVOS HORIZONTES
- (plus additional entries from the JSON file)

Each entry should show the year, title, description, and an image.

## Evidence
- **agent-browser snapshot**: Section structure is `heading "NUESTRA HISTORIA" → generic → generic → (empty)`, followed immediately by "NUESTRO EQUIPO"
- **JS eval**: `section.textContent.trim()` === "NUESTRA HISTORIA" (0 chars of content beyond the heading)
- **HTML inspection**: `<div class="space-y-12"></div>` — empty container where timeline items should render
- **Content JSON**: `apps/web/src/content/quienes-somos.json` has 7 timeline entries with year, title, description, and image fields
- **Screenshot**: /tmp/qa-screenshot-historia-empty.png

## Root Cause (likely)
The Quienes Somos page is served by the catch-all route (`apps/web/src/routes/$.tsx`) which fetches page data from Sanity CMS via `fetchPage()`. The Sanity document for this page likely has a `sectionTimeline` section type, and the `SectionTimeline` component (`apps/web/src/components/sections/section-timeline.tsx`) reads `section.timelineItems || section.items`, but the Sanity data may not have the timeline items populated.

Possible causes:
1. The Sanity `quienes-somos` page document has the timeline section but no `timelineItems` array populated
2. The GROQ projection in `sectionProjection` may not be fetching the nested items correctly
3. The JSON content file data was never migrated to the Sanity CMS

## Environment
- App: apps/web (TanStack Start)
- Dev server: http://localhost:3001
- Browser: Chromium (agent-browser)
- Route: catch-all `apps/web/src/routes/$.tsx` → `apps/web/src/components/sections/section-timeline.tsx`

## Priority
Medium — The history section is a significant part of the "About Us" page. While the page is still functional (team and testimonials render), having an empty section with just a heading looks broken and damages credibility.

## Labels
bug, qa-discovered
