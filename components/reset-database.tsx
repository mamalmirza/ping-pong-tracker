'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { resetDatabase, removeAllGames } from '@/lib/actions'
import { ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react'

export function ResetDatabase() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isResetting, setIsResetting] = useState(false)
  const [isRemovingGames, setIsRemovingGames] = useState(false)

  const handleRemoveAllGames = async () => {
    if (!confirm('⚠️ This will delete ALL games but keep the players!\n\nThis action cannot be undone. Are you sure you want to continue?')) {
      return
    }

    setIsRemovingGames(true)

    try {
      await removeAllGames()
      // Refresh the page to show updated state
      window.location.reload()
    } catch (error) {
      console.error('Error removing all games:', error)
      alert('Failed to remove all games. Please try again.')
    } finally {
      setIsRemovingGames(false)
    }
  }

  const handleReset = async () => {
    if (!confirm('⚠️ WARNING: This will delete ALL players and games!\n\nThis action cannot be undone. Are you sure you want to continue?')) {
      return
    }

    setIsResetting(true)

    try {
      await resetDatabase()
      // Refresh the page to show empty state
      window.location.reload()
    } catch (error) {
      console.error('Error resetting database:', error)
      alert('Failed to reset database. Please try again.')
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="border border-red-200 rounded-lg">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-red-50 transition-colors rounded-t-lg"
      >
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <span className="font-medium text-red-800">Reset Database</span>
        </div>
        {isCollapsed ? (
          <ChevronRight className="h-5 w-5 text-red-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-red-600" />
        )}
      </button>

      {/* Collapsible Content */}
      {!isCollapsed && (
        <div className="px-4 pb-4 border-t border-red-200 bg-red-50 rounded-b-lg">
          <div className="pt-4 space-y-6">
            {/* Remove All Games Option */}
            <div className="border-b border-red-200 pb-4">
              <h4 className="font-medium text-red-800 mb-3">Option 1: Remove All Games</h4>
              <div className="text-sm text-red-700 mb-3">
                <p className="mb-2">This will:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Delete all games and match history</li>
                  <li>Keep all players</li>
                  <li>Reset all statistics and rankings</li>
                  <li>Allow you to remove individual players afterward</li>
                </ul>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveAllGames}
                disabled={isRemovingGames}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                {isRemovingGames ? 'Removing Games...' : 'Remove All Games'}
              </Button>
            </div>

            {/* Reset Database Option */}
            <div>
              <h4 className="font-medium text-red-800 mb-3">Option 2: Complete Reset</h4>
              <div className="text-sm text-red-700 mb-3">
                <p className="mb-2">This will:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Delete all players</li>
                  <li>Delete all games</li>
                  <li>Remove all statistics and rankings</li>
                  <li>Reset the database to completely empty state</li>
                </ul>
              </div>

              <Button
                variant="destructive"
                size="lg"
                onClick={handleReset}
                disabled={isResetting}
                className="w-full"
              >
                {isResetting ? 'Resetting Database...' : 'Reset Database'}
              </Button>
            </div>

            <p className="text-xs text-red-600 text-center">
              Use these options only when you want to start fresh
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
