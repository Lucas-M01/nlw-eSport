import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient({
    log: ['query']
})

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })

    return res.json(games)
})

app.post('./ads', (req, res) => {
    return res.status(201).json([])
})

app.get('/game/:id/ads', async (req, res) => {
    const gameId = req.params.id;
    const ads = await prisma.ad.findMany({
        where: {
            gameId,
        }
    })
    return res.json(ads)
})

app.get('/ads/:id/discord', (req, res) => {

    return res.json([])
})

app.listen(3333)