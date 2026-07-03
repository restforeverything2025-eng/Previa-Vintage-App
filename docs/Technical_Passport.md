# PREVIA CMS v1.1 Technical Passport

## Source of truth
Google Sheets.

## Components
- Google Sheets — product data
- Incoming — temporary photos
- Products — permanent photos
- Apps Script CMS — business logic
- GitHub — published storefront
- Telegram Mini App — customer interface
- VS Code — development

## Publish modes
1. No new products → update data.js only.
2. New products → full publish pipeline.

## Rules
- Never edit ID manually.
- Never edit SKU manually.
- Never edit data.js manually.
- Incoming folders are named 1,2,3...
- After CMS publication execute git pull before continuing development.
