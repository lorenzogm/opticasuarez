---
story_key: 1-2-generacion-de-historia-implementable-con-bmad-create-story
epic: 1
story: 2
status: done
date: 2026-04-20
context:
  - _bmad-output/implementation-artifacts/1-1-trigger-y-contexto-seguro-de-ejecucion-al-crear-issue.md
---

# Story 1.2: Generación de historia implementable con bmad-create-story

## Historia de Usuario

Como desarrollador del equipo,
quiero que el workflow invoque GitHub Copilot con Claude Opus para ejecutar bmad-create-story sobre el issue,
para que el issue se convierta en una historia estructurada y accionable antes de tocar código.

---

## Contexto del Proyecto

### Prerequisito
**Story 1.1 está done.** El workflow `.github/workflows/issue-to-green.yml` ya existe con el job `setup-context` que:
- Se dispara en `issues: opened`
- Crea la rama `copilot/<issue-number>-auto` con output `branch-name`
- Tiene permisos: `contents: write`, `issues: write`, `pull-requests: write`

### Stack Relevante
- **GitHub Actions:** `gh` CLI disponible en runners Ubuntu
- **Copilot CLI:** `gh copilot` con modelo `claude-opus-4-5`
- **Monorepo root:** todos los comandos desde `/` del repo
- **Artefactos:** `_bmad-output/implementation-artifacts/`
- **Skills de BMad:** `.github/skills/bmad-create-story/`

### Convenciones
- Archivos de historia nombrados como `story-<issue-number>.md` en `_bmad-output/implementation-artifacts/`
- Reintentos máximos: 2, con backoff de 30 segundos
- Comentar en el issue si falla (usando `gh issue comment`)

---

## Criterios de Aceptación

**AC1 — Invocación de Copilot con create-story**
- **Given** que el workflow ha arrancado correctamente (Story 1.1 completa)
- **When** el job `create-story` se ejecuta
- **Then** invoca `gh copilot` con el modelo `claude-opus-4-5` y el prompt de `bmad-create-story` incluyendo el contenido completo del issue
- **And** el artefacto de historia generado se escribe en `_bmad-output/implementation-artifacts/story-<issue-number>.md`

**AC2 — Persistencia en rama**
- **Given** que Copilot genera la historia correctamente
- **When** el archivo de historia se persiste en la rama `copilot/<issue-number>-auto`
- **Then** el paso concluye con exit code 0
- **And** el log del workflow muestra "Story generada: story-<number>.md" con path absoluto

**AC3 — Manejo de fallos con reintentos**
- **Given** que Copilot falla o devuelve contenido vacío
- **When** el paso detecta el error
- **Then** el workflow hace como máximo 2 reintentos con backoff de 30 segundos
- **And** si los reintentos se agotan, el workflow falla el job con mensaje claro y comenta en el issue el fallo

---

## Tasks / Subtasks

- [ ] **Task 1: Añadir job `create-story` al workflow `issue-to-green.yml`**
  - [ ] 1a. El job depende de `setup-context` con `needs: setup-context`
  - [ ] 1b. Hacer checkout de la rama `copilot/<issue-number>-auto` (creada por el job anterior)
  - [ ] 1c. Setup de pnpm y Node 22 (igual que `pr-checks.yml`)
  - [ ] 1d. Instalar dependencias con `pnpm install`
  - [ ] 1e. Leer el contenido del issue vía `gh api` o `github.event.issue.body`
  - [ ] 1f. Invocar `gh copilot suggest` (o equivalente) con el modelo `claude-opus-4-5` y el prompt de bmad-create-story
  - [ ] 1g. Verificar que el archivo de historia no está vacío
  - [ ] 1h. Hacer commit y push del archivo de historia a la rama
  - [ ] 1i. Loguear "Story generada: story-<number>.md" con path absoluto

- [ ] **Task 2: Implementar lógica de reintentos**
  - [ ] 2a. Envolver la invocación de Copilot en un bucle con max 2 reintentos
  - [ ] 2b. Usar `sleep 30` entre reintentos
  - [ ] 2c. Si todos los reintentos fallan, ejecutar `gh issue comment` con mensaje de error
  - [ ] 2d. El job debe fallar con exit code != 0 si se agotan reintentos

