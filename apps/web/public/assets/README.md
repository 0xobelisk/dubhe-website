# Assets Directory

This directory previously contained PDF documents for the Dubhe project, but the PDF hosting approach has been updated.

## Current Implementation

The PDF documents are now hosted on **Google Drive** to avoid repository size limitations:

- **Lightpaper**: https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing
- **Onepager**: https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing

## Configuration

The papers page at `/[locale]/papers` uses environment variables for PDF URLs:

```env
NEXT_PUBLIC_LIGHTPAPER_URL=https://your-custom-cdn.com/lightpaper.pdf
NEXT_PUBLIC_ONEPAPER_URL=https://your-custom-cdn.com/onepaper.pdf
```

If these environment variables are not set or are empty strings, the application automatically falls back to the Google Drive URLs.

## Deployment Options

For production deployments, you have several options:

1. **Use Google Drive URLs** (current default)
   - No additional setup required
   - Files are publicly accessible
   - Reliable hosting with Google's infrastructure

2. **Use Custom CDN/Hosting**
   - Set the appropriate environment variables
   - Upload PDFs to your preferred hosting service:
     - Vercel's file storage
     - AWS S3 + CloudFront
     - Cloudflare R2
     - Azure Blob Storage
     - Your own server

## Migration Notes

The original local PDF files have been removed from the repository due to their large size (400MB+). The application now uses remote URLs exclusively, which provides better performance and reduces repository size.