---
story_key: 1-4-implementacion-del-codigo-con-bmad-dev-story
epic: 1
story: 4
status: done
date: 2026-04-20
context:
  - _bmad-output/implementation-artifacts/1-3-generacion-de-tests-e2e-con-bmad-qa-generate-e2e-tests.md
---

# Story 1.4: Implementación del código con bmad-dev-story

## Historia de Usuario

Como desarrollador del equipo,
quiero que el workflow ejecute bmad-dev-story para implementar el código descrito en la historia,
para que los cambios de código se generen automáticamente alineados con la arquitectura del proyecto.

---

## Contexto del Proyecto

### Prerequisitos
**Stories 1.1, 1.2, 1.3 done.** En la rama `copilot/<issue-number>-auto` existen:
- `_bmad-output/implementation-artifacts/story-<issue-number>.md`
- `apps/web-e2e/tests/issue-<issue-number>/issue-<issue-number>.spec.ts`

### Quality Gate
```bash
pnpm check  # types + linter + build (desde la raíz del monorepo)
```

### Context File Importante
- `_bmad-output/project-context.md` — reglas críticas del proyecto para el LLM

---

## Criterios de Aceptación

**AC1 — Invocación de Copilot con dev-story**
- **Given** que la historia (Story 1.2) y los tests E2E (Story 1.3) existen en la rama
- **When** el job `dev-story` se ejecuta en secuencia
- **Then** invoca Copilot con Claude Opus y el prompt de `bmad-dev-story` usando la historia y el contexto del proyecto (`_bmad-output/project-context.md`)
- **And** los archivos de código generados o modificados se persisten en la rama con mensajes de commit descriptivos

**AC2 — pnpm check pasa**
- **Given** que la implementación se genera correctamente
- **When** se ejecuta `pnpm check` desde la raíz del monorepo tras los cambios
- **Then** el comando pasa sin errores (types + linter + build)
- **And** el paso concluye con exit code 0

**AC3 — Fallo de pnpm check**
- **Given** que `pnpm check` falla tras la implementación
- **When** el paso detecta errores de tipos, linter o build
- **Then** el workflow registra los errores en el log y falla el job con el resumen de errores
- **And** comenta en el issue indicando qué checks fallaron

---

## Tasks / Subtasks

- [ ] **Task 1: Añadir job `dev-story` al workflow**
  - [ ] 1a. `needs: [setup-context, generate-e2e-tests]`
  - [ ] 1b. Checkout de la rama con historia y tests E2E presentes
  - [ ] 1c. Setup pnpm + Node 22 + `pnpm install`
  - [ ] 1d. Leer historia y project-context como inputs del prompt
  - [ ] 1e. Invocar Copilot con Claude Opus y el prompt de `bmad-dev-story`
  - [ ] 1f. Hacer commit de los archivos generados/modificados
  - [ ] 1g. Ejecutar `pnpm check` desde la raíz
  - [ ] 1h. Si `pnpm check` falla → comentar en issue con errores y fallar el job
  - [ ] 1i. Si `pnpm check` pasa → push a la rama

---

## Notas de Implementación

### Estructura del job

```yaml
  dev-story:
    runs-on: ubuntu-latest
    needs: [setup-context, generate-e2e-tests]
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

      - name: Implement code with bmad-dev-story
        id: dev-story
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          DOTENV_PRIVATE_KEY: ${{ secrets.DOTENV_PRIVATE_KEY }}
        run: |
          STORY_FILE="_bmad-output/implementation-artifacts/story-${ISSUE_NUMBER}.md"
          PROJECT_CONTEXT="_bmad-output/project-context.md"
          SKILL_PROMPT=$(cat .github/skills/bmad-dev-story/workflow.md)
          STORY_CONTENT=$(cat "$STORY_FILE")
          PROJECT_CTX=$(cat "$PROJECT_CONTEXT")

          PROMPT="Ejecuta bmad-dev-story para implementar el código del siguiente issue.
          Contexto del proyecto: ${PROJECT_CTX}
          Historia: ${STORY_CONTENT}
          Skill: ${SKILL_PROMPT}
          Implementa el código necesario. Modifica únicamente los archivos requeridos."

          gh api graphql \
            -f query='...' \
            -f model="claude-opus-4-5" > /dev/null 2>&1 || true
          # Nota: La invocación real de Copilot coding agent ocurre via la asignación del issue

      - name: Commit generated code
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add -A
          git diff --cached --quiet || git commit -m "feat: implement code for issue #${ISSUE_NUMBER}"
          git push origin "$BRANCH"

      - name: Run quality gate
        env:
          DOTENV_PRIVATE_KEY: ${{ secrets.DOTENV_PRIVATE_KEY }}
        run: |
          if ! pnpm check 2>&1 | tee /tmp/check-output.txt; then
            ERRORS=$(cat /tmp/check-output.txt | tail -50)
            gh issue comment "${ISSUE_NUMBER}" \
              --body "❌ pnpm check falló tras implementación de dev-story.
              Errores:
              \`\`\`
              ${ERRORS}
              \`\`\`"
            exit 1
          fi
          echo "✅ pnpm check passed"
```

### Archivos a Modificar
- `.github/workflows/issue-to-green.yml` — añadir job `dev-story`

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
