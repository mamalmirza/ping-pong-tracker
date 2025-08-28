# 🚀 Deploying to Vercel with Prisma Accelerate

## 📋 Prerequisites
- ✅ Next.js app is working locally
- ✅ Prisma Accelerate database is set up
- ✅ Vercel account

## 🔧 Step 1: Prepare for Production

### Update Environment Variables
In your Vercel project, add these environment variables:

```bash
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
NODE_ENV="production"
```

### Update Prisma Schema for Production
Before deploying, temporarily rename your schema:
```bash
# Rename the SQLite schema
mv prisma/schema.prisma prisma/schema.sqlite.prisma

# Use the PostgreSQL schema
mv prisma/schema.postgresql.prisma prisma/schema.prisma
```

## 🚀 Step 2: Deploy to Vercel

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Option B: GitHub Integration
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Vercel will auto-deploy

## 🗄️ Step 3: Database Setup

### Generate Prisma Client
```bash
npx prisma generate --no-engine
```

### Push Schema to Database
```bash
npx prisma db push
```

### Seed the Database (Optional)
```bash
npx prisma db seed
```

## 🔄 Step 4: Post-Deployment

### Verify Database Connection
Check your app is working with the new database

### Switch Back to Local Development
```bash
# Restore SQLite schema for local dev
mv prisma/schema.prisma prisma/schema.postgresql.prisma
mv prisma/schema.sqlite.prisma prisma/schema.prisma
```

## 🛠️ Troubleshooting

### Build Errors
- Ensure `DATABASE_URL` is set in Vercel
- Check Prisma schema is using PostgreSQL
- Verify Prisma Client is generated

### Database Connection Issues
- Confirm API key is correct
- Check Prisma Accelerate service status
- Verify environment variables are loaded

### Performance Issues
- Prisma Accelerate provides connection pooling
- Monitor database performance in Prisma dashboard
- Consider query optimization

## 📚 Additional Resources

- [Prisma Accelerate Documentation](https://www.prisma.io/docs/accelerate)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Next.js Production Deployment](https://nextjs.org/docs/deployment)

## 🎯 Best Practices

1. **Environment Separation**: Keep local and production schemas separate
2. **Connection Pooling**: Prisma Accelerate handles this automatically
3. **Monitoring**: Use Prisma dashboard to monitor performance
4. **Backup**: Regular database backups (Prisma Accelerate handles this)
5. **Testing**: Test production schema locally before deploying
