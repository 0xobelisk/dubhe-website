# Assets Directory

This directory contains PDF documents for the Dubhe project.

## Important Notes

The actual PDF files (`Lightpaper.pdf` and `Onepaper.pdf`) are too large for Git (400MB+) and should be:

1. **For Development**: Place the actual PDF files in this directory locally
2. **For Production**: Upload the PDFs to your hosting service or CDN directly

## Files Required

- `Lightpaper.pdf` - The Lightpaper document
- `Onepaper.pdf` - The OnePager document

These files are referenced by the papers page at `/[locale]/papers`.

## Deployment

When deploying to production, ensure the PDF files are uploaded to:
- `/public/assets/Lightpaper.pdf`
- `/public/assets/Onepaper.pdf`

You can use services like:
- Vercel's file storage
- AWS S3
- Cloudflare R2
- Or upload directly to your server