# Deployment Guide

## Environment Variables Setup

### Frontend (.env)
Create a `.env` file in the `frontend` directory:

```env
# For local development
VITE_API_URL=http://localhost:9000

# For production (update with your deployed backend URL)
# VITE_API_URL=https://your-backend-url.onrender.com
```

### Backend (.env)
Ensure your backend `.env` file has:

```env
PORT=9000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

## Deployment Steps

### 1. Backend Deployment (Render)

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: your-app-backend
   - **Root Directory**: `backend` (if applicable)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables in Render dashboard
7. Deploy!
8. Copy your backend URL (e.g., `https://your-app.onrender.com`)

### 2. Frontend Deployment (Vercel/Netlify)

#### Option A: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend directory: `cd frontend`
3. Update `.env` with your backend URL:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
4. Run: `vercel`
5. Follow prompts and deploy

#### Option B: Netlify
1. Build your app: `npm run build`
2. Go to [Netlify](https://app.netlify.com/)
3. Drag and drop the `dist` folder
4. Or connect GitHub repo and set:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment variable**: `VITE_API_URL=https://your-backend-url.onrender.com`

### 3. Update CORS Settings

In your backend, update CORS to allow your frontend domain:

```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

## Files Updated for Deployment

✅ All API URLs now use `import.meta.env.VITE_API_URL`
- `frontend/src/store/api/baseApi.ts`
- `frontend/src/components/ui/Post.tsx`
- `frontend/src/components/ui/CommentModal.tsx`
- `frontend/src/components/ui/LikeModal.tsx`

## Testing Before Deployment

1. **Local Test**:
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

2. **Check Environment Variables**:
   - Ensure `.env` file exists
   - Verify `VITE_API_URL` is set correctly

3. **Build Verification**:
   - Run `npm run build` - should complete without errors
   - Check `dist` folder is created

## Post-Deployment Checklist

- [ ] Backend is deployed and accessible
- [ ] Frontend is deployed and accessible
- [ ] Environment variables are set correctly
- [ ] CORS is configured properly
- [ ] Database is connected
- [ ] Test login/register functionality
- [ ] Test post creation
- [ ] Test likes and comments
- [ ] Check browser console for errors

## Troubleshooting

### API Connection Issues
- Verify `VITE_API_URL` in production environment
- Check CORS settings in backend
- Ensure backend is running and accessible

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`
- Rebuild: `npm run build`

### Environment Variables Not Working
- Vite requires `VITE_` prefix for env variables
- Restart dev server after changing .env
- For production, set env vars in hosting platform dashboard

## Support

For issues, check:
- Backend logs in Render dashboard
- Frontend console errors
- Network tab in browser DevTools
