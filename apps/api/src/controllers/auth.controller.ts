import { compare, genSalt, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import prisma from "../lib/prisma";
import ShortUniqueId from "short-unique-id";
import { User } from "@prisma/client";

interface IError extends Error {
  statusCode?: number;
}

interface IGetUserInfoRequest extends Request {
  user?: User,
}

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: any = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };

      if (req.body?.role) {
        payload.role = req.body.role;
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          email: payload.email,
        }
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'email is already exist'
        });
      }

      const salt = await genSalt(10);
      const hashedPassword = await hash(payload.password, salt);

      payload.password = hashedPassword;

      const newUser: any = await prisma.$transaction(async (tx) => {
        const { randomUUID } = new ShortUniqueId({ length: 10 });
        const newReferralCode = randomUUID();

        payload.referralCode = {
          create: {
            code: newReferralCode,
          }
        };

        const newUser = await tx.user.create({
          data: {
            ...payload
          },
          include: {
            referralCode: {
              select: {
                id: true,
                code: true,
              }
            }
          }
        });

        if (req.body?.referral) {
          const referrer = await tx.referralCode.findUnique({
            where: {
              code: req.body.referral,
            }
          });

          if (!referrer) {
            const err = new Error('invalid referral code') as IError;
            err.statusCode = 400;
            throw err;
          }

          const threeMonthExpiry = new Date();
          threeMonthExpiry.setMonth(threeMonthExpiry.getMonth() + 3);

          await tx.referralUsage.create({
            data: {
              expiryDate: threeMonthExpiry,
              referralCodeId: referrer.id,
              newUserId: newUser.id,
            }
          });

          await tx.coupon.create({
            data: {
              expiryDate: threeMonthExpiry,
              discountPercentage: 10,
              userId: newUser.id,
            }
          });
        }

        return newUser;
      });

      delete newUser.password;

      return res.status(201).json({
        success: true,
        results: newUser
      });
    } catch (error: any) {
      if (error.statusCode === 400) {
        return res.status(400).json({ success: false, message: error.message });
      }

      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password,
      };

      const existingUser = await prisma.user.findUnique({
        where: {
          email: payload.email,
        }
      });

      if (!existingUser) {
        return res.status(400).json({
          success: false,
          message: "email not found",
        });
      }

      const isValidPassword = await compare(payload.password, existingUser.password);

      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: 'invalid password',
        });
      }

      const token = sign({
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
      }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN });

      return res.status(200).json({
        success: true,
        results: token
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserInfo(req: IGetUserInfoRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      return res.status(200).json({
        success: true,
        results: user
      });
    } catch (error) {
      next(error);
    }
  }
}