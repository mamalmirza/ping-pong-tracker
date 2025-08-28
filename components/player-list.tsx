'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { removePlayer } from '@/lib/actions'

interface Player {
  id: string
  name: string
  totalGames: number
  wins: number
  losses: number
  winPercentage: number
}

interface PlayerListProps {
  players: Player[]
}

export function PlayerList({ players }: PlayerListProps) {
  const [removingPlayer, setRemovingPlayer] = useState<string | null>(null)

  const handleRemovePlayer = async (playerId: string) => {
    if (!confirm('Are you sure you want to remove this player? This action cannot be undone.')) {
      return
    }

    setRemovingPlayer(playerId)

    try {
      await removePlayer({ id: playerId })
      // Refresh the page to show updated data
      window.location.reload()
    } catch (error) {
      console.error('Error removing player:', error)
      setRemovingPlayer(null)
    }
  }

  if (players.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No players registered yet
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {players.map((player) => (
        <div key={player.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="font-medium text-gray-900">{player.name}</div>
            <div className="text-sm text-gray-600">
              {player.totalGames} game{player.totalGames !== 1 ? 's' : ''} played
            </div>
            <div className="text-sm text-gray-500">
              {player.wins}W - {player.losses}L ({player.winPercentage.toFixed(1)}%)
            </div>
          </div>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleRemovePlayer(player.id)}
            disabled={removingPlayer === player.id}
          >
            {removingPlayer === player.id ? 'Removing...' : 'Remove'}
          </Button>
        </div>
      ))}
    </div>
  )
}
