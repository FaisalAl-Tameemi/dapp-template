import * as Joi from 'joi'
import config from '../../config'

export const emailPayloadSchema = Joi.object().keys({
    from: Joi.string().email().optional().default(config.email.DEFAULT_SENDER),
    to: [
      Joi.string().email().required(),
      Joi
        .array()
        .items(Joi.object().keys({
          name: Joi.string().required(),
          address: Joi.string().email().required(),
        })),
    ],
    cc: Joi.string().optional(),
    bcc: Joi.string().optional(),
    subject: Joi.string().min(5).max(100).required(),
    template: Joi.string().required(),
    locals: Joi.object().optional().default({}),
    templateType: Joi.string().optional().default('text'),
    attachments: Joi
      .array()
      .items(Joi.object().keys({}).unknown())
      .optional(),
    replyTo: Joi.string().email().optional().default(config.email.NO_REPLY),
  })