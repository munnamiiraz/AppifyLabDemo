# Render Frontend Deployment

## Settings for Render Dashboard:

**Service Type**: Static Site

**Build Command**: 
```
npm install && npm run build
```

**Publish Directory**: 
```
dist
```

**Environment Variables**:
```
VITE_API_URL=https://appifylabdemo.onrender.com
```

## Steps:

1. Go to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect your GitHub repo
4. Set **Root Directory**: `frontend`
5. Set **Build Command**: `npm install && npm run build`
6. Set **Publish Directory**: `dist`
7. Add Environment Variable: `VITE_API_URL` = `https://appifylabdemo.onrender.com`
8. Click "Create Static Site"

Done! Your frontend will be live in a few minutes.
