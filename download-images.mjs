#!/usr/bin/env node

/**
 * Image Download Script for Óptica Suárez Homepage
 * Downloads optimized images for optical store website
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image configuration
const images = {
  hero: [
    {
      name: 'hero-main.jpg',
      url: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?auto=format&fit=crop&w=1920&q=80',
      description: 'Modern optical store interior with glasses display'
    },
    {
      name: 'hero-glasses-display.jpg', 
      url: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1920&q=80',
      description: 'Professional glasses display in optical store'
    },
    {
      name: 'hero-eye-exam.jpg',
      url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1920&q=80',
      description: 'Eye examination equipment and professional service'
    }
  ],
  
  services: [
    {
      name: 'vision-binocular.jpg',
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
      description: 'Binocular vision examination'
    },
    {
      name: 'terapia-visual.jpg',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80',
      description: 'Visual therapy session'
    },
    {
      name: 'contactologia.jpg',
      url: 'https://images.unsplash.com/photo-1509909756405-be0199881695?auto=format&fit=crop&w=800&q=80',
      description: 'Contact lens fitting and care'
    },
    {
      name: 'vision-pediatrica.jpg',
      url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
      description: 'Pediatric vision care'
    },
    {
      name: 'control-miopia.jpg',
      url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      description: 'Myopia control treatment'
    }
  ],

  products: [
    {
      name: 'monturas-elegantes.jpg',
      url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      description: 'Elegant eyeglass frames collection'
    },
    {
      name: 'gafas-sol.jpg',
      url: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80',
      description: 'Sunglasses collection'
    },
    {
      name: 'lentillas.jpg',
      url: 'https://images.unsplash.com/photo-1634729108541-516d94914145?auto=format&fit=crop&w=800&q=80',
      description: 'Contact lenses'
    },
    {
      name: 'monturas-titanio.jpg',
      url: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?auto=format&fit=crop&w=800&q=80',
      description: 'Premium titanium frames'
    }
  ],

  about: [
    {
      name: 'equipo-profesional.jpg',
      url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
      description: 'Professional optical team'
    },
    {
      name: 'tecnologia-avanzada.jpg',
      url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80',
      description: 'Advanced optical technology'
    },
    {
      name: 'taller-montaje.jpg',
      url: 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?auto=format&fit=crop&w=800&q=80',
      description: 'Professional lens mounting workshop'
    }
  ],

  logos: [
    {
      name: 'optica-suarez-logo.svg',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSIxMCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMwMDY2Q0MiPsOTcHRpY2E8L3RleHQ+Cjx0ZXh0IHg9IjEwIiB5PSI3MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjMDA2NkNDIj5TdcOhcmV6PC90ZXh0Pgo8L3N2Zz4K',
      description: 'Óptica Suárez logo placeholder'
    }
  ]
};

// Ensure directories exist
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Download function
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

// Handle SVG data URLs
const saveSvgDataUrl = (dataUrl, filepath) => {
  return new Promise((resolve, reject) => {
    try {
      const base64Data = dataUrl.split(',')[1];
      const svgContent = Buffer.from(base64Data, 'base64').toString('utf-8');
      fs.writeFileSync(filepath, svgContent);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// Main download function
const downloadImages = async () => {
  const baseDir = path.join(__dirname, 'src', 'assets', 'images');
  
  console.log('🖼️  Starting image download for Óptica Suárez homepage...\n');

  for (const [category, imageList] of Object.entries(images)) {
    const categoryDir = path.join(baseDir, category);
    ensureDirectoryExists(categoryDir);
    
    console.log(`📁 Downloading ${category} images...`);
    
    for (const image of imageList) {
      const filepath = path.join(categoryDir, image.name);
      
      try {
        if (image.url.startsWith('data:')) {
          await saveSvgDataUrl(image.url, filepath);
        } else {
          await downloadImage(image.url, filepath);
        }
        console.log(`   ✅ ${image.name} - ${image.description}`);
      } catch (error) {
        console.log(`   ❌ Failed to download ${image.name}: ${error.message}`);
      }
    }
    console.log('');
  }

  // Create an images manifest file
  const manifestPath = path.join(baseDir, 'images-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(images, null, 2));
  
  console.log('📋 Created images manifest file');
  console.log('🎉 Image download completed!');
  console.log('\n📂 Images organized in:');
  console.log(`   - Hero images: src/assets/images/hero/`);
  console.log(`   - Service images: src/assets/images/services/`);
  console.log(`   - Product images: src/assets/images/products/`);
  console.log(`   - About images: src/assets/images/about/`);
  console.log(`   - Logos: src/assets/images/logos/`);
};

// Run the download
downloadImages().catch(console.error);
