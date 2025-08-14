# Vercel Deployment Setup

This repository includes automated Vercel deployments for both preview environments (on pull requests) and production (on main branch pushes).

## Required Configuration

To enable the deployment workflows, you need to configure the following secrets in your GitHub repository:

### 1. Vercel Token

1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Create a new token with the necessary permissions
3. Add it as a repository secret named `VERCEL_TOKEN`

### 2. Vercel Team ID

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your team/organization settings
3. Copy the Team ID from the settings page
4. Add it as a repository secret named `VERCEL_TEAM_ID`

### 3. Vercel Project ID

1. Go to your project in the [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to Settings tab
3. Copy the Project ID from the General section
4. Add it as a repository secret named `VERCEL_PROJECT_ID`

### 4. Vercel Automation Bypass Secret

1. Go to your project in the [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to Settings → Environment Variables
3. Find or create the `VERCEL_AUTOMATION_BYPASS_SECRET` environment variable
4. Copy its value and add it as a repository secret named `VERCEL_AUTOMATION_BYPASS_SECRET`

This secret is required for e2e tests to bypass Vercel's protection mechanisms when running against preview deployments.

## Workflow Details

### Pull Request Workflow (`.github/workflows/deploy-preview.yml`)

- **Trigger**: Pull requests to `main` branch
- **Actions**:
  1. Deploy to Vercel preview environment
  2. Run e2e tests against the preview URL
  3. Upload test results as artifacts

### Production Workflow (`.github/workflows/deploy-production.yml`)

- **Trigger**: Push to `main` branch
- **Actions**:
  1. Deploy to Vercel production environment

## E2E Testing

The e2e tests are automatically configured to run against the Vercel preview URL. The Playwright configuration supports dynamic base URLs through the `PLAYWRIGHT_BASE_URL` environment variable.

For local development, tests continue to run against the local development server as before.

## Vercel Configuration

The `vercel.json` file is configured for React Router v7 with:

- Server-side rendering support
- Proper routing configuration
- Node.js 20.x runtime
- Optimized build output

## Manual Deployment

You can also deploy manually using the Vercel CLI with your team and project IDs:

```bash
# Install Vercel CLI
npm install -g vercel

# Set environment variables
export VERCEL_ORG_ID=your_team_id
export VERCEL_PROJECT_ID=your_project_id

# Deploy to preview
vercel --token your_token

# Deploy to production
vercel --prod --token your_token
```
