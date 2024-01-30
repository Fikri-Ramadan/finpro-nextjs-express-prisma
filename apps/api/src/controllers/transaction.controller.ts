import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import prisma from "src/lib/prisma";

interface IError extends Error {
  statusCode?: number;
}

interface IGetUserInfoRequest extends Request {
  user?: User,
}

export class TransactionController {
  async createTransaction(req: IGetUserInfoRequest, res: Response, next: NextFunction) {
    try {
      const payload = {
        eventId: req.body?.eventId,
        userId: req.user?.id as string,
        date: new Date()
      };

      const existingEvent = await prisma.event.findUnique({
        where: {
          id: payload.eventId,
        }
      });

      if (!existingEvent) {
        return res.status(404).json({
          success: false,
          message: "event not found"
        });
      }

      if (existingEvent.availableSeat <= 0) {
        return res.status(400).json({
          success: false,
          message: 'ticket sold out',
        });
      }

      const transaction = await prisma.$transaction(async (tx) => {
        if (existingEvent.eventType === 'FREE') {
          const trans = await tx.transaction.create({
            data: {
              userId: payload.userId,
              eventId: payload.eventId,
              date: payload.date
            }
          });

          await tx.event.update({
            where: {
              id: trans.eventId
            },
            data: {
              availableSeat: {
                decrement: 1
              }
            }
          });

          return trans;
        } else if (existingEvent.eventType === 'PAID') {
          const trans = await tx.transaction.create({
            data: {
              userId: payload.userId,
              eventId: payload.eventId,
              date: payload.date
            },
            include: {
              event: true
            }
          });

          let price = trans.event.price as number;

          if (req.body?.couponId) {
            const coupon = await tx.coupon.findUnique({
              where: {
                id: req.body?.couponId,
                expiryDate: {
                  gt: new Date()
                },
                transaction: null,
                userId: payload.userId
              }
            });

            if (!coupon) {
              const err = new Error('invalid CouponId') as IError;
              err.statusCode = 400;
              throw err;
            }

            await tx.transaction.update({
              where: {
                id: trans.id,
              },
              data: {
                discountApplied: coupon.discountPercentage as number,
                coupon: {
                  connect: {
                    id: req.body?.couponId
                  }
                }
              }
            });

            price = price - (price * (coupon.discountPercentage as number) / 100);
          }

          if (req.body?.usedPoint) {
            const points = await tx.point.findMany({
              where: {
                userId: payload.userId,
                expiryDate: {
                  gt: new Date()
                },
                NOT: {
                  point: 0
                }
              },
              orderBy: {
                expiryDate: 'asc'
              }
            });

            const userPoints = points.reduce((acc, curr) => acc + curr.point, 0);

            if (userPoints <= price && userPoints !== 0) {
              await tx.transaction.update({
                where: {
                  id: trans.id
                },
                data: {
                  pointUsed: userPoints
                }
              });

              await tx.point.deleteMany({
                where: {
                  userId: payload.userId
                }
              });

              price = price - userPoints;
            } else if (userPoints > price) {
              await tx.transaction.update({
                where: {
                  id: trans.id
                },
                data: {
                  pointUsed: price
                }
              });

              let priceTemp = price;

              for (let i = 0; i < points.length; i++) {
                let point = points[i];
                if (priceTemp > 0 && priceTemp - point.point >= 0) {
                  priceTemp -= point.point;

                  await tx.point.update({
                    where: {
                      id: point.id
                    },
                    data: {
                      point: point.point - point.point
                    }
                  });
                } else if (priceTemp > 0 && priceTemp - point.point < 0) {
                  await tx.point.update({
                    where: {
                      id: point.id,
                    },
                    data: {
                      point: point.point - priceTemp
                    }
                  });

                  priceTemp -= point.point;
                  break;
                }
              }

              await tx.point.deleteMany({
                where: {
                  point: 0
                }
              });

              price = 0;
            }

          }

          await tx.event.update({
            where: {
              id: trans.eventId
            },
            data: {
              availableSeat: {
                decrement: 1
              }
            }
          });

          return await tx.transaction.update({
            where: {
              id: trans.id,
            },
            data: {
              amountPaid: price
            }
          });
        }
      });

      return res.status(201).json({
        success: true,
        results: transaction,
      });
    } catch (error: any) {
      if (error.statusCode === 400) {
        return res.status(400).json({ success: false, message: error.message });
      }

      next(error);
    }
  }

  async getTransactionByOrganizer(req: IGetUserInfoRequest, res: Response, next: NextFunction) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          event: {
            organizerUserId: req.user?.id,
          }
        },
        include: {
          event: true,
          user: true,
        },
        orderBy: {
          date: 'desc'
        }
      });

      return res.status(200).json({
        success: true,
        results: transactions,
      });
    } catch (error) {
      next(error);
    }
  }
}