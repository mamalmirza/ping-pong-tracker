# 🏓 Ping Pong Tracker

A full-stack web application for tracking ping pong games in the office. Built with Next.js 14, React 19, TypeScript, Tailwind CSS, and Prisma.

## ✨ Features

- **Players Management** - Add and remove players by name
- **Game Logging** - Record games between two players with scores and timestamps
- **Leaderboard** - Rank players by wins, losses, and win percentage
- **Game History** - View all past matches with filtering capabilities
- **Dashboard** - Quick overview of today's matches and current standings
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Database**: Prisma ORM with SQLite (local) and PostgreSQL (production)
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ping-pong-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your database URL:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Commands

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database with sample data
npm run db:seed
```

## 🌐 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will automatically detect it's a Next.js project

3. **Set environment variables**
   - Add your production database URL:
     ```env
     DATABASE_URL="postgresql://username:password@host:port/database"
     ```

4. **Deploy**
   - Vercel will automatically build and deploy your app
   - Each push to main branch triggers a new deployment

### Production Database Setup

1. **Create a PostgreSQL database** (e.g., on Vercel Postgres, Supabase, or Railway)

2. **Update your schema for production**
   ```prisma
   // prisma/schema.prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Deploy schema changes**
   ```bash
   npm run db:push
   ```

## 📁 Project Structure

```
ping-pong-tracker/
├── app/                    # Next.js App Router pages
│   ├── games/            # Games page
│   ├── players/          # Players page
│   ├── leaderboard/      # Leaderboard page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Dashboard page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── game-form.tsx     # Game logging form
│   ├── game-history.tsx  # Game history table
│   ├── navigation.tsx    # Navigation bar
│   ├── player-form.tsx   # Player addition form
│   └── player-list.tsx   # Player management
├── lib/                   # Utility functions
│   ├── actions.ts        # Server actions
│   ├── db.ts            # Database client
│   └── utils.ts         # Helper functions
├── prisma/               # Database schema and migrations
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Sample data
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## 🎯 Core Features

### Dashboard
- Overview of today's matches
- Current top players
- Recent activity feed

### Games
- Log new games with player selection and scores
- View game history with filtering by player and date
- Automatic winner determination

### Players
- Add new players by name
- Remove players (only if they have no games)
- View player statistics

### Leaderboard
- Rank players by win percentage
- Display wins, losses, and total games
- Visual ranking indicators (🥇🥈🥉)

## 🔧 Customization

### Adding New Features
- Server actions are in `lib/actions.ts`
- Database schema in `prisma/schema.prisma`
- UI components in `components/` directory

### Styling
- Global styles in `app/globals.css`
- Tailwind configuration in `tailwind.config.ts`
- Component-specific styles using Tailwind classes

## 🐛 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Check your `DATABASE_URL` in `.env.local`
   - Ensure database is running and accessible

2. **Prisma client errors**
   - Run `npm run db:generate` after schema changes
   - Restart your development server

3. **Build errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Prisma documentation](https://www.prisma.io/docs)
- Check [Tailwind CSS docs](https://tailwindcss.com/docs)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

Built with ❤️ for ping pong enthusiasts everywhere!
