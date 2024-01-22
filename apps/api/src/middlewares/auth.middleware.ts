import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IGetUserInfoRequest extends Request {
  user?: User;
}

export class AuthMiddleware {
  async verifyToken(
    req: IGetUserInfoRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'token not found',
        });
      }

      const verifiedUser = verify(token, process.env.JWT_SECRET as string);

      if (!verifiedUser) {
        return res.status(401).json({
          success: false,
          message: 'invalid token',
        });
      }

      req.user = verifiedUser as User;

      next();
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
  async organizerOnly(
    req: IGetUserInfoRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (req.user?.role !== 'ORGANIZER') {
        return res.status(403).json({
          success: false,
          message: 'forbidden access',
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
