import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { getManager } from 'typeorm';

import { User } from '../../Domain/User/User';
import { IRequest } from '../../Utils/Request/custom';

/**
 * Show REST info in logs
 */
export function loggerMiddleware(req: express.Request, res: any, next: any): void {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  console.log(`[${req.method}]: ${fullUrl}`);

  next();
}

export function jsonMiddleware(req: express.Request, res: any, next: any): void {
  res.set('Content-Type', 'application/json');
  res.set('X-Items-Count', '1');
  next();
}

export function authMiddleware(req: IRequest, res: any, next: any): void {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(401).send({ errorMessage: 'not authorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(500).send({ errorMessage: 'token expired' });
        return;
      }
      res.status(500).send({ errorMessage: error.message });
      return;
    }

    if (!decoded || !decoded.id) {
      res.status(401).send({ errorMessage: 'not authorized' });
      return;
    }

    const entityManager = getManager();

    entityManager
      .createQueryBuilder(User, 'u')
      .where('u.id = :id')
      .setParameter('id', decoded.id)
      .getOne()
      .then((user: User) => {
        req.user = user;

        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send({ errorMessage: 'not authorized' });
      });
  });
}
