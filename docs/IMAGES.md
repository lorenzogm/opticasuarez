# Óptica Suárez - Images Documentation

## Overview
This document describes the images downloaded and organized for the Óptica Suárez homepage. All images are optimized for web use and organized by section.

## Directory Structure
```
src/assets/images/
├── hero/                 # Hero section background images
├── services/             # Service-specific images
├── products/             # Product showcase images
├── about/                # About section images
├── logos/                # Brand logos and identity
├── homepage/             # General homepage images
└── index.ts              # Image constants and exports
```

## Downloaded Images

### Hero Section (`/hero/`)
- **hero-main.jpg** - Main hero background (1920x1080)
  - Modern optical store interior with glasses display
- **hero-glasses-display.jpg** - Alternative hero image
  - Professional glasses display in optical store
- **hero-eye-exam.jpg** - Professional service image
  - Eye examination equipment and professional service

### Services Section (`/services/`)
- **vision-binocular.jpg** - Binocular vision examination
- **terapia-visual.jpg** - Visual therapy session
- **contactologia.jpg** - Contact lens fitting and care
- **vision-pediatrica.jpg** - Pediatric vision care
- **control-miopia.jpg** - Myopia control treatment

### Products Section (`/products/`)
- **monturas-elegantes.jpg** - Elegant eyeglass frames collection
- **gafas-sol.jpg** - Sunglasses collection
- **lentillas.jpg** - Contact lenses
- **monturas-titanio.jpg** - Premium titanium frames

### About Section (`/about/`)
- **equipo-profesional.jpg** - Professional optical team
- **tecnologia-avanzada.jpg** - Advanced optical technology
- **taller-montaje.jpg** - Professional lens mounting workshop

### Logos (`/logos/`)
- **optica-suarez-logo.svg** - Placeholder logo (SVG format)

## Usage

### Import Images in Components
```tsx
import { IMAGES, HERO_IMAGES, SERVICE_IMAGES } from '../../assets/images';

// Use specific image
const heroImage = HERO_IMAGES.main;

// Use in component
<img src={SERVICE_IMAGES.contactologia} alt="Contact lens service" />
```

### Using Services Data
```tsx
import { SERVICES_DATA } from '../../assets/images';

// Pre-configured service data with local images
const services = SERVICES_DATA;
```

### Background Images
```tsx
<div 
  style={{
    backgroundImage: `url('${HERO_IMAGES.main}')`
  }}
>
```

## Image Optimization

All images are:
- ✅ Optimized for web (JPEG compression)
- ✅ Properly sized for their use case
- ✅ Named with descriptive filenames
- ✅ Organized by section/purpose
- ✅ Include alt text descriptions

## Components Updated

The following components have been updated to use local images:

1. **Hero.tsx** - Now uses `HERO_IMAGES.main`
2. **Services.tsx** - Now uses `SERVICES_DATA` with local image paths

## Benefits of Local Images

- 🚀 **Faster Loading** - No external API calls
- 🔒 **Reliability** - No dependency on external services
- 📱 **Offline Support** - Works without internet
- 🎨 **Consistency** - Guaranteed image availability
- 💾 **Caching** - Better browser caching

## Next Steps

1. Replace any remaining external image URLs in other components
2. Consider adding WebP format for better compression
3. Implement lazy loading for images below the fold
4. Add responsive image sizes for different screen sizes

## Maintenance

To add new images:
1. Place image files in appropriate directory
2. Add constants to `src/assets/images/index.ts`
3. Update this documentation
4. Update component imports as needed

## File Sizes
- Hero images: ~200-400KB each
- Service images: ~50-150KB each
- Product images: ~50-150KB each
- Logo: <5KB (SVG)

Total size: ~2-3MB for all images combined
