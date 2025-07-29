import { Router } from 'express';
import authMiddleware from '../middlewares/verifyToken.authMiddleware.js';
import createDebtController from '../controllers/debts/createDebt.controller.js';
import getAllDebtsController from '../controllers/debts/getAllDebts.controller.js';
import getDebtByIdController from '../controllers/debts/getDebtById.controller.js';
import updateDebtController from '../controllers/debts/updateDebt.controller.js';
import deleteDebtController from '../controllers/debts/deleteDebt.controller.js';
import markDebtAsPaidController from '../controllers/debts/markDebtAsPaid.controller.js';

const debtRouter = Router();

debtRouter.use(authMiddleware);

//Crear nueva deuda
debtRouter.post('/', createDebtController);

//Obtener todas las deudas del usuario
debtRouter.get('/', getAllDebtsController);

//Obtener deuda específica
debtRouter.get('/:id', getDebtByIdController);

// Actualizar deuda por ID
debtRouter.put('/:id', updateDebtController);

//Eliminar deuda por ID 
debtRouter.delete('/:id', deleteDebtController);

//Actualizar a pagada
debtRouter.patch('/:id/pay', markDebtAsPaidController);

export default debtRouter;