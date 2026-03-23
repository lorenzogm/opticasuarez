import type { LoaderFunctionArgs } from 'react-router';
import { readFileSync } from 'fs';
import { join } from 'path';

export const loader = async ({ request: _request }: LoaderFunctionArgs) => {
  // Read the logo image file to serve as og-image
  const imagePath = join(process.cwd(), 'public', 'images', 'optica-suarez-logo.png');
  const imageBuffer = readFileSync(imagePath);

  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
};