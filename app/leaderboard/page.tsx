import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/db'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

async function getLeaderboardData() {
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

  // Sort by win percentage (descending), then by total games (descending), then by name
  const sortedPlayers = playersWithStats.sort((a, b) => {
    if (Math.abs(a.winPercentage - b.winPercentage) < 0.1) {
      if (a.totalGames !== b.totalGames) {
        return b.totalGames - a.totalGames
      }
      return a.name.localeCompare(b.name)
    }
    return b.winPercentage - a.winPercentage
  })

  return { players: sortedPlayers }
}

export default async function LeaderboardPage() {
  const { players } = await getLeaderboardData()

  const getRankBadge = (index: number) => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `${index + 1}`
  }

  const getRankClass = (index: number) => {
    if (index === 0) return 'text-yellow-600 font-bold'
    if (index === 1) return 'text-gray-600 font-bold'
    if (index === 2) return 'text-amber-600 font-bold'
    return 'text-gray-500'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        <p className="text-gray-600 mt-2">Player rankings by performance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Player Rankings</CardTitle>
          <CardDescription>
            Ranked by win percentage, then by total games played
          </CardDescription>
        </CardHeader>
        <CardContent>
          {players.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No players registered yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-center">Games</TableHead>
                  <TableHead className="text-center">Wins</TableHead>
                  <TableHead className="text-center">Losses</TableHead>
                  <TableHead className="text-center">Win %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player, index) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <span className={getRankClass(index)}>
                        {getRankBadge(index)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{player.name}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      {player.totalGames}
                    </TableCell>
                    <TableCell className="text-center text-green-600 font-medium">
                      {player.wins}
                    </TableCell>
                    <TableCell className="text-center text-red-600 font-medium">
                      {player.losses}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {player.winPercentage.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Stats Summary */}
      {players.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{players.length}</div>
              <div className="text-sm text-gray-600">Total Players</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {players.reduce((sum, p) => sum + p.totalGames, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Games</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {players.filter(p => p.totalGames > 0).length}
              </div>
              <div className="text-sm text-gray-600">Active Players</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">
                {players.length > 0 ? players[0].name : 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Top Player</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
