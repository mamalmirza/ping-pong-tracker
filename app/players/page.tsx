import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/db'
import { PlayerForm } from '@/components/player-form'
import { PlayerList } from '@/components/player-list'
import { ResetDatabase } from '@/components/reset-database'

async function getPlayersData() {
  const players = await prisma.player.findMany({
    include: {
      gamesAsPlayer1: true,
      gamesAsPlayer2: true,
      gamesWon: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  // Calculate stats for each player
  const playersWithStats = players.map(player => {
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
  })

  return { players: playersWithStats }
}

export default async function PlayersPage() {
  const { players } = await getPlayersData()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Players</h1>
        <p className="text-gray-600 mt-2">Manage ping pong players</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Add New Player */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Player</CardTitle>
            <CardDescription>Add a new player to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <PlayerForm />
          </CardContent>
        </Card>

        {/* Player List */}
        <Card>
          <CardHeader>
            <CardTitle>All Players</CardTitle>
            <CardDescription>
              {players.length} player{players.length !== 1 ? 's' : ''} registered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PlayerList players={players} />
          </CardContent>
        </Card>
      </div>

      {/* Reset Database */}
      <Card>
        <CardHeader>
          <CardTitle>Database Management</CardTitle>
          <CardDescription>
            Advanced options for managing your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetDatabase />
        </CardContent>
      </Card>
    </div>
  )
}
