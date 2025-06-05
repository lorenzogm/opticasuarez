#!/usr/bin/env node

/**
 * Real Óptica Suárez Image Download Script
 * Downloads actual images from the real Óptica Suárez website
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Real images from Óptica Suárez website (corrected URL)
const realImages = [
  {
    name: 'logo_vector_transparente.png',
    url: 'https://media.v2.siweb.es/uploaded_thumb_small/a57aaa5c420fd0bd0f0d9e3ffabce143/logo_vector_transparente.png',
    description: 'Óptica Suárez official logo (transparent vector)',
    category: 'branding'
  },
  {
    name: 'optica_bulevar.jpg',
    url: 'https://media.v2.siweb.es/uploaded_thumb_small/a57aaa5c420fd0bd0f0d9e3ffabce143/optica_bulevar.jpg',
    description: 'Óptica Suárez Bulevar store facade',
    category: 'store'
  },
  {
    name: 'bar_fenix_32.jpg',
    url: 'https://media.v2.siweb.es/uploaded_thumb_small/a57aaa5c420fd0bd0f0d9e3ffabce143/bar_fenix_32.jpg',
    description: 'Óptica Suárez Centro store facade (Plaza de la Estación)',
    category: 'store'
  },
  {
    name: 'logos_kitdigital_2024.png',
    url: 'https://media.v2.siweb.es/uploaded_thumb_icon/a57aaa5c420fd0bd0f0d9e3ffabce143/logos_kitdigital_2024.png',
    description: 'Kit Digital collaboration logos',
    category: 'partners'
  }
];

// Ensure directories exist
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Download function with better error handling
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    const request = https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        return downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`   ✅ Downloaded ${path.basename(filepath)} (${response.headers['content-length'] || 'unknown'} bytes)`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
    
    // Set timeout
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
};

// Main download function
const downloadRealImages = async () => {
  const baseDir = path.join(__dirname, 'src', 'assets', 'images', 'real-optica-suarez');
  ensureDirectoryExists(baseDir);
  
  console.log('🖼️  Downloading real images from Óptica Suárez website...\n');

  let successCount = 0;
  let failCount = 0;

  for (const image of realImages) {
    const filepath = path.join(baseDir, image.name);
    
    try {
      console.log(`📥 Downloading ${image.name}...`);
      await downloadImage(image.url, filepath);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Failed to download ${image.name}: ${error.message}`);
      failCount++;
    }
  }

  console.log('\n📊 Download Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📁 Saved to: ${baseDir}`);

  // Create metadata file
  const metadataPath = path.join(baseDir, 'real-images-metadata.json');
  const metadata = {
    downloadDate: new Date().toISOString(),
    source: 'https://opticasuarezjaen.com',
    images: realImages.map(img => ({
      ...img,
      localPath: path.join(baseDir, img.name),
      downloaded: fs.existsSync(path.join(baseDir, img.name))
    }))
  };
  
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`\n📋 Created metadata file: real-images-metadata.json`);
  
  if (successCount > 0) {
    console.log('\n🎉 Real images from Óptica Suárez downloaded successfully!');
    console.log('💡 Next steps:');
    console.log('   1. Review the downloaded images');
    console.log('   2. Replace placeholder images in components');
    console.log('   3. Update image imports in your React components');
  }
};

// Run the download
downloadRealImages().catch(console.error);
