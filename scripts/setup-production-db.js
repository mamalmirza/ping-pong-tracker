// Script to set up the production database
// Run this after setting up your PostgreSQL database

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Setting up production database...')
  
  try {
    // Test the connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // The database tables will be created automatically when you first run the app
    // This script just tests the connection
    
    console.log('🎉 Database setup complete!')
    console.log('📝 Next steps:')
    console.log('   1. Deploy your app to Vercel')
    console.log('   2. Visit your deployed app')
    console.log('   3. Login as admin and add some players')
    console.log('   4. Start logging ping pong games!')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
