# Context for DEV — Ecommerce #389

## Item Summary
Implement full ecommerce flow: cart, checkout, Redsys payments, shipping options, order storage, emails.

## Key Decisions
- Cart: React Context + localStorage (no server)
- Orders: Sanity document type
- Payments: Redsys redirect mode (card data never on our server)
- Auth: Guest checkout only (no user accounts for MVP)
- Emails: Resend (existing setup)
- Feature gate: `ecommerce` flag (already in feature-flags.ts)

## Project Conventions (CRITICAL)
- File names: **kebab-case** always
- Components: **PascalCase** names
- Data fetching: **createServerFn** only (never fetch Sanity from client)
- New shop routes: MUST check `featureFlags.ecommerce` in loader
- Input validation: `.trim().slice(0, maxLen)` on all POST inputs
- Tailwind for styling, `cn()` for class merging
- HEAD meta: use `buildHeadFromSanitySeo()` with Spanish fallback text
- No `any` types, no `@ts-ignore`, no `console.log`

## Existing Patterns to Follow
- **Email actions**: See `apps/web/src/actions/submit-product-inquiry.ts`
- **Multi-step flow**: See `apps/web/src/routes/cita/` (layout + nested routes)
- **Server routes (webhook)**: See `apps/web/server/routes/api/revalidate.post.ts` (HMAC verification)
- **Feature flags**: See `apps/web/src/lib/feature-flags.ts`
- **Product data**: See `apps/web/src/lib/sanity.ts` (getProducts, getProduct)

## Sanity Client
- Import from `~/lib/sanity`
- Use `resolveImage()` for image URLs
- Create operations use `sanityWriteClient` (needs to be created or use mutation API)

## Test Infrastructure
- Vitest + @testing-library/react
- Test file convention: `*.test.ts` or `*.test.tsx` colocated
- Existing test examples: `apps/web/src/actions/submit-product-inquiry.test.ts`

## Preflight
```bash
pnpm check
```
Must pass before marking any task complete.
