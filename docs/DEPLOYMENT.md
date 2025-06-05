# 🚀 GitHub Pages Deployment Guide

## Overview
This guide explains how to deploy your Óptica Suárez React app to GitHub Pages using GitHub Actions.

## Setup Instructions

### 1. Repository Setup
Ensure your code is pushed to a GitHub repository named `opticasuarez`.

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**
4. The deployment workflow will be automatically detected

### 3. Repository Settings
Make sure the repository has the correct name structure:
- Repository name: `opticasuarez`
- Your site will be available at: `https://yourusername.github.io/opticasuarez/`

## Workflow Details

### Automatic Deployment
The workflow (`/.github/workflows/deploy.yml`) automatically:
- ✅ Triggers on pushes to the `main` branch
- ✅ Installs Node.js dependencies
- ✅ Runs ESLint to check code quality
- ✅ Builds the production version
- ✅ Deploys to GitHub Pages

### Manual Deployment
You can also trigger deployment manually:
1. Go to **Actions** tab in your GitHub repository
2. Select **Deploy to GitHub Pages**
3. Click **Run workflow**

## Configuration Files

### 1. Workflow File
**Location**: `/.github/workflows/deploy.yml`
- Defines the CI/CD pipeline
- Handles building and deployment
- Uses Node.js 20 for stability

### 2. Vite Configuration
**Location**: `/vite.config.ts`
- Sets correct base path for GitHub Pages
- Configures build output directory
- Handles asset management

### 3. Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

## Image Handling
Images are now properly configured for GitHub Pages:
- ✅ Uses Vite's asset handling system
- ✅ Automatic optimization and hashing
- ✅ Proper base path resolution
- ✅ TypeScript support for image imports

## Deployment Process

### What Happens When You Push:
1. **Trigger**: Push to `main` branch
2. **Build Job**:
   - Checkout code
   - Setup Node.js 20
   - Install dependencies with `npm ci`
   - Run linting with `npm run lint`
   - Build project with `npm run build`
   - Upload build artifacts

3. **Deploy Job**:
   - Deploy to GitHub Pages
   - Make site available at your URL

### Build Output
- **Directory**: `/dist`
- **Assets**: Optimized and hashed filenames
- **Images**: Processed through Vite's asset pipeline

## Troubleshooting

### Common Issues

#### 1. 404 Errors for Images
**Problem**: Images not loading on GitHub Pages
**Solution**: Use proper image imports (already configured)

#### 2. Wrong Base Path
**Problem**: Assets loading from wrong URLs
**Solution**: Vite config sets correct base path automatically

#### 3. Build Failures
**Problem**: Workflow fails during build
**Check**:
- ESLint errors in the code
- TypeScript compilation errors
- Missing dependencies

#### 4. Deployment Permissions
**Problem**: Workflow can't deploy to Pages
**Solution**: Ensure repository has Pages enabled and workflow permissions

### Viewing Logs
1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. Expand the failed job to see detailed logs

## Performance Features

### Build Optimization
- ✅ Tree shaking for smaller bundles
- ✅ Asset optimization and compression
- ✅ Chunked JavaScript for better caching
- ✅ CSS extraction and minification

### Image Optimization
- ✅ Automatic image compression
- ✅ Asset hashing for cache busting
- ✅ Proper MIME types
- ✅ Lazy loading support

## URLs

### Development
- **Local**: `http://localhost:5173`
- **Preview**: `npm run preview` after build

### Production
- **GitHub Pages**: `https://yourusername.github.io/opticasuarez/`
- **Custom Domain**: Can be configured in repository settings

## Maintenance

### Updating Dependencies
```bash
npm update
npm audit fix
```

### Monitoring Deployments
- Check the **Actions** tab for deployment status
- Set up notifications for failed deployments
- Monitor site performance with browser dev tools

## Security Features
- ✅ Node.js dependencies scanned for vulnerabilities
- ✅ Automatic security updates via Dependabot (if enabled)
- ✅ HTTPS enforced on GitHub Pages
- ✅ No sensitive data in build output

## Next Steps
1. **Custom Domain**: Set up a custom domain if needed
2. **Analytics**: Add Google Analytics or similar
3. **SEO**: Implement meta tags and sitemaps
4. **PWA**: Consider adding Progressive Web App features
5. **Performance**: Monitor and optimize loading times

Your Óptica Suárez website is now ready for automatic deployment! 🎉
