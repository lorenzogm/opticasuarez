# Task 01 — Add ecommerce flag to Sanity schema

## Description

Add the `ecommerce` boolean field to the `featureFlags` object in the Sanity `siteSettings` schema.

## Files to Modify

- `apps/sanity-studio/schemas/documents/site-settings.ts`

## Implementation

In the `featureFlags` field's `fields` array (after `shopEnabled`), add:

```typescript
defineField({
  name: "ecommerce",
  title: "Ecommerce habilitado",
  type: "boolean",
  description: "Habilitar carrito, checkout y pagos",
  initialValue: false,
}),
```

## Notes

- The GROQ query in `sanity.ts` already projects the full `featureFlags` object, so no query change is required — the new field will be included automatically.

## Acceptance Criteria

- [ ] `featureFlags.ecommerce` field exists in Sanity schema with type `boolean` and default `false`
- [ ] `pnpm check` passes
