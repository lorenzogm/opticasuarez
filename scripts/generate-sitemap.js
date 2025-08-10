#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the root directory (one level up from scripts)
const rootDir = join(__dirname, '..');

// Define all routes based on the prerender output we saw during build
const routes = [
  '/',
  '/blog',
  '/quienes-somos', 
  '/servicios',
  '/vision-deportiva',
  '/control-de-miopia',
  '/vision-pediatrica',
  '/terapia-visual',
  '/contactologia',
  '/examen-visual',
  '/contacto',
  '/blog/control-miopia-ninos-adolescentes',
  '/blog/vision-pediatrica-problemas-visuales-infancia',
  '/blog/lentes-contacto-guia-completa-usuarios',
  '/blog/terapia-visual-rehabilitacion-funcion-visual',
  '/blog/ortoqueratologia-nocturna-vision-sin-gafas',
  '/blog/importancia-examenes-visuales-regulares',
  '/blog/protege-tus-ojos-del-sol',
];

function generateSitemap() {
  try {
    const baseUrl = 'https://opticasuarezjaen.es';
    const currentDate = new Date().toISOString();
    
    // Create XML sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add each route to the sitemap
    routes.forEach(route => {
      // Determine priority based on route
      let priority = '0.8'; // default priority
      let changefreq = 'weekly'; // default change frequency
      
      if (route === '/') {
        priority = '1.0';
        changefreq = 'weekly';
      } else if (route.startsWith('/blog/')) {
        priority = '0.7';
        changefreq = 'monthly';
      } else if (route === '/blog') {
        priority = '0.9';
        changefreq = 'weekly';
      } else {
        priority = '0.8';
        changefreq = 'monthly';
      }

      sitemap += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    // Write sitemap to build/client directory
    const buildClientDir = join(rootDir, 'build', 'client');
    const sitemapPath = join(buildClientDir, 'sitemap.xml');
    
    writeFileSync(sitemapPath, sitemap, 'utf8');
    
    console.log(`✓ Sitemap generated successfully at ${sitemapPath}`);
    console.log(`✓ Included ${routes.length} URLs in sitemap`);
    
    // Also write to public directory for development
    const publicSitemapPath = join(rootDir, 'public', 'sitemap.xml');
    writeFileSync(publicSitemapPath, sitemap, 'utf8');
    console.log(`✓ Sitemap also saved to ${publicSitemapPath} for development`);
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();