# Sitemap Generation

This project automatically generates a sitemap.xml file during the build process for Google Search Console and other search engines.

## How it works

1. **Automatic Generation**: The sitemap is generated automatically every time you run `npm run build`
2. **Route Discovery**: The script reads all routes from the existing React Router configuration
3. **SEO Optimization**: URLs are prioritized based on their importance:
   - Homepage (`/`): Priority 1.0, weekly updates
   - Blog index (`/blog`): Priority 0.9, weekly updates
   - Blog posts (`/blog/*`): Priority 0.7, monthly updates
   - Service pages: Priority 0.8, monthly updates

## Generated Files

- **Production**: `build/client/sitemap.xml` - Deployed with the website
- **Development**: `public/sitemap.xml` - Available during development

## Sitemap URL

Once deployed, the sitemap will be accessible at:
**https://opticasuarezjaen.es/sitemap.xml**

## Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (opticasuarezjaen.es)
3. Navigate to "Sitemaps" in the left sidebar
4. Add the sitemap URL: `https://opticasuarezjaen.es/sitemap.xml`
5. Click "Submit"

## Maintenance

The sitemap is automatically updated when:

- New routes are added to `react-router.config.ts`
- New blog posts are added
- The build process runs

No manual maintenance is required!

## Current URLs Included

The sitemap currently includes 18 URLs:

- Homepage and main navigation pages
- All service pages (vision-deportiva, control-de-miopia, etc.)
- Blog index and all blog post pages
- Contact page

## Technical Details

- **Format**: XML Sitemap Protocol 0.9
- **Generation Script**: `scripts/generate-sitemap.js`
- **Integrated into**: Build process (`npm run build`)
- **Domain**: https://opticasuarezjaen.es
