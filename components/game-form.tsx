'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { addGame } from '@/lib/actions'

interface Player {
  id: string
  name: string
}

interface GameFormProps {
  players: Player[]
}

export function GameForm({ players }: GameFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    player1Id: '',
    player2Id: '',
    player1Score: '',
    player2Score: '',
    playedAt: new Date().toISOString().slice(0, 16), // Current date/time
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addGame(formData)
      // Reset form
      setFormData({
        player1Id: '',
        player2Id: '',
        player1Score: '',
        player2Score: '',
        playedAt: new Date().toISOString().slice(0, 16),
      })
      // Refresh the page to show new data
      window.location.reload()
    } catch (error) {
      console.error('Error adding game:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.player1Id && 
                     formData.player2Id && 
                     formData.player1Id !== formData.player2Id &&
                     formData.player1Score && 
                     formData.player2Score &&
                     parseInt(formData.player1Score) >= 0 &&
                     parseInt(formData.player2Score) >= 0

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="player1Id" className="block text-sm font-medium text-gray-700 mb-1">
            Player 1
          </label>
          <Select
            id="player1Id"
            value={formData.player1Id}
            onChange={(e) => handleInputChange('player1Id', e.target.value)}
            required
          >
            <option value="">Select player</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="player2Id" className="block text-sm font-medium text-gray-700 mb-1">
            Player 2
          </label>
          <Select
            id="player2Id"
            value={formData.player2Id}
            onChange={(e) => handleInputChange('player2Id', e.target.value)}
            required
          >
            <option value="">Select player</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="player1Score" className="block text-sm font-medium text-gray-700 mb-1">
            Player 1 Score
          </label>
          <Input
            id="player1Score"
            type="number"
            min="0"
            value={formData.player1Score}
            onChange={(e) => handleInputChange('player1Score', e.target.value)}
            placeholder="21"
            required
          />
        </div>

        <div>
          <label htmlFor="player2Score" className="block text-sm font-medium text-gray-700 mb-1">
            Player 2 Score
          </label>
          <Input
            id="player2Score"
            type="number"
            min="0"
            value={formData.player2Score}
            onChange={(e) => handleInputChange('player2Score', e.target.value)}
            placeholder="19"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="playedAt" className="block text-sm font-medium text-gray-700 mb-1">
          Date & Time
        </label>
        <Input
          id="playedAt"
          type="datetime-local"
          value={formData.playedAt}
          onChange={(e) => handleInputChange('playedAt', e.target.value)}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Adding Game...' : 'Add Game'}
      </Button>

      {formData.player1Id && formData.player2Id && formData.player1Id === formData.player2Id && (
        <p className="text-red-600 text-sm text-center">
          Players must be different
        </p>
      )}
    </form>
  )
}
