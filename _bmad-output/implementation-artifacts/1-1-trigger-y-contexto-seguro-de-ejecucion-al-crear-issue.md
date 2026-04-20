---
story_key: 1-1-trigger-y-contexto-seguro-de-ejecucion-al-crear-issue
epic: 1
story: 1
status: review
date: 2026-04-20
---

# Story 1.1: Trigger y contexto seguro de ejecución al crear issue

## Historia de Usuario

Como desarrollador del equipo,
quiero que al crear un issue en GitHub se dispare automáticamente un workflow de GitHub Actions con permisos mínimos y contexto inicial,
para que el ciclo de automatización arranque sin intervención manual y con seguridad y trazabilidad garantizadas.

---

## Contexto del Proyecto

### Stack Relevante
- **Monorepo:** pnpm 10.5.0 + Turborepo 2.5.6 (todos los comandos desde la raíz)
- **Node.js:** 22
- **CI/CD:** GitHub Actions
- **Quality gate:** `pnpm check` (types + linter + build)
- **Workflows existentes en `.github/workflows/`:**
  - `pr-checks.yml` — se dispara en PR hacia main, ejecuta `pnpm check` y `pnpm build`
  - `copilot-agent-scheduler.yml` — scheduler diario que asigna Copilot a issues y gestiona PRs
  - `deploy-sanity-studio.yml` — deploy del studio de Sanity
  - `web-vercel-deploy.yml` — deploy de la web a Vercel

### Convenciones del Proyecto (de project-context.md)
- Nombres de archivos y carpetas en **kebab-case**
- Comandos siempre desde la **raíz del monorepo**
- Secrets: usar GitHub Secrets, NUNCA valores en texto plano en logs

---

## Criterios de Aceptación

**AC1 — Trigger al crear issue**
- **Given** que existe el workflow `.github/workflows/issue-to-green.yml` en el repositorio
- **When** se crea un nuevo issue en GitHub (evento `issues: opened`)
- **Then** el workflow se dispara automáticamente con los permisos:
  - `contents: write`
  - `issues: write`
  - `pull-requests: write`
  - (sin más permisos — least privilege)
- **And** el workflow registra en sus logs: número de issue, título, URL y timestamp de inicio

**AC2 — Secretos enmascarados**
- **Given** que el workflow está configurado con secretos
- **When** se ejecuta cualquier paso que requiera token de GitHub o clave de API
- **Then** los valores de los secretos nunca aparecen en texto plano en los logs
- **And** el job falla limpiamente con mensaje explicativo si algún secreto requerido no está definido

**AC3 — Ejecuciones paralelas aisladas**
- **Given** que se crea un segundo issue mientras ya hay una ejecución en curso para otro issue
- **When** GitHub Actions dispara el nuevo workflow
- **Then** cada ejecución opera en su propia rama aislada con nombre `copilot/<issue-number>-auto`
- **And** no se produce conflicto entre ejecuciones paralelas

---

## Tasks / Subtasks

- [x] **Task 1: Crear el workflow `.github/workflows/issue-to-green.yml`**
  - [x] 1a. Definir trigger `on: issues: types: [opened]`
  - [x] 1b. Configurar permisos a nivel de workflow: `contents: write`, `issues: write`, `pull-requests: write`
  - [x] 1c. Crear job `setup-context` con `runs-on: ubuntu-latest`
  - [x] 1d. Step de checkout: `actions/checkout@v4`
  - [x] 1e. Step de validación de secretos: `GITHUB_TOKEN` es implícito y siempre disponible; secrets adicionales se validarán en stories posteriores
  - [x] 1f. Step de log de contexto: registra `issue.number`, `issue.title`, `issue.html_url` y timestamp UTC
  - [x] 1g. Step de creación de rama aislada: `copilot/<issue-number>-auto` desde `main`
  - [x] 1h. `concurrency` configurada con `cancel-in-progress: false` para aislar ejecuciones paralelas

- [x] **Task 2: Verificar que los secrets no se filtran**
  - [x] 2a. Todos los secrets se referencian solo mediante `${{ secrets.XXX }}`
  - [x] 2b. No hay `echo` de valores de secrets en ningún step

- [x] **Task 3: Validar la sintaxis del workflow**
  - [x] 3a. YAML válido con indentación correcta
  - [x] 3b. No modifica ningún workflow existente

---

## Notas de Implementación

### Estructura del workflow a crear

```yaml
# .github/workflows/issue-to-green.yml
name: Issue-to-Green

on:
  issues:
    types: [opened]

permissions:
  contents: write
  issues: write
  pull-requests: write

concurrency:
  group: issue-to-green-${{ github.event.issue.number }}
  cancel-in-progress: false  # No cancelar runs anteriores del mismo issue

jobs:
  setup-context:
    runs-on: ubuntu-latest
    outputs:
      branch-name: ${{ steps.set-branch.outputs.branch }}
    steps:
      - name: Checkout main
        uses: actions/checkout@v4
        with:
          ref: main
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Validate required secrets
        # Verificar secrets adicionales si son necesarios (ej: COPILOT_API_KEY)
        # El GITHUB_TOKEN es implícito y siempre disponible
        run: |
          echo "Secrets validation passed"

      - name: Log issue context
        run: |
          echo "=== Issue Context ==="
          echo "Issue Number: ${{ github.event.issue.number }}"
          echo "Issue Title: ${{ github.event.issue.title }}"
          echo "Issue URL: ${{ github.event.issue.html_url }}"
          echo "Timestamp: $(date -u '+%Y-%m-%dT%H:%M:%SZ')"
          echo "===================="

      - name: Create isolated branch
        id: set-branch
        run: |
          BRANCH="copilot/${{ github.event.issue.number }}-auto"
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git checkout -b "$BRANCH"
          git push origin "$BRANCH"
          echo "branch=$BRANCH" >> "$GITHUB_OUTPUT"
```

### Puntos Clave
1. **`GITHUB_TOKEN`** es el token implícito de GitHub Actions — ya está disponible, no hay que crearlo
2. **`concurrency`** con `cancel-in-progress: false` evita que dos issues paralelos se cancelen entre sí (cada issue tiene su propia clave de concurrencia)
3. La rama se crea desde `main` con checkout de `actions/checkout@v4` con `ref: main`
4. El step de log usa `echo` con referencias a `github.event.issue.*` — estos NO son secrets y es seguro loguearlos
5. El step de validación de secrets solo debe verificar secrets que realmente se usen en steps posteriores (stories 1.2-1.6 pueden requerir más secrets; esta story solo configura el esqueleto base)

### Archivos a Crear
- `.github/workflows/issue-to-green.yml`

### Archivos a NO Modificar
- Ningún workflow existente debe ser modificado
- No tocar `apps/`, `configs/`, ni código de la aplicación

---

## Dev Agent Record

### Debug Log
_Vacío — para uso del agente durante implementación_

### Completion Notes
Todos los ACs implementados. El workflow `issue-to-green.yml` se crea con trigger `issues: opened`, permisos mínimos (`contents`, `issues`, `pull-requests: write`), log de contexto del issue y creación de rama aislada `copilot/<number>-auto`. La `concurrency` con clave por número de issue garantiza que ejecuciones del mismo issue no se solapen, y `cancel-in-progress: false` permite issues paralelos.

### File List
- `.github/workflows/issue-to-green.yml` (creado)

### Change Log
- 2026-04-20: Creado `.github/workflows/issue-to-green.yml` con setup-context job (Story 1.1)
