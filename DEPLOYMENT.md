# 🚀 Vercel Deployment Guide

## Repository
**GitHub:** https://github.com/Tanushree2004-byte/showmaxx.git

## Quick Deploy Steps

### 1. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `Tanushree2004-byte/showmaxx`

### 2. Configure Deployment
Vercel will automatically detect the `vercel.json` configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build",
        "buildCommand": "cd frontend && npm run build",
        "installCommand": "cd frontend && npm install"
      }
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

### 3. Set Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```env
NODE_ENV=production
DB_HOST=your-database-host
DB_PORT=5432
DB_NAME=movie_platform
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_SSL=require
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d
PORT=5000
```

### 4. Deploy
- Click "Deploy"
- Vercel will build and deploy your application
- You'll get a deployment URL like: `https://showmaxx.vercel.app`

## Project Structure
```
showmaxx/
├── frontend/          # React app (builds to /)
├── backend/           # Node.js API (serves /api/*)
├── vercel.json       # Vercel configuration
└── package.json      # Root package.json
```

## API Routes
- Frontend: `https://your-app.vercel.app/`
- Backend API: `https://your-app.vercel.app/api/*`

## Troubleshooting
If deployment fails:
1. Check build logs in Vercel dashboard
2. Verify environment variables
3. Ensure all dependencies are in package.json
4. Check that vercel.json is properly formatted

## Local Development
```bash
# Start backend
cd backend && npm run dev

# Start frontend (new terminal)
cd frontend && npm start
```

## Features Deployed
✅ React frontend with glassmorphic UI
✅ Node.js backend with authentication
✅ User signup/login system
✅ JWT token authentication
✅ Movie browsing interface
✅ Responsive design
✅ Production-ready build
