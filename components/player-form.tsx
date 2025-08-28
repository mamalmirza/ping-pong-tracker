'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addPlayer } from '@/lib/actions'

export function PlayerForm() {
  const [playerName, setPlayerName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!playerName.trim()) return

    setIsSubmitting(true)

    try {
      await addPlayer({ name: playerName.trim() })
      setPlayerName('')
      // Refresh the page to show new data
      window.location.reload()
    } catch (error) {
      console.error('Error adding player:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-1">
          Player Name
        </label>
        <Input
          id="playerName"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
          required
          maxLength={50}
        />
      </div>

      <Button
        type="submit"
        disabled={!playerName.trim() || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Adding Player...' : 'Add Player'}
      </Button>
    </form>
  )
}
