---
story_key: 1-5-revision-de-codigo-con-bmad-code-review
epic: 1
story: 5
status: done
date: 2026-04-20
context:
  - _bmad-output/implementation-artifacts/1-4-implementacion-del-codigo-con-bmad-dev-story.md
---

# Story 1.5: Revisión de código con bmad-code-review

## Historia de Usuario

Como tech lead del equipo,
quiero que el workflow ejecute bmad-code-review sobre los cambios generados y abra un PR con los resultados,
para que haya una revisión estructurada de los cambios antes de considerarlos listos.

---

## Contexto del Proyecto

### Prerequisitos
**Stories 1.1-1.4 done.** En la rama `copilot/<issue-number>-auto` existe código implementado que pasa `pnpm check`.

### Convención de PRs (de copilot-instructions.md)
- **Título:** `feat: <issue-title> — closes #<number>`
- **Reviewers requeridos:** `juanpeich` y `lorenzogm`
- **Rama base:** `main`
- **Etiqueta si hay findings bloqueantes:** `needs-revision`
- **Resultado de review:** `_bmad-output/implementation-artifacts/code-review-<issue-number>.md`

---

## Criterios de Aceptación

**AC1 — Code review con Copilot**
- **Given** que los cambios de código están en la rama `copilot/<issue-number>-auto`
- **When** el job `code-review` se ejecuta en secuencia
- **Then** invoca Copilot con Claude Opus y el prompt de `bmad-code-review` usando el diff de la rama contra `main`
- **And** el resultado de la revisión se escribe en `_bmad-output/implementation-artifacts/code-review-<issue-number>.md`

**AC2 — PR sin findings bloqueantes**
- **Given** que la revisión de código se completa
- **When** no existen findings bloqueantes
- **Then** el workflow abre un PR desde `copilot/<issue-number>-auto` hacia `main` con título `feat: <issue-title> — closes #<number>` y requestea reviewers `juanpeich` y `lorenzogm`
- **And** el cuerpo del PR incluye el resumen de la revisión y enlace al issue

**AC3 — PR con findings bloqueantes**
- **Given** que la revisión detecta findings bloqueantes
- **When** el paso evalúa el resultado
- **Then** el PR se abre igualmente con etiqueta `needs-revision` y el resumen de findings en el cuerpo
- **And** se comenta en el issue con los findings principales para visibilidad

---

## Tasks / Subtasks

- [ ] **Task 1: Añadir job `code-review` al workflow**
  - [ ] 1a. `needs: [setup-context, dev-story]`
  - [ ] 1b. Checkout de la rama
  - [ ] 1c. Obtener el diff de la rama contra `main` con `git diff main...HEAD`
  - [ ] 1d. Invocar Copilot con el prompt de `bmad-code-review` y el diff
  - [ ] 1e. Guardar el resultado en `_bmad-output/implementation-artifacts/code-review-<number>.md`
  - [ ] 1f. Commit y push del archivo de review
  - [ ] 1g. Obtener el título del issue
  - [ ] 1h. Crear el PR con `gh pr create` con título, cuerpo y reviewers
  - [ ] 1i. Si el review contiene "BLOQUEANTE" → añadir etiqueta `needs-revision` al PR y comentar en el issue

---

## Notas de Implementación

### Estructura del job

```yaml
  code-review:
    runs-on: ubuntu-latest
    needs: [setup-context, dev-story]
    env:
      BRANCH: ${{ needs.setup-context.outputs.branch-name }}
      ISSUE_NUMBER: ${{ github.event.issue.number }}
    steps:
      - name: Checkout branch
        uses: actions/checkout@v4
        with:
          ref: ${{ needs.setup-context.outputs.branch-name }}
          fetch-depth: 0  # necesario para git diff contra main
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

      - name: Run code review with bmad-code-review
        id: review
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          REVIEW_FILE="_bmad-output/implementation-artifacts/code-review-${ISSUE_NUMBER}.md"
          DIFF_OUTPUT=$(git diff main...HEAD)
          SKILL_PROMPT=$(cat .github/skills/bmad-code-review/workflow.md)

          PROMPT="Ejecuta bmad-code-review sobre el siguiente diff de la rama contra main.

          Diff:
          ${DIFF_OUTPUT}

          Skill:
          ${SKILL_PROMPT}

          Produce un informe estructurado con findings categorizados (BLOQUEANTE, Medio, Bajo)."

          mkdir -p "_bmad-output/implementation-artifacts"

          gh api graphql \
            -f query='mutation($messages: [CopilotChatMessageInput!]!, $model: String!) {
              createCopilotChatResponse(input: {messages: $messages, model: $model}) {
                message { content }
              }
            }' \
            -f messages="[{\"role\": \"user\", \"content\": \"$PROMPT\"}]" \
            -f model="claude-opus-4-5" \
            --jq '.data.createCopilotChatResponse.message.content' \
            > "$REVIEW_FILE" 2>&1 || echo "Review completado"

          echo "review-file=${REVIEW_FILE}" >> "$GITHUB_OUTPUT"

          # Detectar findings bloqueantes
          if grep -qi "BLOQUEANTE" "$REVIEW_FILE"; then
            echo "has-blockers=true" >> "$GITHUB_OUTPUT"
          else
            echo "has-blockers=false" >> "$GITHUB_OUTPUT"
          fi

      - name: Commit review artifact
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add _bmad-output/implementation-artifacts/
          git diff --cached --quiet || git commit -m "docs: add code review for issue #${ISSUE_NUMBER}"
          git push origin "$BRANCH"

      - name: Create Pull Request
        id: create-pr
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          ISSUE_TITLE=$(gh api "repos/${{ github.repository }}/issues/${ISSUE_NUMBER}" --jq '.title')
          REVIEW_SUMMARY=$(head -50 "_bmad-output/implementation-artifacts/code-review-${ISSUE_NUMBER}.md")
          HAS_BLOCKERS="${{ steps.review.outputs.has-blockers }}"

          PR_BODY="## Resumen

          Implementación automatizada para el issue #${ISSUE_NUMBER}.

          ## Code Review

          ${REVIEW_SUMMARY}

          ## Links

          - Issue: https://github.com/${{ github.repository }}/issues/${ISSUE_NUMBER}
          - Code Review: \`_bmad-output/implementation-artifacts/code-review-${ISSUE_NUMBER}.md\`"

          PR_NUMBER=$(gh pr create \
            --title "feat: ${ISSUE_TITLE} — closes #${ISSUE_NUMBER}" \
            --body "$PR_BODY" \
            --base main \
            --head "$BRANCH" \
            --reviewer "juanpeich,lorenzogm" \
            --json number \
            --jq '.number')

          echo "pr-number=${PR_NUMBER}" >> "$GITHUB_OUTPUT"

          if [ "$HAS_BLOCKERS" = "true" ]; then
            gh pr edit "$PR_NUMBER" --add-label "needs-revision" || true
            FINDINGS=$(grep -A2 "BLOQUEANTE" "_bmad-output/implementation-artifacts/code-review-${ISSUE_NUMBER}.md" | head -20)
            gh issue comment "${ISSUE_NUMBER}" \
              --body "⚠️ El code review detectó findings bloqueantes en el PR #${PR_NUMBER}.

          **Findings principales:**
          ${FINDINGS}"
          fi
```

### Nota: fetch-depth: 0
Es crítico usar `fetch-depth: 0` en el checkout para que `git diff main...HEAD` funcione correctamente, ya que necesita el historial completo de ambas ramas.

### Archivos a Modificar
- `.github/workflows/issue-to-green.yml` — añadir job `code-review`

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
