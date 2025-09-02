# Vercel Deployment Guide

## 🚀 Quick Setup Steps

### 1. Set up Vercel Postgres Database

1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to the **Storage** tab
4. Click **Create Database** → **Postgres**
5. Choose a name (e.g., `ping-pong-tracker-db`)
6. Select a region close to your users
7. Click **Create**

### 2. Configure Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

```
DATABASE_URL = [Copy from Vercel Postgres connection string]
ADMIN_PASSWORD = rigiD123&^
NEXTAUTH_SECRET = [Generate a random string]
NEXTAUTH_URL = https://your-app-name.vercel.app
```

### 3. Get Database Connection String

1. In Vercel Storage, click on your Postgres database
2. Go to the **Connection** tab
3. Copy the **Connection String**
4. Paste it as the `DATABASE_URL` environment variable

### 4. Deploy

1. Push your changes to GitHub
2. Vercel will automatically redeploy
3. The build should now succeed!

## 🔧 Alternative: Free PostgreSQL Options

If you prefer not to use Vercel Postgres, you can use:

### Neon (Free Tier)
1. Go to [neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string
5. Use as `DATABASE_URL`

### Supabase (Free Tier)
1. Go to [supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project
4. Go to Settings → Database
5. Copy the connection string
6. Use as `DATABASE_URL`

## 📝 Important Notes

- **SQLite won't work on Vercel** - it's a serverless platform
- **PostgreSQL is required** for production deployment
- **Environment variables must be set** in Vercel dashboard
- **Database will be empty** initially - you'll need to add players and games

## 🎯 After Deployment

1. Visit your deployed app
2. Click "Admin Login"
3. Use password: `rigiD123&^`
4. Add some players
5. Start logging games!

## 🆘 Troubleshooting

If you encounter issues:
1. Check that all environment variables are set
2. Verify the database connection string is correct
3. Make sure the database is accessible from Vercel
4. Check the Vercel function logs for detailed error messages
