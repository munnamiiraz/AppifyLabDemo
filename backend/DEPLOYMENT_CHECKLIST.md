# Vercel Deployment Checklist

## ✅ Pre-Deployment Setup

### 1. Environment Variables (Set in Vercel Dashboard)
Make sure to add these environment variables in your Vercel project settings:

```
DATABASE_URL=postgresql://appifylab_demo_task_user:cWsAA2dZqydrSKVG87G7stsdVAEAKWZK@dpg-d4hkfd7diees73bkkq50-a.singapore-postgres.render.com/appifylab_demo_task
NODE_ENV=production
PORT=9000
CORS_ORIGIN=*
CLOUDINARY_CLOUD_NAME=dreoitkdm
CLOUDINARY_API_KEY=472467646937612
CLOUDINARY_API_SECRET=0oqlKq6JV8ml3xE1pYrfU5u--hQ
JWT_SECRET=shh
HOST_URL=*
NEXTAUTH_SECRET=some-long-secret
NEXTAUTH_URL=https://your-frontend-url.vercel.app
```

### 2. Vercel Project Settings
- **Framework Preset**: Other
- **Build Command**: `npm run vercel-build` (or leave default)
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher

### 3. Database Setup
✅ PostgreSQL database is already configured on Render
✅ Migrations will run automatically during build

## 📋 Deployment Steps

1. **Push to GitHub**
   ```bash
   git push origin deployment
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the `deployment` branch

3. **Configure Environment Variables**
   - Add all environment variables from above
   - Make sure DATABASE_URL is correct

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

## 🔍 Post-Deployment Verification

- [ ] Check deployment logs for errors
- [ ] Test API endpoints:
  - `GET /api/auth` - Health check
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login
- [ ] Verify database connection
- [ ] Test file upload functionality
- [ ] Check CORS settings

## 🚨 Common Issues & Solutions

### Issue: Build fails with Prisma error
**Solution**: Make sure DATABASE_URL is set in environment variables

### Issue: 404 on API routes
**Solution**: Check vercel.json routing configuration

### Issue: Database connection timeout
**Solution**: Verify DATABASE_URL and check if database allows external connections

### Issue: File upload fails
**Solution**: Verify Cloudinary credentials are correct

## 📝 Notes

- Vercel has a 10-second timeout for serverless functions
- For long-running operations, consider using Vercel's Edge Functions
- Database migrations run automatically during build via `vercel-build` script
- The app exports the Express instance for Vercel's serverless environment
