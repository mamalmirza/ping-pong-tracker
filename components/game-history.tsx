'use client'

import { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'

interface Player {
  id: string
  name: string
}

interface Game {
  id: string
  player1: Player
  player2: Player
  player1Score: number
  player2Score: number
  winner: Player | null
  playedAt: Date
}

interface GameHistoryProps {
  games: Game[]
  players: Player[]
}

export function GameHistory({ games, players }: GameHistoryProps) {
  const [playerFilter, setPlayerFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesPlayer = !playerFilter || 
        game.player1.name.toLowerCase().includes(playerFilter.toLowerCase()) ||
        game.player2.name.toLowerCase().includes(playerFilter.toLowerCase())
      
      const matchesDate = !dateFilter || 
        format(game.playedAt, 'yyyy-MM-dd') === dateFilter
      
      return matchesPlayer && matchesDate
    })
  }, [games, playerFilter, dateFilter])

  const getWinnerName = (game: Game) => {
    if (!game.winner) return 'Tie'
    return game.winner.name
  }

  const getWinnerClass = (game: Game) => {
    if (!game.winner) return 'text-gray-500'
    return 'text-green-600 font-medium'
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="playerFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Player
          </label>
          <Input
            id="playerFilter"
            type="text"
            placeholder="Search players..."
            value={playerFilter}
            onChange={(e) => setPlayerFilter(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Date
          </label>
          <Input
            id="dateFilter"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {filteredGames.length} of {games.length} games
      </div>

      {/* Games table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Players</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Winner</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGames.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No games found
                </TableCell>
              </TableRow>
            ) : (
              filteredGames.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>
                    <div className="font-medium">
                      {game.player1.name} vs {game.player2.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono">
                      {game.player1Score} - {game.player2Score}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={getWinnerClass(game)}>
                      {getWinnerName(game)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {format(game.playedAt, 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    {format(game.playedAt, 'HH:mm')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Clear filters */}
      {(playerFilter || dateFilter) && (
        <div className="text-center">
          <button
            onClick={() => {
              setPlayerFilter('')
              setDateFilter('')
            }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
