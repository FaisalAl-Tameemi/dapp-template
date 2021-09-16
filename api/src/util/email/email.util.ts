import * as path from 'path'
import * as Joi from 'joi'
import * as ejs from 'ejs'
import * as nodemailer from 'nodemailer'
import * as sendgrid from 'nodemailer-sendgrid-transport'
import * as promisify from 'promisify-es6'

import logger from '../log.util'
import config from '../../config'

import { emailPayloadSchema } from './email.util.validations'

const auth = {
  auth: {
    api_key: config.SENDGRID_API_KEY
  },
}

const renderTemplate = promisify(ejs.renderFile)

export const nodemailerSendgrid = nodemailer.createTransport(sendgrid(auth))

export enum EmailTemplateTypes {
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password',
  FORGOT_USERNAME = 'forgot-username',
}

export enum EmailTemplateRenderTypes {
  HTML = 'html',
  TEXT = 'text',
}

export interface EmailRecipient {
  name: string,
  address: string,
}

export interface IEmailLocals {
  title: string,
  body: string,
  linkTitle?: string,
  linkUrl?: string,
  name?: string,
}

export interface IEmailRequestPayload {
  from?: string,
  to: string | EmailRecipient[],
  cc?: string,
  bcc?: string,
  subject: string,
  template: EmailTemplateTypes,
  templateType: EmailTemplateRenderTypes,
  locals?: IEmailLocals,
  attachments?: any[],
  replyTo?: string,
}

export const sendEmail = async (payload: IEmailRequestPayload) => {
  // validate the email request schema
  return Joi
    .validate(payload, emailPayloadSchema)
    .then(async (validatedPayload) => {
      const templatePath = path.resolve(
        __dirname,
        'templates',
        validatedPayload.template,
        `${validatedPayload.templateType}.ejs`
      )

      // render the template via EJS        
      return {
        renderedTemplate: await renderTemplate(templatePath, validatedPayload.locals),
        payload: validatedPayload
      }
    })
    .then(({ renderedTemplate, payload }) => {
      // send the email via sendgrid transport
      return nodemailerSendgrid
        .sendMail({
          ...payload,
          [payload.templateType]: renderedTemplate,
        })
        .then((resp) => {
          logger.debug(`Email has been sent to ${payload.to}`)
          return resp
        })
    })
}
