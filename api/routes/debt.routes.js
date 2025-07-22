import { Router } from 'express';
import authMiddleware from '../middlewares/verifyToken.authMiddleware.js';
import createDebt from '../controllers/debts/createDebt.controller.js';
import getAllDebts from '../controllers/debts/getAllDebts.controller.js';
import getDebtById from '../controllers/debts/getDebtById.controller.js';
import updateDebt from '../controllers/debts/updateDebt.controller.js';
import deleteDebt from '../controllers/debts/deleteDebt.controller.js';

const debtRouter = Router();

debtRouter.use(authMiddleware);

//Crear nueva deuda
debtRouter.post('/', createDebt);

//Obtener todas las deudas del usuario
debtRouter.get('/', getAllDebts);

//Obtener deuda específica
debtRouter.get('/:id', getDebtById);

// Actualizar deuda por ID
debtRouter.put('/:id', updateDebt);

//Eliminar deuda por ID 
debtRouter.delete('/:id', deleteDebt);

export default debtRouter;