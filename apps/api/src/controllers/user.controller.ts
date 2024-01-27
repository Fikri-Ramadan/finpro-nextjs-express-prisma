import prisma from '../lib/prisma';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

interface IGetUserInfoRequest extends Request {
  user?: User;
}

export class UserController {
  async getPoints(req: IGetUserInfoRequest, res: Response, next: NextFunction) {
    try {
      const totalUsedReferral = await prisma.referralUsage.findMany({
        where: {
          AND: {
            referralCode: {
              userId: req.user?.id,
            },
            expiryDate: {
              gt: new Date(),
            },
            usageDate: null,
          },
        },
      });

      const points = totalUsedReferral.length * 10000;

      return res.status(200).json({
        success: true,
        results: points,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: IGetUserInfoRequest, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user?.id,
        },
      });

      return res.status(200).json({
        success: true,
        results: user
      });
    } catch (error) {
      next(error);
    }
  }

  async getCoupons(req: IGetUserInfoRequest, res: Response, next: NextFunction) {
    try {
      const coupons = await prisma.coupon.findMany({
        where: {
          AND: {
            userId: req.user?.id,
            expiryDate: {
              gt: new Date(),
            },
            transactionId: null
          }
        }
      });

      return res.status(200).json({
        success: true,
        results: coupons,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTransactions(req: IGetUserInfoRequest, res: Response, next: NextFunction) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          userId: req.user?.id,
        }
      });

      return res.status(200).json({
        success: true,
        results: transactions
      });
    } catch (error) {
      next(error);
    }
  }
}