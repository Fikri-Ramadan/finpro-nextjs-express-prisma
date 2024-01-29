import { Router } from "express";
import { TransactionController } from "src/controllers/transaction.controller";
import { AuthMiddleware } from "src/middlewares/auth.middleware";

export class TransactionRouter {
  private router: Router;
  private authMiddlaware: AuthMiddleware;
  private transactionController: TransactionController;

  constructor() {
    this.router = Router();
    this.authMiddlaware = new AuthMiddleware();
    this.transactionController = new TransactionController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/',
      this.authMiddlaware.verifyToken,
      this.transactionController.createTransaction);
  }

  getRouter() {
    return this.router;
  }
}