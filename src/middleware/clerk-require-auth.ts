import { Injectable, NestMiddleware } from '@nestjs/common';
import {
  ClerkExpressRequireAuth,
  RequireAuthProp,
} from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ClerkMiddlewareRequireAuth implements NestMiddleware {
  use(req: RequireAuthProp<Request>, res: Response, next: NextFunction) {
    ClerkExpressRequireAuth()(req, res, (err) => {
      if (err) {
        console.error(err.stack);
        res.status(401).send('Non autorizzato.');
        return;
      }
      next();
    });
  }
}
