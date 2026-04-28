---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - docs/project-overview.md
  - docs/architecture-web-tanstack.md
  - docs/architecture-sanity-studio.md
  - docs/integration-architecture.md
  - docs/component-inventory-web-tanstack.md
  - _bmad-output/project-context.md
---

# opticasuarez - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for opticasuarez, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: El sistema debe disparar automáticamente un workflow de CI cuando se crea un issue en GitHub.
FR2: El workflow debe invocar GitHub Copilot usando modelo Claude Opus para procesar el issue de extremo a extremo.
FR3: El workflow debe ejecutar la secuencia bmad-create-story como primer paso para convertir el issue en una historia implementable.
FR4: El workflow debe ejecutar bmad-qa-generate-e2e-tests para generar tests E2E derivados de la historia.
FR5: El workflow debe ejecutar bmad-dev-story para implementar el código requerido por la historia.
FR6: El workflow debe ejecutar bmad-code-review para revisar los cambios generados antes de finalizar.
FR7: El workflow debe monitorizar los pipelines de CI relacionados hasta que todos estén en estado exitoso, incluyendo los nuevos tests E2E.
FR8: El workflow debe incluir un bucle Bash que consulte repetidamente el estado de checks/pipelines hasta obtener PASS global o FAIL terminal.
FR9: El workflow debe registrar resultados intermedios y final (paso ejecutado, estado de checks, enlace a ejecución) para trazabilidad.
FR10: Las páginas de servicios deben permitir imagen de fondo configurable en la sección hero, con formato webp optimizado y textos alt SEO.
FR11: Las secciones hero de las páginas de servicios pueden reorganizar su contenido textual hacia secciones inferiores para mejorar la presentación visual.
FR12: Las tarjetas de servicios deben mostrar iconos o emojis en lugar de texto en inglés para los identificadores visuales.
FR13: Los hipervínculos en tarjetas de servicios deben apuntar a las páginas correctas según el contexto de la tarjeta.
FR14: El contenido textual de las tarjetas de tratamiento debe poder actualizarse (título y descripción) sin cambios estructurales.
FR15: La página de contacto debe mostrar información de contacto (WhatsApp, email) con iconos clicables para cada tienda, enlazando directamente a WhatsApp y cliente de correo.
FR16: La sección de redes sociales de la página de contacto debe mostrar iconos clicables que enlazan a los perfiles oficiales (Instagram, Facebook, Twitter, YouTube).
FR17: La web debe implementar optimización técnica GEO (Generative Engine Optimization) incluyendo archivo llms.txt para mejorar la visibilidad en respuestas de IAs.

### NonFunctional Requirements

NFR1: Seguridad: el workflow debe usar permisos mínimos de GitHub Actions (least privilege) y secretos enmascarados para cualquier token requerido.
NFR2: Confiabilidad: el orquestador debe tolerar estados transitorios (queued, in_progress) con reintentos y polling configurable.
NFR3: Idempotencia: ejecuciones duplicadas sobre el mismo issue no deben producir ramas/PRs conflictivos sin control explícito.
NFR4: Observabilidad: cada etapa debe emitir logs estructurados y un resumen final consumible en la UI de GitHub Actions.
NFR5: Rendimiento operativo: el intervalo del bucle debe balancear latencia de feedback y límites de rate API de GitHub.
NFR6: Compatibilidad repo: todas las validaciones deben ejecutarse desde la raíz del monorepo y respetar pnpm workspaces + Turborepo.
NFR7: Calidad: la automatización solo se considera exitosa cuando pasan todos los checks requeridos, incluyendo E2E nuevos.
NFR8: Rendimiento visual: las imágenes deben estar en formato webp y redimensionadas para carga óptima en escritorio, tablet y móvil.
NFR9: SEO: todas las imágenes deben tener título y texto alternativo descriptivo y relevante para posicionamiento.
NFR10: Accesibilidad: los enlaces de contacto (WhatsApp, email) deben tener atributos aria descriptivos y ser navegables por teclado.

