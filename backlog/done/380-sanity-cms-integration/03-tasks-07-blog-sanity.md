# Task 07 — Blog listing + detail → Sanity (Portable Text)

## Goal
Replace the filesystem-based blog system with Sanity. Blog posts use Portable Text for rich content instead of Markdown.

## Steps

1. Update `routes/blog/index.tsx`:
   - Add `loader()` calling `getBlogPosts()` with optional category filter
   - SEO meta from Sanity

2. Update `routes/blog/$slug.tsx`:
   - Add `loader()` calling `getBlogPost(slug)`
   - Dynamic SEO meta from post data

3. Update `pages/blog/blog.tsx`:
   - Remove any blog utility imports
   - Accept Sanity blog data via loader

4. Update `pages/blog/blog-post.tsx`:
   - Render Portable Text body content (add `@portabletext/react` dependency)
   - Featured image from Sanity CDN
   - Categories, author, date from Sanity fields

5. Add `@portabletext/react` dependency to `apps/web/package.json`

## Acceptance Criteria
- [ ] Blog listing shows all 12 posts from Sanity
- [ ] Blog detail renders Portable Text body correctly
- [ ] Category filtering works
- [ ] No `gray-matter` or `fs` usage for blog
- [ ] `pnpm check` passes
