# READBEFORE — Context for DEV subagent

## Item Summary

Bug #423: The appointment booking flow breaks at center selection because TanStack Router search params are not validated, causing the `type` param to be empty and filtering out all location options.

## Key Decisions

- Add `validateSearch` following the `/tienda` route pattern
- Each route validates only the params it receives from the prior step
- Type-safe search param interfaces per route

## File Paths Involved

- `apps/web/src/routes/cita/centro.tsx` — needs `validateSearch` for `type`
- `apps/web/src/routes/cita/horario.tsx` — needs `validateSearch` for `type`, `location`
- `apps/web/src/routes/cita/contacto.tsx` — needs `validateSearch` for `type`, `location`, `date`, `time`
- `apps/web/src/routes/cita/confirmacion.tsx` — needs `validateSearch` for all params including contact fields
- `apps/web/src/components/book/location-selection.tsx` — update `useSearch` to use typed search (remove `strict: false`)

## Reference Pattern

From `apps/web/src/routes/tienda/index.tsx`:
```tsx
interface TiendaSearch {
  q?: string;
  categoria?: string;
}

export const Route = createFileRoute("/tienda/")({
  validateSearch: (search: Record<string, unknown>): TiendaSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    categoria: typeof search.categoria === "string" ? search.categoria : undefined,
  }),
  // ...
});
```

## Preflight

Run `pnpm check` from monorepo root to validate all changes.
