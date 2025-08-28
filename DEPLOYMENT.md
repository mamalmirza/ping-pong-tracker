# 🚀 Deployment Guide

This guide will walk you through deploying your Ping Pong Tracker to Vercel with a production PostgreSQL database.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier available)
- PostgreSQL database (Vercel Postgres, Supabase, or Railway)

## 🌐 Step 1: Prepare Your Repository

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: Ping Pong Tracker"
   git push origin main
   ```

2. **Ensure your repository is public or you have a Vercel Pro account**

## 🗄️ Step 2: Set Up Production Database

### Option A: Vercel Postgres (Recommended)

1. **Go to [vercel.com/dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Select "Storage" → "Postgres"**
4. **Choose your plan and region**
5. **Copy the connection string**

### Option B: Supabase (Free Tier Available)

1. **Go to [supabase.com](https://supabase.com)**
2. **Create a new project**
3. **Go to Settings → Database**
4. **Copy the connection string**

### Option C: Railway

1. **Go to [railway.app](https://railway.app)**
2. **Create a new project**
3. **Add a PostgreSQL database**
4. **Copy the connection string**

## 🚀 Step 3: Deploy to Vercel

1. **Go to [vercel.com/new](https://vercel.com/new)**
2. **Import your GitHub repository**
3. **Vercel will auto-detect Next.js settings**
4. **Click "Deploy"**

## ⚙️ Step 4: Configure Environment Variables

1. **In your Vercel project dashboard, go to "Settings" → "Environment Variables"**
2. **Add the following variables:**

   ```env
   DATABASE_URL="your-postgresql-connection-string"
   ```

3. **Click "Save"**

## 🗃️ Step 5: Deploy Database Schema

1. **Clone your repository locally (if not already done)**
2. **Update your Prisma schema for PostgreSQL:**

   ```bash
   # Copy the PostgreSQL schema
   cp prisma/schema.postgresql.prisma prisma/schema.prisma
   ```

3. **Install dependencies and generate Prisma client:**
   ```bash
   npm install
   npm run db:generate
   ```

4. **Deploy the schema:**
   ```bash
   npm run db:push
   ```

5. **Seed with sample data (optional):**
   ```bash
   npm run db:seed
   ```

## 🔄 Step 6: Redeploy

1. **Push your changes to GitHub:**
   ```bash
   git add .
   git commit -m "Update schema for PostgreSQL"
   git push origin main
   ```

2. **Vercel will automatically redeploy**

## ✅ Step 7: Verify Deployment

1. **Visit your Vercel URL**
2. **Test the application:**
   - Add a few players
   - Log some games
   - Check the leaderboard
   - Verify all pages work

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify your `DATABASE_URL` is correct
   - Ensure your database is accessible from Vercel's servers
   - Check if your database requires SSL

2. **Build Errors**
   - Check Vercel build logs
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation

3. **Runtime Errors**
   - Check Vercel function logs
   - Verify environment variables are set
   - Test database connectivity

### Debug Commands

```bash
# Check Prisma client generation
npm run db:generate

# Verify database connection
npm run db:studio

# Test build locally
npm run build
```

## 📊 Monitoring

1. **Vercel Analytics** - Track performance and usage
2. **Vercel Logs** - Monitor function execution
3. **Database Monitoring** - Check your PostgreSQL provider's dashboard

## 🔄 Continuous Deployment

- **Automatic**: Every push to `main` triggers a new deployment
- **Preview**: Pull requests get preview deployments
- **Rollback**: Easy rollback to previous versions from Vercel dashboard

## 💰 Cost Optimization

- **Vercel Hobby**: Free tier for personal projects
- **Vercel Pro**: $20/month for team features
- **Database**: Vercel Postgres starts at $20/month, Supabase has a generous free tier

## 🎯 Next Steps

1. **Set up custom domain** (optional)
2. **Configure analytics** (Vercel Analytics, Google Analytics)
3. **Set up monitoring** (error tracking, performance monitoring)
4. **Add CI/CD** (GitHub Actions for testing)

---

Your Ping Pong Tracker is now live! 🏓✨
