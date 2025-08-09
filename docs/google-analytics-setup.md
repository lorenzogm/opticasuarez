# Google Analytics Setup

This project has Google Analytics 4 (GA4) integration ready to use. Follow these steps to configure it:

## 1. Get your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use an existing one
3. In Admin → Data Streams → Web, click on your website stream
4. Copy the "Measurement ID" (format: G-XXXXXXXXXX)

## 2. Configure the Measurement ID

### For Development:

Create a `.env` file in the project root:

```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### For Production:

Set the environment variable `VITE_GA_MEASUREMENT_ID` in your deployment platform.

## 3. Verify Installation

After deploying with the measurement ID configured:

1. Open your website in a browser
2. Open Developer Tools → Network tab
3. Look for requests to `googletagmanager.com`
4. Check Google Analytics Real-time reports to see active users

## Technical Details

- The Google Analytics integration is implemented in `app/ui/components/google-analytics.tsx`
- It's included in the main layout at `app/root.tsx`
- The component only loads when a valid measurement ID is provided
- Uses Google's recommended gtag.js implementation
- Tracks all page views automatically across the React Router SPA

## Notes

- Data collection may take up to 30 minutes to start appearing in Google Analytics
- The integration follows Google's official implementation guidelines
- No tracking occurs when the measurement ID is not configured (privacy-friendly)
