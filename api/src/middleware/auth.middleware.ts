import { Request, Response } from 'express';
import * as expressJWT from 'express-jwt';
import * as jwt from 'jsonwebtoken';
import * as boom from 'boom';

import { User } from '../db';
import config from '../config';
import logger from '../util/log.util';
import ResponseUtil from '../util/response.util';

import { userRoleTypes } from '../db/models/User/User.model';
import {
  AuthToken,
  decodeJwtToken,
  TokenTypes
} from '../util/token/token.util';

const authMiddleware = expressJWT({
  secret: config.JWT_SECRET,
  credentialsRequired: true,
  // A method to extract the token from the request object
  getToken: function fromHeaderOrQuerystring(req: Request): string | null {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }

    return null;
  }
});

export const requiredAuthWithRole = (roles: userRoleTypes[]) => {
  return (req: Request, res: Response, next: Function): void => {
    // TODO: implement
    next();
  };
};

/**
 * This method replicates what is being done using 'express-jwt' package
 * in the method above (authMiddleware) but using only the 'jsonwebtoken'
 * package. It is intended to replace the method above.
 *
 * It also does more than the method above since it will also attach
 * the full user object from the DB.
 */
export const requireAuth = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void> => {
  let token: string;
  const userErr = boom.unauthorized('Missing or invalid token');

  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  } else {
    return ResponseUtil.handleError(res, 401)(userErr);
  }

  try {
    const decodedToken: AuthToken = await decodeJwtToken(
      token,
      TokenTypes.AUTH
    );

    req['decodedToken'] = decodedToken;
    req['user'] = await User.findByPk(decodedToken.id);

    if (!req['user']) {
      // token considered invalid if no user can be found
      // in the database that is associated to it
      return ResponseUtil.handleError(res, 401)(userErr);
    }

    return next();
  } catch (decodeError) {
    logger.error('@requireAuth', decodeError);
    return ResponseUtil.handleError(res, 401)(userErr);
  }
};

export const requireAuthRefresh = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void> => {
  let token: string;
  const userErr = boom.unauthorized('Missing or invalid token');

  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  } else {
    return ResponseUtil.handleError(res, 401)(userErr);
  }

  try {
    const decodedToken: AuthToken = await decodeJwtToken(
      token,
      TokenTypes.REFRESH
    );

    req['decodedToken'] = decodedToken;
    req['user'] = await User.findByPk(decodedToken.id);

    if (!req['user']) {
      // token considered invalid if no user can be found
      // in the database that is associated to it
      return ResponseUtil.handleError(res, 401)(userErr);
    }

    return next();
  } catch (decodeError) {
    logger.error('@requireAuth', decodeError);
    return ResponseUtil.handleError(res, 401)(userErr);
  }
};

export default authMiddleware;
