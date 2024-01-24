/**************************************************************************************
 *  Goal: API REST utiilizando TS
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

import Express, { Router, Request, Response } from 'express'
import cors from 'cors'

const app = Express()
const PORT = 8080
const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS, PATCH'
}

app.use(Express.json())
app.use(cors(corsOptions))

const userRoutes = require('./routes/userRoutes')
app.use('/v1/user', userRoutes)

const personRoutes = require('./routes/personRoutes')
app.use('/v1/person', personRoutes)

const contactRoutes = require('./routes/contactRoutes')
app.use('/v1/contact', contactRoutes)

const contactTypeRoutes = require('./routes/contactTypeRoutes')
app.use('/v1/contact-type', contactTypeRoutes)

app.listen(PORT, () => {
    console.log('====================================')
    console.log(`Server is running: ${PORT}`)
    console.log('====================================')
})