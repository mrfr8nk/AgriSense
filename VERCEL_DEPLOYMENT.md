# Vercel Deployment Guide for AgriSense AI Pro

## Quick Start

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

## Environment Variables Setup

Before deployment, add the following environment variables in Vercel dashboard:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
DATABASE_URL=your_neon_database_url
SESSION_SECRET=your_random_secret_string
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
NODE_ENV=production
```

### Getting Database URL from Neon

1. Go to neon.tech
2. Create a project or use existing
3. Copy the connection string in format: `postgresql://user:password@host/database?sslmode=require`
4. Set as `DATABASE_URL` in Vercel

### Getting Firebase Credentials

1. Go to console.firebase.google.com
2. Select your project
3. Go to Project Settings → Service Accounts
4. Copy `projectId`, `apiKey`, and `appId`
5. Set them as environment variables

## Build Configuration

The `vercel.json` file automatically:
- ✅ Builds frontend with Vite
- ✅ Bundles backend with esbuild
- ✅ Routes `/api/*` to Express backend
- ✅ Routes all other paths to React frontend

## Deployment Features

- **Full-stack**: Express backend + React frontend
- **Real-time Weather**: Open-Meteo API integration
- **AI Features**: BK9 AI API for chatbot and image analysis
- **Authentication**: Firebase Google Sign-In
- **Database**: PostgreSQL with Drizzle ORM
- **Multi-language**: English and Shona

## Post-Deployment

After successful deployment:

1. **Update Firebase Authorized Domains**:
   - Go to Firebase Console → Authentication → Settings
   - Add your Vercel domain to "Authorized domains"
   - Format: `your-app.vercel.app`

2. **Test Endpoints**:
   - Frontend: https://your-app.vercel.app
   - Health Check: https://your-app.vercel.app/api/health (if added)

## Troubleshooting

### Build Fails
- Check `npm run build` locally first
- Verify environment variables are set
- Check Vercel build logs for details

### Frontend Not Loading
- Clear browser cache
- Check that `dist/public/index.html` exists after build
- Verify routes in `vercel.json`

### API Not Working
- Check environment variables are set
- Verify database connection string
- Check server logs in Vercel dashboard

## Rollback

To rollback to a previous deployment:
1. Go to Vercel dashboard → Deployments
2. Find the deployment to rollback to
3. Click "..." → Promote to Production

## Monitoring

Monitor your app performance in Vercel dashboard:
- Analytics tab for traffic insights
- Logs tab for error tracking
- Environment tab to update secrets
