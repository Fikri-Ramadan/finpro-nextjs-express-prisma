import { EventController } from '../controllers/event.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;
  private authMiddleware: AuthMiddleware;
  constructor() {
    this.router = Router();
    this.eventController = new EventController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.post(
      '/',
      this.authMiddleware.verifyToken,
      this.authMiddleware.organizerOnly,
      this.eventController.createEvent,
    );

    this.router.get('/', this.eventController.getAllEvent);

    this.router.get('/organizer',
      this.authMiddleware.verifyToken,
      this.authMiddleware.organizerOnly,
      this.eventController.getEventByOrganizer);

    this.router.get('/:id', this.eventController.getEventById);
  }
  public getRouter(): Router {
    return this.router;
  }
}
