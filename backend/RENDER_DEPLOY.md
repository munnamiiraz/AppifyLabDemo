# Render Deployment Instructions

## Quick Fix for Your Error

The error occurs because Render can't find the compiled JavaScript files. Follow these steps:

### Step 1: Update Render Settings

In your Render dashboard, set:

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run deploy`
- **Root Directory**: Leave empty (or set to `backend` if your repo has both frontend/backend)

### Step 2: Environment Variables

Add these in Render dashboard:

```
DATABASE_URL=postgresql://neondb_owner:npg_0JM9wLhjDOiv@ep-withered-mud-a8shue6v-pooler.eastus2.azure.neon.tech/neondb?sslmode=require
JWT_SECRET=shh
NODE_ENV=production
PORT=9000
CLOUDINARY_CLOUD_NAME=dreoitkdm
CLOUDINARY_API_KEY=472467646937612
CLOUDINARY_API_SECRET=0oqlKq6JV8ml3xE1pYrfU5u--hQ
CORS_ORIGIN=*
```

### Step 3: Redeploy

Click "Manual Deploy" → "Clear build cache & deploy"

## What Changed

- `build` script now runs `prisma generate && tsc` to compile TypeScript
- `start` script runs `node dist/index.js` (the compiled file)
- `deploy` script runs migrations then starts the server

## Troubleshooting

If still failing, check Render logs for:
- Build completed successfully
- `dist/index.js` file exists
- All dependencies installed
