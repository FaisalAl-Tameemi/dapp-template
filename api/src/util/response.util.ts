import { Response } from 'express'

import logger from './log.util'
import IHigherOrderFunc from 'typings/IHigherOrderFunction'

/**
 * A set of higher order methods that can be used as a catch all at the end of a promise
 * and will respond with a standard structure to the client
 */
export default class ResponseUtil {
    static handleNotFound = (res: Response, statusCode: number = 404): IHigherOrderFunc => {
        return (data: object|undefined|null) => {
            if (!data) {
                return res.status(statusCode).json({
                    error: {
                        message: 'Data not found'
                    }
                })
            }

            return data
        }
    }

    static handleResponse = (res: Response, statusCode: number = 200): IHigherOrderFunc => {
        return (data: object) => {
            logger.error('@handleResponse', data)

            res.status(statusCode).json({ data })
        }
    }

    static handleError = (res: Response, statusCode: number = 500): IHigherOrderFunc => {
        return (error: Error) => {
            logger.error('@handleError', error)

            res.status(statusCode).json({
                error: error.message || error
            })
        }
    }
}
