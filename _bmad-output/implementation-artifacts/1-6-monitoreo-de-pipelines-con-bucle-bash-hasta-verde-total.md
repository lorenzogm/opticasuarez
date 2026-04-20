---
story_key: 1-6-monitoreo-de-pipelines-con-bucle-bash-hasta-verde-total
epic: 1
story: 6
status: done
date: 2026-04-20
context:
  - _bmad-output/implementation-artifacts/1-5-revision-de-codigo-con-bmad-code-review.md
---

# Story 1.6: Monitoreo de pipelines con bucle Bash hasta verde total

## Historia de Usuario

Como desarrollador del equipo,
quiero que el workflow monitorice en bucle todos los checks del PR (incluyendo los nuevos tests E2E) hasta que todos pasen o se detecte un fallo terminal,
para que el ciclo se cierre automáticamente solo cuando el CI está completamente en verde.

---

## Contexto del Proyecto

### Prerequisito
**Stories 1.1-1.5 done.** El job `code-review` ha abierto el PR y tiene el output `pr-number`.

### Variables de Entorno Configurables
- `PIPELINE_TIMEOUT_MINUTES` — timeout del bucle, default: 30
- Intervalo de polling: 60 segundos

### Comandos GitHub CLI relevantes
```bash
gh pr checks <pr-number>   # Lista todos los checks del PR con su estado
gh issue comment ...       # Comentar en el issue
```

### Estados de checks
- `pending`, `queued`, `in_progress` → esperar
- `success` → PASS
- `failure`, `cancelled`, `timed_out`, `stale` → FAIL terminal

---

## Criterios de Aceptación

**AC1 — Bucle Bash de polling**
- **Given** que el PR ha sido abierto (Story 1.5 completa) y los checks de CI han arrancado
- **When** el job `monitor-pipelines` se ejecuta
- **Then** ejecuta un bucle Bash que consulta `gh pr checks <pr-number>` cada 60 segundos
- **And** el bucle distingue estados: `pending/queued/in_progress` (continúa esperando), `success` (PASS), `failure/cancelled/timed_out` (FAIL terminal)

**AC2 — PASS global → comentar en issue**
- **Given** que el bucle detecta que todos los checks están en `success`
- **When** se alcanza PASS global
- **Then** el bucle termina con exit code 0
- **And** el workflow comenta en el issue: "✅ CI en verde — PR #<number> listo para revisión" con enlace al PR y resumen de checks

**AC3 — FAIL terminal → comentar en issue**
- **Given** que algún check pasa a estado `failure`
- **When** el bucle detecta FAIL terminal
- **Then** el bucle termina con exit code 1
- **And** el workflow comenta en el issue: "❌ CI falló en check `<nombre>` — PR #<number>" con enlace al run fallido

**AC4 — Timeout configurable**
- **Given** que el bucle ha estado esperando más de 30 minutos sin resolución
- **When** se supera el timeout global
- **Then** el job falla con mensaje "Timeout de monitoreo superado (30 min)" y comenta en el issue para revisión manual
- **And** el timeout del bucle es configurable vía variable de entorno `PIPELINE_TIMEOUT_MINUTES` (default: 30)

---

## Tasks / Subtasks

- [ ] **Task 1: Añadir job `monitor-pipelines` al workflow**
  - [ ] 1a. `needs: [setup-context, code-review]`
  - [ ] 1b. Obtener el `pr-number` del output del job `code-review`
  - [ ] 1c. Implementar bucle Bash con `while true`
  - [ ] 1d. Consultar `gh pr checks` cada 60 segundos
  - [ ] 1e. Parsear estados: si hay algún `failure/cancelled/timed_out/stale` → FAIL
  - [ ] 1f. Si todos son `success` → PASS y exit 0
  - [ ] 1g. Si ninguno de los anteriores → seguir esperando
  - [ ] 1h. Implementar timeout calculado desde `PIPELINE_TIMEOUT_MINUTES`
  - [ ] 1i. Comentar en el issue según resultado (✅ verde o ❌ fallo)

---

## Notas de Implementación

### Lógica del bucle

```bash
TIMEOUT_MINUTES="${PIPELINE_TIMEOUT_MINUTES:-30}"
START_TIME=$(date +%s)
TIMEOUT_SECONDS=$((TIMEOUT_MINUTES * 60))

while true; do
  ELAPSED=$(( $(date +%s) - START_TIME ))
  if [ $ELAPSED -ge $TIMEOUT_SECONDS ]; then
    gh issue comment "$ISSUE_NUMBER" \
      --body "⏱️ Timeout de monitoreo superado (${TIMEOUT_MINUTES} min) — PR #${PR_NUMBER}. Revisión manual requerida."
    exit 1
  fi

  CHECK_OUTPUT=$(gh pr checks "$PR_NUMBER" --json name,state,conclusion 2>&1)

  # Verificar fallos terminales
  if echo "$CHECK_OUTPUT" | grep -qE '"conclusion":"(failure|cancelled|timed_out|stale)"'; then
    FAILED_CHECK=$(echo "$CHECK_OUTPUT" | \
      python3 -c "import sys,json; checks=json.load(sys.stdin); \
      failed=[c['name'] for c in checks if c.get('conclusion') in ('failure','cancelled','timed_out','stale')]; \
      print(failed[0] if failed else 'unknown')")
    gh issue comment "$ISSUE_NUMBER" \
      --body "❌ CI falló en check \`${FAILED_CHECK}\` — PR #${PR_NUMBER}. Ver: https://github.com/${{ github.repository }}/pull/${PR_NUMBER}/checks"
    exit 1
  fi

  # Verificar si todos pasan
  TOTAL=$(echo "$CHECK_OUTPUT" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))")
  PASSED=$(echo "$CHECK_OUTPUT" | python3 -c "import sys,json; checks=json.load(sys.stdin); print(sum(1 for c in checks if c.get('conclusion')=='success'))")

  if [ "$TOTAL" -gt 0 ] && [ "$PASSED" -eq "$TOTAL" ]; then
    gh issue comment "$ISSUE_NUMBER" \
      --body "✅ CI en verde — PR #${PR_NUMBER} listo para revisión. ${PASSED}/${TOTAL} checks pasados. Ver: https://github.com/${{ github.repository }}/pull/${PR_NUMBER}"
    exit 0
  fi

  echo "Esperando... ${PASSED}/${TOTAL} checks pasados (${ELAPSED}s / ${TIMEOUT_SECONDS}s)"
  sleep 60
done
```

### Nota: `gh pr checks` output
El comando `gh pr checks` devuelve una tabla en formato texto por defecto. Con `--json name,state,conclusion` devuelve JSON. Asegurarse de que `python3` esté disponible en el runner de Ubuntu (lo está por defecto).

### Archivos a Modificar
- `.github/workflows/issue-to-green.yml` — añadir job `monitor-pipelines`

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
