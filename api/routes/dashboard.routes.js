import { Router } from 'express';
import getDashboardController from '../controllers/dashboard/getDashboardData.controller';
import authMiddleware from '../middlewares/verifyToken.authMiddleware';

const dashboardRouter = Router();

//Ruta protegida para ver datos del dashboard
dashboardRouter.get('/', authMiddleware, getDashboardController);


export default dashboardRouter;