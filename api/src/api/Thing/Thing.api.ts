import {default as express, Router} from 'express'
import authMiddleware from '../../middleware/auth.middleware'
import { Thing, User } from '../../db'
import { thingEmitter, thingEventTypes } from './Thing.api.events'

const router = Router()

interface AuthedUser {
    id: string,
    email: string,
}

router.get('/',  async (req: express.Request, res: express.Response) => {
    res.json(await Thing.findAll({
        include: [{
            model: User,
            as: 'owner'
        }]
    }))
})

router.post('/', authMiddleware, async (req: express.Request, res: express.Response) => {
    try {
        const user: AuthedUser = req['user']

        const newThing = await Thing.create({
            ...req.body,
            ownerId: user.id,
        })

        thingEmitter.emit('message', newThing.id, user.id, thingEventTypes.CREATE)

        return res.status(201).json(newThing)
    }
    catch (e) {
        return res.status(400).json({
            message: e.message,
        })
    }
})

export default router
