import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/db'
import { format } from 'date-fns'
import Link from 'next/link'

async function getDashboardData() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [todayGames, recentGames, players] = await Promise.all([
    prisma.game.findMany({
      where: {
        playedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        player1: true,
        player2: true,
        winner: true,
      },
      orderBy: {
        playedAt: 'desc',
      },
    }),
    prisma.game.findMany({
      take: 5,
      include: {
        player1: true,
        player2: true,
        winner: true,
      },
      orderBy: {
        playedAt: 'desc',
      },
    }),
    prisma.player.findMany({
      include: {
        gamesAsPlayer1: true,
        gamesAsPlayer2: true,
        gamesWon: true,
      },
    }),
  ])

  // Calculate stats for each player
  const playerStats = players.map(player => {
    const totalGames = player.gamesAsPlayer1.length + player.gamesAsPlayer2.length
    const wins = player.gamesWon.length
    const losses = totalGames - wins
    const winPercentage = totalGames > 0 ? (wins / totalGames) * 100 : 0

    return {
      ...player,
      totalGames,
      wins,
      losses,
      winPercentage,
    }
  }).sort((a, b) => b.winPercentage - a.winPercentage)

  return {
    todayGames,
    recentGames,
    playerStats: playerStats.slice(0, 5), // Top 5 players
  }
}

export default async function DashboardPage() {
  const { todayGames, recentGames, playerStats } = await getDashboardData()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Quick overview of ping pong activity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Matches */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Matches</CardTitle>
            <CardDescription>
              {todayGames.length} game{todayGames.length !== 1 ? 's' : ''} played today
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todayGames.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No games played today</p>
            ) : (
              <div className="space-y-3">
                {todayGames.map((game) => (
                  <div key={game.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">
                        {game.player1.name} vs {game.player2.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {game.player1Score} - {game.player2Score}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {format(game.playedAt, 'HH:mm')}
                      </div>
                      {game.winner && (
                        <div className="text-xs text-green-600 font-medium">
                          Winner: {game.winner.name}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <Link href="/games" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all games →
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Current Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Top Players</CardTitle>
            <CardDescription>Ranked by win percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {playerStats.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{player.name}</div>
                      <div className="text-sm text-gray-600">
                        {player.wins}W - {player.losses}L
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">
                      {player.winPercentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/leaderboard" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View full leaderboard →
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest games played</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentGames.map((game) => (
                <div key={game.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-sm">
                    {game.player1.name} vs {game.player2.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {game.player1Score} - {game.player2Score}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {format(game.playedAt, 'MMM d, HH:mm')}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/games" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all games →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
