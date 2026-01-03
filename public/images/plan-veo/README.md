# Plan VEO Images - Download Instructions

This document contains instructions for downloading and processing the images for the Plan VEO page.

## Images to Download

All images need to be downloaded from the provided Google Drive links, converted to WebP format, and placed in this directory (`public/images/plan-veo/`).

### 1. Hero Section Image
- **Filename**: `plan-veo-hero.webp`
- **Google Drive Link**: https://drive.google.com/file/d/1Ro-FUmstuUbN554Z9tzX0uDEePjlRhF5/view?usp=sharing
- **Usage**: Main hero section image (top of the page)
- **Alt Text**: "Plan VEO en Jaén - Ayuda para gafas y lentillas infantiles"
- **Recommended Size**: Max width 1200px

### 2. Benefits Section Images

#### Image 1: Gafas Graduadas
- **Filename**: `gafas-graduadas-plan-veo.webp`
- **Google Drive Link**: https://drive.google.com/file/d/1AzYVWVQP_EGXTo6yzbG5P9UFhFXSt83V/view?usp=sharing
- **Usage**: Benefits section - Gafas Graduadas card
- **Alt Text**: "Gafas graduadas para niños con Plan VEO en Jaén"
- **Recommended Size**: 600x400px (aspect ratio 3:2)

#### Image 2: Lentillas
- **Filename**: `lentillas-plan-veo.webp`
- **Google Drive Link**: https://drive.google.com/file/d/1tLch0U_sIEz9djE9zOTNsw7jasIJ0yYj/view?usp=sharing
- **Usage**: Benefits section - Lentes de Contacto card
- **Alt Text**: "Lentillas para adolescentes con Plan VEO en Jaén"
- **Recommended Size**: 600x400px (aspect ratio 3:2)

#### Image 3: Solución de Mantenimiento
- **Filename**: `solucion-lentillas-plan-veo.webp`
- **Google Drive Link**: https://drive.google.com/file/d/1UnFr4QGmfBgtDSHtR3Jl1R7Lf-rfhP9m/view?usp=sharing
- **Usage**: Benefits section - Solución de Mantenimiento card
- **Alt Text**: "Solución de mantenimiento para lentillas incluida en Plan VEO"
- **Recommended Size**: 600x400px (aspect ratio 3:2)

### 3. Optional Additional Image
- **Google Drive Link**: https://drive.google.com/file/d/1hSBbYrOfdJFem70E6en5z3vyceWYjlu2/view?usp=sharing
- **Usage**: Can be used for additional sections if needed
- **Note**: This image is currently not referenced in the page but can be added later

## Processing Steps

### Step 1: Download Images
1. Click on each Google Drive link
2. Click "Download" to save the image to your local computer
3. Note the original filename and format

### Step 2: Convert to WebP Format
You can use any of the following methods:

#### Option A: Using cwebp (Command Line)
```bash
# Install cwebp (if not already installed)
# On macOS: brew install webp
# On Ubuntu/Debian: sudo apt-get install webp

# Convert JPG/PNG to WebP
cwebp -q 85 input-image.jpg -o plan-veo-hero.webp
```

#### Option B: Using Online Tools
- Visit https://cloudconvert.com/jpg-to-webp
- Upload the image
- Convert to WebP format
- Download the converted file

#### Option C: Using Image Editing Software
- Open the image in Photoshop, GIMP, or another image editor
- Export/Save As WebP format with quality setting around 85%

### Step 3: Resize Images (if needed)
Ensure images are appropriately sized for web display:
- Hero image: Max width 1200px
- Benefits section images: 600x400px (or maintain 3:2 aspect ratio)

### Step 4: Rename and Place Files
1. Rename each converted WebP file according to the filenames listed above
2. Place all files in the `public/images/plan-veo/` directory
3. Remove the `.gitkeep` file once images are in place

## Verification

After placing the images, verify they work correctly by:
1. Running `npm run build` to ensure no build errors
2. Starting the development server with `npm run dev`
3. Navigating to http://localhost:5173/planveo
4. Checking that all images load correctly on desktop, tablet, and mobile views

## Image Optimization Tips

- **Quality**: WebP quality of 80-85% is recommended for good balance between size and quality
- **Responsive**: Images should look good on all screen sizes (desktop, tablet, mobile)
- **File Size**: Try to keep each image under 200KB for optimal performance
- **Alt Text**: Already configured in the content JSON file for SEO purposes

## Troubleshooting

### Images Not Showing
- Check that filenames exactly match those specified (case-sensitive)
- Verify images are in the correct directory: `public/images/plan-veo/`
- Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Build Errors
- Ensure all images are properly formatted WebP files
- Check file permissions (should be readable)
- Verify no special characters in filenames

## Contact

If you encounter any issues with image downloading or processing, please contact the development team or the project owner.
