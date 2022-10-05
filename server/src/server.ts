import express from 'express'
import { PrismaClient } from '@prisma/client'
import { convertHoursStringToMinutes } from './utils/convert-to-minutes'
import { convertMinutesToHoursString } from './utils/convert-to-hours'
import axios from 'axios'
import url from 'url'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

let accessToken = ''; 
let refreshToken = '';


app.get('/auth/redirect', async (req, res) => {
    const { code } = req.query
    if(code) {
        try {
            const formData = new url.URLSearchParams({
                    client_id: "1024336310468620348",
                    client_secret:"4HxmzRgjdmGqH9TzunV6nk0m5QNuTe95",
                    grant_type: "authorization_code",  
                    code: code.toString(),
                    redirect_uri: "http://localhost:3333/auth/redirect"
            })
            const response = await axios.post('https://discord.com/api/v8/oauth2/token', formData.toString(),
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }
        )
            const { access_token, refresh_token } = response.data
            accessToken = access_token
            refreshToken = refresh_token
            res.send(200)
        }catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
        
    }
})

app.get('/api/auth/user', async (req, res) => {
    try {
        const response = await axios.get('https://discord.com/api/v8/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        res.send(response.data)
    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
})

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

app.get('/game/:id', async (req, res) => {
    const gameId = req.params.id
    const game = await prisma.game.findMany({
        select: {
            id: true,
            title: true,
            bannerUrl: true,
            about: true,
            tags: true,
            link: true,
        },
        where: {
            id: gameId
        }
    })

    return res.json(game)
})

app.post('/games/:id/ads', async (req, res) => {
    try {
        const gameId = String(req.params.id)
        const body: any = req.body
        if(!body.name){
            throw new Error('Nome não informado')
        }
    
        if(!body.discord){
            throw new Error('Discord não informado')
        }
    
        if(!body.weekDays){
            throw new Error('Dias disponibilidade não informado')
        }
    
        if(!body.hourStart){
            throw new Error('Horário de início não informado')
        }
    
        if(!body.hourEnd){
            throw new Error('Horário Final não informado')
        }
    
        const ad = await prisma.ad.create({
            data: {
                gameId,
                name: body.name,
                weekDays: body.weekDays.join(','),
                useVoiceChannel: body.useVoiceChannel,
                yearsPlaying: body.yearsPlaying,
                hourStart: convertHoursStringToMinutes(body.hourStart),
                hourEnd: convertHoursStringToMinutes(body.hourEnd),
                discord: body.discord
            }
        })
    
        return res.status(201).json(ad)
    } catch (err) {
        console.error(err)
        return res.status(500).end(err)
    }
})

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            discord: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHoursString(ad.hourStart),
            hourEnd: convertMinutesToHoursString(ad.hourEnd)
        }
    }))
})

app.get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId
        }
    })
    return res.json({
        discord: ad.discord
    })
})

app.listen(3333)