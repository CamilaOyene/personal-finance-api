import { Router } from 'express';

//Para rutas protegidas
import authMiddleware from '../middlewares/verifyToken.authMiddleware.js';

//importar controllers
import createTransaction from '../controllers/transaction/createTrasaction.controller.js';
import getAllTransactions from '../controllers/transaction/getAllTransactions.controller.js';
import getTransactionById from '../controllers/transaction/getTransactionById.controller.js';
import updateTransaction from '../controllers/transaction/updateTransaction.controller.js';
import deleteTransaction from '../controllers/transaction/deleteTransaction.controller.js';

//Router
const transactionRouter = Router();

//Todas las rutas requieren autenticación;
transactionRouter.use(authMiddleware);

//Crear nueva categoría 
transactionRouter.post('/', createTransaction);

//Obtener todas las categorias de un usuario
transactionRouter.get('/', getAllTransactions);

//Obtener categoría por ID
transactionRouter.get('/:id', getTransactionById);

//Actualizar una categoría por ID
transactionRouter.put('/:id', updateTransaction);

//Elimina una categoría por ID
transactionRouter.delete('/:id', deleteTransaction);

export default transactionRouter;

