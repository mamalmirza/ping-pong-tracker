'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function addPlayer(data: { name: string }) {
  try {
    const player = await prisma.player.create({
      data: {
        name: data.name.trim(),
      },
    })
    
    revalidatePath('/players')
    revalidatePath('/')
    revalidatePath('/leaderboard')
    
    return { success: true, player }
  } catch (error) {
    console.error('Error adding player:', error)
    throw new Error('Failed to add player')
  }
}

export async function removePlayer(data: { id: string }) {
  try {
    // Check if player has any games
    const player = await prisma.player.findUnique({
      where: { id: data.id },
      include: {
        gamesAsPlayer1: true,
        gamesAsPlayer2: true,
      },
    })

    if (!player) {
      throw new Error('Player not found')
    }

    if (player.gamesAsPlayer1.length > 0 || player.gamesAsPlayer2.length > 0) {
      throw new Error('Cannot remove player with existing games')
    }

    await prisma.player.delete({
      where: { id: data.id },
    })
    
    revalidatePath('/players')
    revalidatePath('/')
    revalidatePath('/leaderboard')
    
    return { success: true }
  } catch (error) {
    console.error('Error removing player:', error)
    throw error
  }
}

export async function addGame(data: {
  player1Id: string
  player2Id: string
  player1Score: string
  player2Score: string
  playedAt: string
}) {
  try {
    const player1Score = parseInt(data.player1Score)
    const player2Score = parseInt(data.player2Score)
    
    if (isNaN(player1Score) || isNaN(player2Score)) {
      throw new Error('Invalid scores')
    }

    if (player1Score < 0 || player2Score < 0) {
      throw new Error('Scores must be non-negative')
    }

    // Determine winner
    let winnerId: string | null = null
    if (player1Score > player2Score) {
      winnerId = data.player1Id
    } else if (player2Score > player1Score) {
      winnerId = data.player2Id
    }
    // If scores are equal, it's a tie (winnerId remains null)

    const game = await prisma.game.create({
      data: {
        player1Id: data.player1Id,
        player2Id: data.player2Id,
        player1Score,
        player2Score,
        winnerId,
        playedAt: new Date(data.playedAt),
      },
    })
    
    revalidatePath('/games')
    revalidatePath('/')
    revalidatePath('/players')
    revalidatePath('/leaderboard')
    
    return { success: true, game }
  } catch (error) {
    console.error('Error adding game:', error)
    throw new Error('Failed to add game')
  }
}

export async function removeAllGames() {
  try {
    // Delete all games
    await prisma.game.deleteMany({})
    
    revalidatePath('/games')
    revalidatePath('/')
    revalidatePath('/players')
    revalidatePath('/leaderboard')
    
    return { success: true }
  } catch (error) {
    console.error('Error removing all games:', error)
    throw new Error('Failed to remove all games')
  }
}

export async function resetDatabase() {
  try {
    // Delete all games first (due to foreign key constraints)
    await prisma.game.deleteMany({})
    
    // Then delete all players
    await prisma.player.deleteMany({})
    
    revalidatePath('/games')
    revalidatePath('/')
    revalidatePath('/players')
    revalidatePath('/leaderboard')
    
    return { success: true }
  } catch (error) {
    console.error('Error resetting database:', error)
    throw new Error('Failed to reset database')
  }
}
