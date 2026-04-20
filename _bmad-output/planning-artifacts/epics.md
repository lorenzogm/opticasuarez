---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
inputDocuments:
  - docs/project-overview.md
  - docs/architecture-web-tanstack.md
  - docs/architecture-sanity-studio.md
  - docs/integration-architecture.md
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

### NonFunctional Requirements

NFR1: Seguridad: el workflow debe usar permisos mínimos de GitHub Actions (least privilege) y secretos enmascarados para cualquier token requerido.
NFR2: Confiabilidad: el orquestador debe tolerar estados transitorios (queued, in_progress) con reintentos y polling configurable.
NFR3: Idempotencia: ejecuciones duplicadas sobre el mismo issue no deben producir ramas/PRs conflictivos sin control explícito.
NFR4: Observabilidad: cada etapa debe emitir logs estructurados y un resumen final consumible en la UI de GitHub Actions.
NFR5: Rendimiento operativo: el intervalo del bucle debe balancear latencia de feedback y límites de rate API de GitHub.
NFR6: Compatibilidad repo: todas las validaciones deben ejecutarse desde la raíz del monorepo y respetar pnpm workspaces + Turborepo.
NFR7: Calidad: la automatización solo se considera exitosa cuando pasan todos los checks requeridos, incluyendo E2E nuevos.

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

## Epic List

### Epic 1: Issue-to-Green autónomo con Copilot + Claude Opus
Automatizar de extremo a extremo el ciclo completo desde la creación del issue hasta la verificación final de CI con todos los checks en verde, incluyendo los nuevos tests E2E, sin intervención manual.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9

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
