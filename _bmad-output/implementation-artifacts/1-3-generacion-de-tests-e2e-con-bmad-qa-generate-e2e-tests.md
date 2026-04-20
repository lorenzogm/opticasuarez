---
story_key: 1-3-generacion-de-tests-e2e-con-bmad-qa-generate-e2e-tests
epic: 1
story: 3
status: done
date: 2026-04-20
context:
  - _bmad-output/implementation-artifacts/1-2-generacion-de-historia-implementable-con-bmad-create-story.md
---

# Story 1.3: Generación de tests E2E con bmad-qa-generate-e2e-tests

## Historia de Usuario

Como QA del equipo,
quiero que el workflow ejecute bmad-qa-generate-e2e-tests usando la historia generada como contexto,
para que existan pruebas E2E específicas para los criterios de aceptación antes de implementar.

---

## Contexto del Proyecto

### Prerequisitos
**Story 1.1 y 1.2 están done.** El workflow tiene los jobs `setup-context` y `create-story`.
El job `create-story` produce `_bmad-output/implementation-artifacts/story-<issue-number>.md` en la rama.

### Stack E2E
- **Framework:** Playwright ^1.54.2
- **Ubicación de tests:** `apps/web-e2e/tests/`
- **Config:** `apps/web-e2e/playwright.config.ts`
- **Convención de archivos:** kebab-case, `.spec.ts` o `.ts`
- **Patrón Playwright:** `test('descripción', async ({ page }) => { ... })`
- **Skills disponibles:** `.github/skills/bmad-qa-generate-e2e-tests/`

### Convención de Directorio
Los tests para un issue específico van en: `apps/web-e2e/tests/issue-<issue-number>/`

---

## Criterios de Aceptación

**AC1 — Invocación de Copilot con qa-generate-e2e-tests**
- **Given** que la historia de la Story 1.2 existe en `_bmad-output/implementation-artifacts/story-<issue-number>.md`
- **When** el job `generate-e2e-tests` se ejecuta en secuencia después de `create-story`
- **Then** invoca Copilot con Claude Opus y el prompt de `bmad-qa-generate-e2e-tests` usando el archivo de historia como contexto
- **And** los tests E2E generados se escriben en `apps/web-e2e/tests/issue-<issue-number>/`

**AC2 — Validez de tests generados**
- **Given** que los tests E2E son generados
- **When** se persisten en la rama
- **Then** siguen la convención kebab-case del proyecto y son válidos para Playwright (`test('...', async ({ page }) => {}`)
- **And** el paso concluye con exit code 0 y el log muestra la ruta de los archivos generados

**AC3 — Manejo de fallos**
- **Given** que la generación de tests falla
- **When** el paso detecta ausencia de archivos o error de Copilot
- **Then** el workflow falla el job con mensaje "Falló generación de tests E2E" y comenta en el issue

---

## Tasks / Subtasks

- [ ] **Task 1: Añadir job `generate-e2e-tests` al workflow**
  - [ ] 1a. El job depende de `create-story` con `needs: create-story`
  - [ ] 1b. Checkout de la rama con el archivo de historia presente
  - [ ] 1c. Setup pnpm + Node 22
  - [ ] 1d. Leer el archivo de historia como contexto para el prompt
  - [ ] 1e. Invocar Copilot con el prompt de `bmad-qa-generate-e2e-tests` y la historia como contexto
  - [ ] 1f. Escribir los tests en `apps/web-e2e/tests/issue-<issue-number>/`
  - [ ] 1g. Verificar que se generó al menos un archivo `.spec.ts` no vacío
  - [ ] 1h. Loguear las rutas de los archivos generados
  - [ ] 1i. Commit y push a la rama

- [ ] **Task 2: Manejo de errores**
  - [ ] 2a. Si Copilot falla o no genera archivos → comentar en issue y fallar el job

---

## Notas de Implementación

### Estructura del job

```yaml
  generate-e2e-tests:
    runs-on: ubuntu-latest
    needs: create-story
    env:
      BRANCH: ${{ needs.setup-context.outputs.branch-name }}
      ISSUE_NUMBER: ${{ github.event.issue.number }}
    steps:
      - name: Checkout branch
        uses: actions/checkout@v4
        with:
          ref: ${{ needs.setup-context.outputs.branch-name }}
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

      - name: Generate E2E tests
        id: generate-tests
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          STORY_FILE="_bmad-output/implementation-artifacts/story-${ISSUE_NUMBER}.md"
          TESTS_DIR="apps/web-e2e/tests/issue-${ISSUE_NUMBER}"
          SKILL_PROMPT=$(cat .github/skills/bmad-qa-generate-e2e-tests/workflow.md)
          STORY_CONTENT=$(cat "$STORY_FILE")

          PROMPT="Ejecuta bmad-qa-generate-e2e-tests para generar tests E2E Playwright.
          Historia: ${STORY_CONTENT}
          Skill: ${SKILL_PROMPT}
          Genera archivos .spec.ts en: ${TESTS_DIR}/"

          mkdir -p "$TESTS_DIR"

          RESPONSE=$(gh api graphql \
            -f query='mutation($messages: [CopilotChatMessageInput!]!, $model: String!) {
              createCopilotChatResponse(input: {messages: $messages, model: $model}) {
                message { content }
              }
            }' \
            -f messages="[{\"role\": \"user\", \"content\": \"$PROMPT\"}]" \
            -f model="claude-opus-4-5" \
            --jq '.data.createCopilotChatResponse.message.content' 2>&1)

          if [ -z "$RESPONSE" ]; then
            gh issue comment "${ISSUE_NUMBER}" \
              --body "❌ Falló generación de tests E2E (bmad-qa-generate-e2e-tests)."
            exit 1
          fi

          echo "$RESPONSE" > "${TESTS_DIR}/issue-${ISSUE_NUMBER}.spec.ts"
          echo "Tests E2E generados en: ${TESTS_DIR}/"
          echo "tests-dir=${TESTS_DIR}" >> "$GITHUB_OUTPUT"

      - name: Commit and push E2E tests
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add apps/web-e2e/tests/
          git diff --cached --quiet || git commit -m "test: generate E2E tests for issue #${ISSUE_NUMBER}"
          git push origin "$BRANCH"
```

### Nota: needs encadenados
El job `generate-e2e-tests` necesita acceder al output `branch-name` de `setup-context`. Para acceder a outputs de jobs no directos en GitHub Actions, se debe declarar también como `needs: [setup-context, create-story]`.

### Archivos a Modificar
- `.github/workflows/issue-to-green.yml` — añadir job `generate-e2e-tests`

---

## Dev Agent Record

### Debug Log
_Vacío_

### Completion Notes
_Vacío_

### File List
_Vacío_

### Change Log
_Vacío_
