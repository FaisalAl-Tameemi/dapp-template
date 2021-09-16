import * as express from 'express'
import * as socketio from 'socket.io'
import * as bodyParser from 'body-parser'
import * as http from 'http'

import ThingRouter from './Thing'
import UserRouter from './User'

import config from '../config'
import errorMiddleware from '../middleware/error.middleware'
import logger from '../util/log.util'

const app = express()

app.set('PORT', config.PORT)

// middleware
app.use(bodyParser.json())

// health check route
app.get('/', (req: express.Request, res: express.Response) => res.json({ ok: 1 }))

// routers
app.use('/things', ThingRouter)
app.use('/users', UserRouter)

// error handling middleware
app.use(errorMiddleware)

// initialize sockets if enabled
if (config.ENABLE_SOCKETS === true) {
    const httpServer = new http.Server(app)
    const io = socketio(httpServer, {
        path: '/sockets'
    })

    io.on('connection', (socket: any) => {
        logger.info('@sockets', { message: 'Client connected!' })

        socket.on('disconnect', () => {
            logger.info('@sockets', { message: 'Client disconnected...' })
        })
    })

    // if sockets are enabled, we must listen with the httpServer, rather than
    // using only the express server
    httpServer.listen(config.PORT, () => {
        console.log(`server started on port ${config.PORT}`)
    })
}
else {
    // otherwise listen using Express server only
    app.listen(config.PORT, () => {
        console.log(`server started on port ${config.PORT}`)
    })
}