### Additional Requirements

- El repositorio usa monorepo con pnpm + Turborepo; los comandos deben ejecutarse desde la raíz.
- El gate de calidad del proyecto es pnpm check (types + linter + build), por lo que debe incluirse en la secuencia de verificación.
- El paquete E2E está en apps/web-e2e con Playwright; los pipelines deben contemplar esa suite cuando se generen nuevos tests.
- El flujo de CI/CD principal se implementa en GitHub Actions y debe integrarse con workflows existentes sin romper despliegues.
- Debe existir coordinación entre artefactos generados por historia, implementación y revisión para evitar drift entre steps.
- Se recomienda publicar evidencia de ejecución en PR/comentario de issue (estado de pasos y enlaces a runs) para auditoría.

### UX Design Requirements

No se identificó documento UX dedicado para esta iniciativa; no aplica extracción UX-DR en esta iteración.

### FR Coverage Map

FR1: Epic 1 - Trigger de workflow al crear issue en GitHub
FR2: Epic 1 - Invocación de Copilot con modelo Claude Opus
FR3: Epic 1 - Ejecución de bmad-create-story
FR4: Epic 1 - Ejecución de bmad-qa-generate-e2e-tests
FR5: Epic 1 - Ejecución de bmad-dev-story
FR6: Epic 1 - Ejecución de bmad-code-review
FR7: Epic 1 - Monitoreo de todos los pipelines requeridos hasta verde
FR8: Epic 1 - Bucle Bash de polling hasta PASS global o FAIL terminal
FR9: Epic 1 - Registro de resultados intermedios y trazabilidad final
FR10: Epic 2 - Imagen hero en servicios (contactología #430, visión deportiva #432)
FR11: Epic 2 - Reorganización de texto hero (contactología #430, visión pediátrica #431, control de miopía #433, ortoqueratología #434, visión deportiva #432)
FR12: Epic 2 - Iconos en tarjetas de servicios (contactología #430)
FR13: Epic 2 - Hipervínculos correctos en tarjetas (visión pediátrica #431)
FR14: Epic 2 - Actualización de contenido de tarjetas de tratamiento (control de miopía #433)
FR15: Epic 3 - Información de contacto por tienda (contacto #435)
FR16: Epic 3 - Redes sociales con iconos clicables (contacto #435)
FR17: Epic 4 - Optimización GEO y llms.txt (#429)

## Epic List

### Epic 1: Issue-to-Green autónomo con Copilot + Claude Opus
Automatizar de extremo a extremo el ciclo completo desde la creación del issue hasta la verificación final de CI con todos los checks en verde, incluyendo los nuevos tests E2E, sin intervención manual.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9

### Epic 2: Mejoras de contenido y diseño en páginas de servicios
Rediseñar las secciones hero, reorganizar contenido textual, corregir iconos y hipervínculos, y actualizar tarjetas de tratamiento en las 5 páginas de servicios: contactología (#430), visión pediátrica (#431), visión deportiva (#432), control de miopía (#433) y ortoqueratología (#434).
**FRs covered:** FR10, FR11, FR12, FR13, FR14

### Epic 3: Rediseño de la página de Contacto
Añadir imagen hero, información de contacto con iconos clicables (WhatsApp, email) para cada tienda, y mejorar la sección de redes sociales con iconos enlazados a los perfiles oficiales (#435).
**FRs covered:** FR15, FR16

### Epic 4: Optimización GEO para visibilidad en IAs
Implementar optimización técnica GEO (Generative Engine Optimization) incluyendo archivo llms.txt y metadatos estructurados para que la web sea referenciada con mayor confianza en respuestas de chatbots e IAs (#429).
**FRs covered:** FR17

## Epic 1: Issue-to-Green autónomo con Copilot + Claude Opus

Cuando se crea un issue en GitHub, el workflow orquesta automáticamente el ciclo completo de desarrollo asistido por IA: generación de historia, tests E2E, implementación, code review y monitoreo de CI hasta verde total.

### Story 1.1: Trigger y contexto seguro de ejecución al crear issue

As a desarrollador del equipo,
I want que al crear un issue en GitHub se dispare automáticamente un workflow de GitHub Actions con permisos mínimos y contexto inicial,
So that el ciclo de automatización arranque sin intervención manual y con seguridad y trazabilidad garantizadas.

**Acceptance Criteria:**

**Given** que existe el workflow `.github/workflows/issue-to-green.yml` en el repositorio
**When** se crea un nuevo issue en GitHub (evento `issues: opened`)
**Then** el workflow se dispara automáticamente con los permisos `contents: write`, `issues: write`, `pull-requests: write` y nada más
**And** el workflow registra en sus logs: número de issue, título, URL y timestamp de inicio

**Given** que el workflow está configurado con secretos
**When** se ejecuta cualquier paso que requiera token de GitHub o clave de API
**Then** los valores de los secretos nunca aparecen en texto plano en los logs
**And** el job falla limpiamente con mensaje explicativo si algún secreto requerido no está definido

**Given** que se crea un segundo issue mientras ya hay una ejecución en curso para otro issue
**When** GitHub Actions dispara el nuevo workflow
**Then** cada ejecución opera en su propia rama aislada con nombre `copilot/<issue-number>-auto`
**And** no se produce conflicto entre ejecuciones paralelas

---

### Story 1.2: Generación de historia implementable con bmad-create-story

As a desarrollador del equipo,
I want que el workflow invoque GitHub Copilot con Claude Opus para ejecutar bmad-create-story sobre el issue,
So that el issue se convierta en una historia estructurada y accionable antes de tocar código.

**Acceptance Criteria:**

**Given** que el workflow ha arrancado correctamente (Story 1.1 completa)
**When** el job `create-story` se ejecuta
**Then** invoca `gh copilot` con el modelo `claude-opus-4-5` y el prompt de `bmad-create-story` incluyendo el contenido completo del issue
**And** el artefacto de historia generado se escribe en `_bmad-output/implementation-artifacts/story-<issue-number>.md`

**Given** que Copilot genera la historia correctamente
**When** el archivo de historia se persiste en la rama `copilot/<issue-number>-auto`
**Then** el paso concluye con exit code 0
**And** el log del workflow muestra "Story generada: story-<number>.md" con path absoluto

**Given** que Copilot falla o devuelve contenido vacío
**When** el paso detecta el error
**Then** el workflow hace como máximo 2 reintentos con backoff de 30 segundos
**And** si los reintentos se agotan, el workflow falla el job con mensaje claro y comenta en el issue el fallo

---

### Story 1.3: Generación de tests E2E con bmad-qa-generate-e2e-tests

As a QA del equipo,
I want que el workflow ejecute bmad-qa-generate-e2e-tests usando la historia generada como contexto,
So that existan pruebas E2E específicas para los criterios de aceptación antes de implementar.

**Acceptance Criteria:**

**Given** que la historia de la Story 1.2 existe en `_bmad-output/implementation-artifacts/story-<issue-number>.md`
**When** el job `generate-e2e-tests` se ejecuta en secuencia después de `create-story`
**Then** invoca Copilot con Claude Opus y el prompt de `bmad-qa-generate-e2e-tests` usando el archivo de historia como contexto
**And** los tests E2E generados se escriben en `apps/web-e2e/tests/issue-<issue-number>/`

**Given** que los tests E2E son generados
**When** se persisten en la rama
**Then** siguen la convención kebab-case del proyecto y son válidos para Playwright (`test('...', async ({ page }) => {}`)
**And** el paso concluye con exit code 0 y el log muestra la ruta de los archivos generados

**Given** que la generación de tests falla
**When** el paso detecta ausencia de archivos o error de Copilot
**Then** el workflow falla el job con mensaje "Falló generación de tests E2E" y comenta en el issue

---

### Story 1.4: Implementación del código con bmad-dev-story

As a desarrollador del equipo,
I want que el workflow ejecute bmad-dev-story para implementar el código descrito en la historia,
So that los cambios de código se generen automáticamente alineados con la arquitectura del proyecto.

**Acceptance Criteria:**

**Given** que la historia (Story 1.2) y los tests E2E (Story 1.3) existen en la rama
**When** el job `dev-story` se ejecuta en secuencia
**Then** invoca Copilot con Claude Opus y el prompt de `bmad-dev-story` usando la historia y el contexto del proyecto (`_bmad-output/project-context.md`)
**And** los archivos de código generados o modificados se persisten en la rama con mensajes de commit descriptivos

**Given** que la implementación se genera correctamente
**When** se ejecuta `pnpm check` desde la raíz del monorepo tras los cambios
**Then** el comando pasa sin errores (types + linter + build)
**And** el paso concluye con exit code 0

**Given** que `pnpm check` falla tras la implementación
**When** el paso detecta errores de tipos, linter o build
**Then** el workflow registra los errores en el log y falla el job con el resumen de errores
**And** comenta en el issue indicando qué checks fallaron

---

### Story 1.5: Revisión de código con bmad-code-review

As a tech lead del equipo,
I want que el workflow ejecute bmad-code-review sobre los cambios generados y abra un PR con los resultados,
So that haya una revisión estructurada de los cambios antes de considerarlos listos.

**Acceptance Criteria:**

**Given** que los cambios de código están en la rama `copilot/<issue-number>-auto`
**When** el job `code-review` se ejecuta en secuencia
**Then** invoca Copilot con Claude Opus y el prompt de `bmad-code-review` usando el diff de la rama contra `main`
**And** el resultado de la revisión se escribe en `_bmad-output/implementation-artifacts/code-review-<issue-number>.md`

**Given** que la revisión de código se completa
**When** no existen findings bloqueantes
**Then** el workflow abre un PR desde `copilot/<issue-number>-auto` hacia `main` con título `feat: <issue-title> — closes #<number>` y requestea reviewers `juanpeich` y `lorenzogm`
**And** el cuerpo del PR incluye el resumen de la revisión y enlace al issue

**Given** que la revisión detecta findings bloqueantes
**When** el paso evalúa el resultado
**Then** el PR se abre igualmente con etiqueta `needs-revision` y el resumen de findings en el cuerpo
**And** se comenta en el issue con los findings principales para visibilidad

---

### Story 1.6: Monitoreo de pipelines con bucle Bash hasta verde total

As a desarrollador del equipo,
I want que el workflow monitorice en bucle todos los checks del PR (incluyendo los nuevos tests E2E) hasta que todos pasen o se detecte un fallo terminal,
So that el ciclo se cierre automáticamente solo cuando el CI está completamente en verde.

**Acceptance Criteria:**

**Given** que el PR ha sido abierto (Story 1.5 completa) y los checks de CI han arrancado
**When** el job `monitor-pipelines` se ejecuta
**Then** ejecuta un bucle Bash que consulta `gh pr checks <pr-number>` cada 60 segundos
**And** el bucle distingue estados: `pending/queued/in_progress` (continúa esperando), `success` (PASS), `failure/cancelled/timed_out` (FAIL terminal)

**Given** que el bucle detecta que todos los checks están en `success`
**When** se alcanza PASS global
**Then** el bucle termina con exit code 0
**And** el workflow comenta en el issue: "✅ CI en verde — PR #<number> listo para revisión" con enlace al PR y resumen de checks

**Given** que algún check pasa a estado `failure`
**When** el bucle detecta FAIL terminal
**Then** el bucle termina con exit code 1
**And** el workflow comenta en el issue: "❌ CI falló en check `<nombre>` — PR #<number>" con enlace al run fallido

**Given** que el bucle ha estado esperando más de 30 minutos sin resolución
**When** se supera el timeout global
**Then** el job falla con mensaje "Timeout de monitoreo superado (30 min)" y comenta en el issue para revisión manual
**And** el timeout del bucle es configurable vía variable de entorno `PIPELINE_TIMEOUT_MINUTES` (default: 30)

---

## Epic 2: Mejoras de contenido y diseño en páginas de servicios

Rediseñar las secciones hero, reorganizar contenido textual, corregir iconos y hipervínculos, y actualizar tarjetas de tratamiento en las 5 páginas de servicios.

### Story 2.1: Imagen hero y reorganización de texto en contactología (#430)

As a visitante de la web,
I want ver una imagen de fondo profesional en la sección hero de /servicios/contactologia y el texto descriptivo en su propia sección,
So that la página transmita una imagen visual atractiva y el contenido esté mejor organizado.

**Acceptance Criteria:**

**Given** que la página /servicios/contactologia tiene un fondo gris en la sección hero
**When** se actualiza la sección hero
**Then** se muestra una imagen de fondo descargada del enlace proporcionado (Google Drive), convertida a formato webp, redimensionada para escritorio/tablet/móvil
**And** la imagen sigue las características visuales (opacidad, transparencia) de la sección hero de /servicios/examen-visual
**And** la imagen usa el componente `image` del proyecto con título y texto alternativo SEO descriptivo

**Given** que la sección hero contiene el texto descriptivo "En Óptica Suárez somos especialistas en contactología..."
**When** se reorganiza el contenido
**Then** el texto se elimina de la sección hero
**And** se crea una nueva sección debajo con título "Tus lentillas en Jaén" que contiene el texto eliminado

**Given** que las tarjetas de servicios muestran texto en inglés ("eye", "calendar", "settings", "book")
**When** se corrigen las tarjetas
**Then** cada tarjeta muestra un emoji o icono visual centrado en lugar del texto en inglés

---

### Story 2.2: Reorganización de texto y verificación de enlaces en visión pediátrica (#431)

As a visitante de la web,
I want que la página /servicios/vision-pediatrica tenga el texto descriptivo en la sección adecuada y los enlaces de las tarjetas funcionen correctamente,
So that la información sea clara y la navegación interna sea fiable.

**Acceptance Criteria:**

**Given** que la sección hero de /servicios/vision-pediatrica contiene el texto "En Óptica Suárez somos especialistas en visión pediátrica en Jaén..."
**When** se reorganiza el contenido
**Then** el texto se elimina de la sección hero
**And** el texto se mueve a la segunda sección bajo el título "¿Por qué es importante la Visión Pediátrica?"

**Given** que las tarjetas de servicios tienen hipervínculos
**When** se verifican los enlaces
**Then** cada hipervínculo apunta a la página correcta en contexto con lo que indica la tarjeta
**And** no existen enlaces rotos ni rutas incorrectas

---

### Story 2.3: Imagen hero, texto descriptivo e imagen en sección de visión deportiva (#432)

As a visitante de la web,
I want ver una imagen hero profesional en /servicios/vision-deportiva, texto descriptivo geolocalizado y una imagen complementaria en la sección de rendimiento,
So that la página sea visualmente atractiva y posicione el servicio en Jaén.

**Acceptance Criteria:**

**Given** que la sección hero de /servicios/vision-deportiva tiene una imagen actual
**When** se actualiza la imagen hero
**Then** se reemplaza por la imagen proporcionada (Google Drive), convertida a webp, redimensionada para escritorio/tablet/móvil
**And** sigue las características visuales de la hero de /servicios/examen-visual
**And** usa el componente `image` con título y texto alternativo SEO

**Given** que la sección hero contiene el texto "Servicios especializados para deportistas..."
**When** se reorganiza
**Then** el texto se elimina de la sección hero para mejorar la presentación visual

**Given** que la sección "¿QUÉ ES LA VISIÓN DEPORTIVA?" no tiene texto descriptivo
**When** se añade contenido
**Then** se incluye un texto breve descriptivo sobre la disciplina de visión deportiva geoposicionado en Jaén

**Given** que la sección "Mejora tu rendimiento" tiene una lista a la izquierda sin imagen
**When** se añade la imagen complementaria
**Then** se muestra a la derecha de la lista la imagen proporcionada (Google Drive), convertida a webp, redimensionada
**And** usa el componente `image` con título y texto alternativo SEO

---

### Story 2.4: Eliminación de texto hero y actualización de tarjetas en control de miopía (#433)

As a visitante de la web,
I want que la página /servicios/control-de-miopia tenga la sección hero limpia, texto descriptivo geolocalizado y tarjetas de tratamiento actualizadas,
So that la información sea precisa y la página posicione el servicio en Jaén.

**Acceptance Criteria:**

**Given** que la sección hero contiene el texto "En Óptica Suárez ofrecemos las técnicas más avanzadas..."
**When** se reorganiza
**Then** el texto se elimina de la sección hero

**Given** que la sección "¿Qué es el Control de Miopía?" no tiene texto descriptivo adecuado
**When** se añade contenido
**Then** se incluye un texto breve descriptivo sobre el control de miopía por el optometrista geoposicionado en Jaén

**Given** que la tarjeta central de "Opciones de Tratamiento" tiene título "Gafas con Lentes Progresivas"
**When** se actualiza la tarjeta
**Then** el título cambia a "Gafas con desenfoque periférico"
**And** el texto cambia de "Lentes progresivas especiales que proporcionan..." a "Lentes de un diseño especial que proporcionan diferentes potencias en distintas zonas de la lente, optimizando la visión y controlando la miopía."

---

### Story 2.5: Reorganización de texto en ortoqueratología (#434)

As a visitante de la web,
I want que la página /servicios/ortoqueratologia tenga la sección hero limpia y el texto descriptivo en la sección explicativa,
So that la presentación visual sea mejor y el contenido esté en su lugar lógico.

**Acceptance Criteria:**

**Given** que la sección hero contiene el texto "En Óptica Suárez llevamos más de 80 años ofreciendo las soluciones visuales más avanzadas en Jaén..."
**When** se reorganiza el contenido
**Then** el texto se elimina de la sección hero

**Given** que la sección "¿Qué es la Ortoqueratología?" existe
**When** se añade el texto movido
**Then** el texto eliminado de la sección hero ("En Óptica Suárez llevamos más de 80 años...mientras duermes.") se añade a esta sección como párrafo descriptivo

---

## Epic 3: Rediseño de la página de Contacto

Añadir imagen hero, información de contacto con iconos clicables para cada tienda y mejorar la sección de redes sociales.

### Story 3.1: Imagen hero y limpieza de texto en la página de contacto (#435)

As a visitante de la web,
I want ver una imagen de fondo profesional en la sección hero de la página de contacto,
So that la página transmita una imagen visual atractiva y coherente con el resto del sitio.

**Acceptance Criteria:**

**Given** que la sección hero de la página de contacto tiene fondo gris
**When** se actualiza la sección
**Then** se muestra una imagen de fondo descargada del enlace proporcionado (Google Drive), convertida a webp, redimensionada para escritorio/tablet/móvil
**And** sigue las características visuales de la hero de /servicios/examen-visual
**And** usa el componente `image` con título y texto alternativo SEO

**Given** que la sección hero contiene el texto "Ponte en contacto con nosotros para cualquier consulta sobre nuestros servicios de óptica y cuidado visual"
**When** se limpia el contenido
**Then** el texto se elimina de la sección hero

---

### Story 3.2: Información de contacto por tienda con iconos clicables (#435)

As a visitante de la web,
I want ver la información de contacto de cada tienda (Bulevar y Centro) con iconos de WhatsApp y email que me lleven directamente a contactar,
So that pueda comunicarme fácilmente con la tienda que me interese.

**Acceptance Criteria:**

**Given** que la sección "Nuestras Tiendas" muestra las dos ópticas
**When** se visualiza Óptica Bulevar
**Then** el título "Óptica Bulevar" aparece centrado
**And** se muestra un icono de WhatsApp clicable que abre `https://wa.me/34953093062`
**And** se muestra un icono de email clicable que abre `mailto:bulevar@opticasuarezjaen.es`
**And** se mantiene el enlace a Google Maps existente

**Given** que la sección "Nuestras Tiendas" muestra las dos ópticas
**When** se visualiza Óptica Centro
**Then** el título "Óptica Centro" aparece centrado
**And** se muestra un icono de WhatsApp clicable que abre `https://wa.me/34953223180`
**And** se muestra un icono de email clicable que abre `mailto:centro@opticasuarezjaen.es`
**And** se mantiene el enlace a Google Maps existente

---

### Story 3.3: Redes sociales con iconos clicables (#435)

As a visitante de la web,
I want ver los iconos de las redes sociales de Óptica Suárez y poder hacer clic para ir directamente a cada perfil,
So that pueda seguir a la óptica en las redes que me interesen.

**Acceptance Criteria:**

**Given** que la sección "SÍGUENOS EN REDES SOCIALES" existe en la página de contacto
**When** se visualiza
**Then** se muestran 4 iconos de redes sociales reconocibles (Instagram, Facebook, Twitter/X, YouTube)
**And** el icono de Instagram enlaza a `https://www.instagram.com/opticasuarezjaen/`
**And** el icono de Facebook enlaza a `https://www.facebook.com/opticasuarezjaen`
**And** el icono de Twitter/X enlaza a `https://x.com/opticasuarez`
**And** el icono de YouTube enlaza a `https://www.youtube.com/c/OpticaSuarezJa%C3%A9n/`
**And** cada enlace abre en nueva pestaña (`target="_blank"`, `rel="noopener noreferrer"`)

---

## Epic 4: Optimización GEO para visibilidad en IAs

Implementar optimización técnica GEO para que la web sea referenciada con mayor confianza por chatbots e IAs.

### Story 4.1: Implementación de archivo llms.txt y optimización GEO (#429)

As a responsable de marketing de Óptica Suárez,
I want que la web esté optimizada técnicamente para ser referenciada por IAs generativas cuando usuarios pregunten por servicios ópticos en Jaén,
So that la óptica sea mencionada con mayor frecuencia y confianza en respuestas de ChatGPT, Gemini, Copilot y otros asistentes.

**Acceptance Criteria:**

**Given** que la web no tiene archivo llms.txt
**When** se implementa la optimización GEO
**Then** se crea un archivo `llms.txt` en la raíz pública del sitio con información estructurada sobre la óptica: nombre, ubicación, servicios, especialidades, historia y datos de contacto
**And** el archivo sigue el formato estándar llms.txt

**Given** que la web tiene contenido sobre servicios especializados
**When** se revisan los metadatos
**Then** se añaden datos estructurados (schema.org) relevantes: LocalBusiness, MedicalBusiness u OpticalStore donde aplique
**And** se verifica que las páginas de servicios tengan metadescripciones claras con geolocalización ("Jaén")

**Given** que un usuario pregunta a una IA "¿dónde puedo hacer ortoqueratología en Jaén?"
**When** la IA rastrea la web
**Then** encuentra el archivo llms.txt y los metadatos estructurados que facilitan referenciar a Óptica Suárez con nombre, dirección y servicios
