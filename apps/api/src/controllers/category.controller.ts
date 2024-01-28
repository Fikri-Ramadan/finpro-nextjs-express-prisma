import prisma from '../lib/prisma';
import { Request, Response, NextFunction } from 'express';


export class CategoryController {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const category = await prisma.category.create({
        data: {
          name,
        },
      });

      return res.status(201).json(category);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await prisma.category.findMany({});

      return res.status(200).json({
        success: true,
        results: categories,
      });
    } catch (error) {
      next(error);
    }
  }
}
