# QA Spec — Old vs New Site Gap Analysis

**Date**: 2026-03-31

## Old Site Map (opticasuarez-old.vercel.app)

| URL | Title | Key Sections |
|-----|-------|--------------|
| `/` | Homepage | Hero carousel, 6 service cards, video, specialists, locations, CTA |
| `/quienes-somos` | Quiénes Somos | Timeline (6 events 1940-2020), team (4 members), testimonials, locations |
| `/contacto` | Contacto | Contact info, 2 stores (Bulevar + Centro with addresses/hours), form, social |
| `/blog` | Blog | 14 articles, category filter tabs |
| `/blog/{slug}` | Blog Article | Content, author, date |
| `/planveo` | Plan VEO | Hero, what is it, 3 coverage cards, 4 requirements, 4 steps, 8 FAQ questions, CTA |
| `/examen-visual` | Examen Visual | Types (4 icons), process (5 steps), benefits, frequency, FAQ, locations |
| `/terapia-visual` | Terapia Visual | Benefits, conditions (6 cards), process (4 steps), testimonials, FAQ |
| `/contactologia` | Contactología | Services (4 cards), lens types (4), advantages, process, FAQ |
| `/vision-pediatrica` | Visión Pediátrica | Importance, services, age ranges (4), warning signs, reviews, FAQ |
| `/control-de-miopia` | Control de Miopía | Detection, treatment options (3), scientific stats, FAQ |
| `/ortoqueratologia` | Ortoqueratología | What is it, advantages, adaptation process (4 steps), candidacy, FAQ |
| `/vision-deportiva` | Visión Deportiva | Services (4), therapy, testimonials, FAQ |
| `/servicios` | Servicios | 6 service cards overview |
| `/cita` | Reservar Cita | 5-step appointment booking flow |

## Gaps Found (Old Site vs Existing Tests)

### GAP-1: Plan VEO page — NOT TESTED
- Rich page on old site with hero, cards, steps, FAQ
- New site returns 404 "no encontrada" → likely missing page (BUG)

### GAP-2: Service page content — SHALLOW
- TC-SERV-03 only checks H1 + title for service pages
- Old site has rich sections: icons, process steps, FAQ accordion, CTA

### GAP-3: Vision Deportiva — MISSING from SSR tests
- TC-SERV-03 tests 5 services but omits vision-deportiva

### GAP-4: Contacto — MINIMAL
- Only verifies H1 and no "Página no encontrada"
- Old site has stores with addresses/hours, contact form, social

### GAP-5: Blog category filters — NOT TESTED
- Old site has filter tabs (TODAS, CONTROL DE MIOPÍA, etc.)

### GAP-6: Quienes Somos team — SHALLOW
- Only heading "NUESTRO EQUIPO" checked, not member cards

### GAP-7: Service page SEO — NOT TESTED
- Only homepage meta tags tested, not service pages
