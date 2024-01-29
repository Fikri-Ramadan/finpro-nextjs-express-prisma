import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { CategoryController } from '../controllers/category.controller';
import { Router } from 'express';

export class CategoryRouter {
  private router: Router;
  private authMiddleware: AuthMiddleware;
  private categoryController: CategoryController;
  constructor() {
    this.router = Router();
    this.authMiddleware = new AuthMiddleware();
    this.categoryController = new CategoryController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.post('/',
      this.authMiddleware.verifyToken,
      this.authMiddleware.adminOnly,
      this.categoryController.createCategory);
    this.router.get('/', this.categoryController.getAllCategories);
  }
  public getRouter(): Router {
    return this.router;
  }
}
