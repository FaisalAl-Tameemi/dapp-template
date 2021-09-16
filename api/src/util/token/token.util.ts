import * as jwt from 'jsonwebtoken'
import logger from '../log.util'

import config from '../../config'


export const JWT_SECRETS: object = {
    'auth': config.JWT_SECRET,
    'refresh': config.JWT_SECRET,
    'password-reset': config.JWT_SECRET,
    'verify-email': config.JWT_SECRET,
}

export enum TokenTypes {
    AUTH = 'auth',
    REFRESH = 'refresh',
    PASSWORD_RESET = 'password-reset',
    VERIFY_EMAIL = 'verify-email'
}

export interface DecodedToken {
    id?: string,
    expiresOn?: string|number,
}

export interface AuthToken extends DecodedToken {
    userId?: string,
}

/**
 * Given a JWT token, returns the decoded token or throws if the token is not valid.
 */
export const decodeJwtToken = async (token: string, type: TokenTypes): Promise<DecodedToken|AuthToken> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRETS[type], async (err: Error|null, decodedToken: any) => {
            if (err || (!decodedToken.userId && !decodedToken.id)) {
                logger.debug('@decodeJsonToken', err);
                return reject(new Error('Invalid or expired token'))
            }
    
            return resolve(decodedToken)
        });
    })
}

/**
 * Given an object and a type of secret, generate a JWT token.
 */
export const encodeJwtToken = async (data: object|any, type: TokenTypes, options: object = {}): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(data, JWT_SECRETS[type], options, async (err: Error|null, token: any) => {
            if (err) {
                logger.debug('@encodeJwtToken', err);
                return reject(err)
            }
    
            return resolve(token)
        });
    })
}
