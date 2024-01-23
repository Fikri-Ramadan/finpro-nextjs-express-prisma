import { UserController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { Router } from "express";

export class UserRouter {
  private router: Router;
  private userController: UserController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/points',
      this.authMiddleware.verifyToken,
      this.userController.getPoints);
    this.router.get('/', 
    this.authMiddleware.verifyToken,
    this.userController.getUsers)
  }

  getRouter() {
    return this.router;
  }
}