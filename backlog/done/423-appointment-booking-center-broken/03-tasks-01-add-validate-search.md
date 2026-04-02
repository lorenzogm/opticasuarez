# Task 01: Add validateSearch to all cita routes

## Description

Add `validateSearch` to `/cita/centro`, `/cita/horario`, `/cita/contacto`, and `/cita/confirmacion` route definitions.

## Files to Modify

1. `apps/web/src/routes/cita/centro.tsx` — Add `validateSearch` for `{ type?: string }`
2. `apps/web/src/routes/cita/horario.tsx` — Add `validateSearch` for `{ type?: string, location?: string }`
3. `apps/web/src/routes/cita/contacto.tsx` — Add `validateSearch` for `{ type?: string, location?: string, date?: string, time?: string }`
4. `apps/web/src/routes/cita/confirmacion.tsx` — Add `validateSearch` for all params including `name`, `phone`, `age`, `email`, `notes`

## Pattern to Follow

```tsx
interface CentroSearch {
  type?: string;
}

export const Route = createFileRoute("/cita/centro")({
  validateSearch: (search: Record<string, unknown>): CentroSearch => ({
    type: typeof search.type === "string" ? search.type : undefined,
  }),
  // ... existing config
});
```

## Acceptance Criteria

- [ ] All 4 route files have `validateSearch` defined
- [ ] Search param types match what the components expect
- [ ] `pnpm check` passes
