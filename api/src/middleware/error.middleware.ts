import { Request, Response } from 'express'
import { UnauthorizedError } from 'express-jwt'

import logger from '../util/log.util'

interface ErrorObject {
    message: string,
    name?: string
    code?: string|number
    status?: number
    inner?: object
}

const errorHandler = function (err: ErrorObject, req: Request, res: Response, next: Function) {
    logger.error(err)

    if (err.name === 'UnauthorizedError' || err.code === 'credentials_required') {
        res.status(401).json({
            message: 'invalid token'
        })
    }
}

export default errorHandler