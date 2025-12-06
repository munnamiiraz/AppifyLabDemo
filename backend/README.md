# AppifyLab Demo Task Backend

## Deployment Instructions

### Environment Variables
Copy `.env.example` to `.env` and fill in your production values:

```bash
cp .env.example .env
```

### Required Environment Variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Set to "production"
- `PORT`: Server port (default: 9000)
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `JWT_SECRET`: JWT signing secret
- `NEXTAUTH_SECRET`: NextAuth secret
- `NEXTAUTH_URL`: Frontend URL

### Deployment Steps:

1. Install dependencies:
```bash
npm install
```

2. Build the application:
```bash
npm run build
```

3. Start the server:
```bash
npm start
```

### For Render Deployment:
- Build Command: `npm run build`
- Start Command: `npm start`
- Node Version: 18.x or higher

### For Vercel Deployment:
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Vercel will automatically detect the configuration
4. Build Command: `npm run vercel-build` (or leave default)
5. Output Directory: `dist`
6. Install Command: `npm install`

The application will automatically:
- Generate Prisma client
- Run database migrations
- Build TypeScript to JavaScript
- Start the server on the specified PORT