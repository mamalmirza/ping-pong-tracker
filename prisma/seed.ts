import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample players
  const alice = await prisma.player.upsert({
    where: { name: 'Alice' },
    update: {},
    create: { name: 'Alice' },
  })

  const bob = await prisma.player.upsert({
    where: { name: 'Bob' },
    update: {},
    create: { name: 'Bob' },
  })

  const charlie = await prisma.player.upsert({
    where: { name: 'Charlie' },
    update: {},
    create: { name: 'Charlie' },
  })

  const diana = await prisma.player.upsert({
    where: { name: 'Diana' },
    update: {},
    create: { name: 'Diana' },
  })

  // Create sample games
  const games = [
    {
      player1Id: alice.id,
      player2Id: bob.id,
      player1Score: 21,
      player2Score: 19,
      winnerId: alice.id,
      playedAt: new Date('2024-01-15T10:00:00Z'),
    },
    {
      player1Id: charlie.id,
      player2Id: diana.id,
      player1Score: 18,
      player2Score: 21,
      winnerId: diana.id,
      playedAt: new Date('2024-01-15T11:00:00Z'),
    },
    {
      player1Id: alice.id,
      player2Id: charlie.id,
      player1Score: 21,
      player2Score: 15,
      winnerId: alice.id,
      playedAt: new Date('2024-01-16T09:00:00Z'),
    },
    {
      player1Id: bob.id,
      player2Id: diana.id,
      player1Score: 21,
      player2Score: 21,
      winnerId: null, // Tie game
      playedAt: new Date('2024-01-16T14:00:00Z'),
    },
    {
      player1Id: alice.id,
      player2Id: diana.id,
      player1Score: 19,
      player2Score: 21,
      winnerId: diana.id,
      playedAt: new Date('2024-01-17T10:00:00Z'),
    },
  ]

  for (const game of games) {
    await prisma.game.upsert({
      where: {
        id: `${game.player1Id}-${game.player2Id}-${game.playedAt.getTime()}`,
      },
      update: {},
      create: {
        player1Id: game.player1Id,
        player2Id: game.player2Id,
        player1Score: game.player1Score,
        player2Score: game.player2Score,
        winnerId: game.winnerId,
        playedAt: game.playedAt,
      },
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
