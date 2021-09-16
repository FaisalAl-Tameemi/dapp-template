import { Request, Response } from 'express'
import * as Joi from 'joi'
import * as Boom from 'boom'
import logger from './log.util'
import { ErrorCodes } from './error.util'
import config from '../config'

export enum RequestPartType {
  BODY = 'body',
  PARAMS = 'params',
  QUERY = 'query',
  FILES = 'files'
}

export interface ParsedJoiError {
  message: string
  code: number
  field: string
}

const parseJoiError = (error) => {
  try {
    const parsedError: ParsedJoiError = JSON.parse(error.message)
    return {
      message: parsedError.message,
      code: parsedError.code || ErrorCodes.UNKNOWN,
      details: [{
        path: parsedError.field,
        code: parsedError.code || ErrorCodes.UNKNOWN,
        message: parsedError.message,
      }],
    }
  }
  catch (e) {
    return {
      message: error.message,
      code: ErrorCodes.UNKNOWN
    }
  }
}

export const validateRequest = (
  requestPart: RequestPartType,
  schema: Joi.Schema
) => {
  return (req: Request, res: Response, next: Function) => {
    schema
      .validate(req[requestPart])
      .then(() => next())
      .catch(err => next(parseJoiError(err)))
  }
}

export const pagingSchema = Joi.object({
  offset: Joi.number()
    .optional()
    .default(0),
  limit: Joi.number()
    .optional()
    .default(config.DEFAULT_PAGING_LIMIT)
})

export const pagingDatesSchema = pagingSchema.keys({
  before: Joi.date().optional(),
  after: Joi.date().optional(),
  limit: Joi.number().optional(),
})
