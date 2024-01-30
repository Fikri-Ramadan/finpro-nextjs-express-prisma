import prisma from '../lib/prisma';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

interface IGetUserInfoRequest extends Request {
  user?: User;
}
export class EventController {
  async createEvent(
    req: IGetUserInfoRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.user?.id;
      const {
        name,
        price,
        startEvent,
        endEvent,
        location,
        description,
        availableSeat,
        eventType,
        categoryId,
      } = req.body;
      const newEvent = await prisma.event.create({
        data: {
          organizerUserId: id as string,
          categoryId,
          name,
          price,
          startEvent,
          endEvent,
          location,
          description,
          availableSeat,
          eventType,
          image: '/band.png',
        },
      });

      return res.status(201).json({ success: true, results: newEvent });
    } catch (error: any) {
      next(error);
    }
  }
  async getAllEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: any = {
        where: {},
        orderBy: {
          createdAt: 'desc'
        }
      };
      if (req.query.name) {
        payload.where.name = {
          contains: req.query.name,
        };
      }
      const events = await prisma.event.findMany({ ...payload });

      return res.status(200).json({ success: true, results: events });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const existingEvent = await prisma.event.findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          organizer: { select: { username: true, email: true } },
          category: { select: { name: true } },
        },
      });

      if (!existingEvent) {
        return res
          .status(404)
          .json({ success: false, message: 'event not found' });
      }

      return res.status(200).json({ success: true, results: existingEvent });
    } catch (error) {
      next(error);
    }
  }

  async getEventByOrganizer(req: IGetUserInfoRequest, res: Response, next: NextFunction) {
    try {
      const events = await prisma.event.findMany({
        where: {
          organizerUserId: req.user?.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return res.status(200).json({
        success: true,
        results: events,
      });
    } catch (error) {
      next(error);
    }
  }
}