---

## Notas de Implementación

### Cómo invocar gh copilot en CI

En GitHub Actions, `gh copilot` requiere autenticación. El `GITHUB_TOKEN` implícito es suficiente para la mayoría de operaciones. La invocación típica es:

```bash
gh copilot suggest --model claude-opus-4-5 "$(cat prompt.txt)"
```

Sin embargo, `gh copilot suggest` es interactivo. Para CI se recomienda usar la API directamente o el modo `--shell-out`. Una alternativa robusta es usar `gh api` con el endpoint de Copilot completions, o usar el action oficial de Copilot.

**Alternativa práctica para CI:** Usar `gh api /repos/{owner}/{repo}/issues/{number}` para obtener el body y construir el prompt, luego llamar a la CLI con input desde stdin o archivo temporal.

### Estructura del job a añadir

```yaml
  create-story:
    runs-on: ubuntu-latest
    needs: setup-context
    env:
      BRANCH: ${{ needs.setup-context.outputs.branch-name }}
      ISSUE_NUMBER: ${{ github.event.issue.number }}
    steps:
      - name: Checkout branch
        uses: actions/checkout@v4
        with:
          ref: ${{ env.BRANCH }}
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Generate story with bmad-create-story
        id: generate-story
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          STORY_FILE="_bmad-output/implementation-artifacts/story-${ISSUE_NUMBER}.md"
          ISSUE_BODY=$(gh api repos/${{ github.repository }}/issues/${ISSUE_NUMBER} --jq '.body // ""')
          ISSUE_TITLE=$(gh api repos/${{ github.repository }}/issues/${ISSUE_NUMBER} --jq '.title')
          SKILL_PROMPT=$(cat .github/skills/bmad-create-story/workflow.md)

          PROMPT="Ejecuta bmad-create-story para el siguiente issue del repositorio opticasuarez.

          Issue #${ISSUE_NUMBER}: ${ISSUE_TITLE}

          ${ISSUE_BODY}

          Skill a ejecutar:
          ${SKILL_PROMPT}

          Genera el archivo de historia completo y escríbelo en: ${STORY_FILE}"

          MAX_RETRIES=2
          ATTEMPT=0
          SUCCESS=false

          while [ $ATTEMPT -le $MAX_RETRIES ]; do
            echo "Intento $((ATTEMPT+1)) de $((MAX_RETRIES+1))..."
            if gh copilot suggest --model claude-opus-4-5 "$PROMPT" > "$STORY_FILE" 2>&1; then
              if [ -s "$STORY_FILE" ]; then
                SUCCESS=true
                break
              fi
            fi
            ATTEMPT=$((ATTEMPT+1))
            if [ $ATTEMPT -le $MAX_RETRIES ]; then
              echo "Reintentando en 30 segundos..."
              sleep 30
            fi
          done

          if [ "$SUCCESS" = "false" ]; then
            gh issue comment "${ISSUE_NUMBER}" --body "❌ Falló la generación de historia (bmad-create-story) después de $((MAX_RETRIES+1)) intentos."
            exit 1
          fi

          echo "Story generada: ${STORY_FILE}"
          echo "story-file=${STORY_FILE}" >> "$GITHUB_OUTPUT"

      - name: Commit and push story
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add _bmad-output/implementation-artifacts/
          git commit -m "chore: generate story for issue #${ISSUE_NUMBER}"
          git push origin "$BRANCH"
```

### Archivos a Modificar
- `.github/workflows/issue-to-green.yml` — añadir job `create-story`

### Archivos a NO Modificar
- Apps, configs, código de la aplicación

---

## Dev Agent Record

### Debug Log
_Vacío — para uso del agente durante implementación_

### Completion Notes
_Vacío — para completar al finalizar_

### File List
_Lista de archivos creados/modificados al completar_

### Change Log
_Vacío — para completar al finalizar_
