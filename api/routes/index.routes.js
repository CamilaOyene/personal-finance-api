import { Router } from "express";

//importamos todas las rutas
 import authRouter from './auth.routes.js';
 import categoryRouter from './category.routes.js';
 import accountRouter from './account.routes.js';
 import transactionRouter from "./transaction.routes";

 const router = Router();

 router.use('/auth',authRouter);
 router.use('/categories',categoryRouter);
 router.use('/accounts', accountRouter);
 router.use('/transactions', transactionRouter);

 export default router;