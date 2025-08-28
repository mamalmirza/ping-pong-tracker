import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/db'
import { format } from 'date-fns'
import { GameForm } from '@/components/game-form'
import { GameHistory } from '@/components/game-history'

async function getGamesData() {
  const [games, players] = await Promise.all([
    prisma.game.findMany({
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
      orderBy: {
        name: 'asc',
      },
    }),
  ])

  return { games, players }
}

export default async function GamesPage() {
  const { games, players } = await getGamesData()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Games</h1>
        <p className="text-gray-600 mt-2">Log new games and view game history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add New Game */}
        <Card>
          <CardHeader>
            <CardTitle>Log New Game</CardTitle>
            <CardDescription>Record the results of a ping pong match</CardDescription>
          </CardHeader>
          <CardContent>
            <GameForm players={players} />
          </CardContent>
        </Card>

        {/* Game History */}
        <Card>
          <CardHeader>
            <CardTitle>Game History</CardTitle>
            <CardDescription>All recorded games with filters</CardDescription>
          </CardHeader>
          <CardContent>
            <GameHistory games={games} players={players} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
