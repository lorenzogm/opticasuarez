# Bug: Blog page prerendered as empty HTML

## Description

The `/blog` page returns HTTP 200 with `content-length: 0` — a completely empty HTML document. CSR navigation from the homepage works correctly, but any direct page load (SSR/prerendered) returns blank content.

## Reproduction Steps

1. Open https://opticasuarez-web-dev.vercel.app/blog directly (or `curl -sI`)
2. Page loads blank — no HTML, no nav, no content
3. Verify: `curl -sI https://opticasuarez-web-dev.vercel.app/blog` shows `content-length: 0`
4. Compare: navigate to `/blog` via nav click from homepage — content renders correctly via CSR

## Expected Behavior

The `/blog` page should render blog articles via SSR/prerendering with:
- A page title containing "Blog"
- An h1 heading
- A list of blog article cards with "Leer más" links
- Category filter tabs (desktop)

## Actual Behavior

The prerendered `/blog` HTML file is empty (0 bytes). The page shows nothing when loaded directly. Only CSR navigation from another page works.

## Failing Tests

- **File**: `apps/web-e2e/tests/blog-engagement.spec.ts`
  - **Test**: `click article from blog list (CSR)` — **TC-BLOG-02** — 30s timeout, no articles to click
  - **Test**: `blog article renders via SSR` — **TC-BLOG-03** — 30s timeout, no article links
  - **Test**: `blog category filter tabs are visible and interactive` — **TC-BLOG-04** — filter buttons not found
- **File**: `apps/web-e2e/tests/site-navigation.spec.ts`
  - **Test**: `navigate back to homepage via logo` — **TC-SNAV-05** — 30s timeout, no nav on empty page

## Error Output

```
curl -sI https://opticasuarez-web-dev.vercel.app/blog

HTTP/2 200
content-length: 0
etag: "d41d8cd98f00b204e9800998ecf8427e"
```

The etag is the MD5 hash of an empty string, confirming the prerendered file is 0 bytes.

## Investigation Notes

- The blog page renders correctly when navigated to client-side (CSR) from another page
- This suggests the prerendering/SSR process failed or produced empty output for `/blog`
- Possible causes: missing blog data during build, error in SSR that produces empty HTML silently, or prerender config issue
- Check `vite.config.ts` prerender settings and blog data fetching during build

## Priority

Critical — 4 E2E tests blocked, blog is a major site section
