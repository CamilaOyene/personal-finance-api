import { Router } from 'express';

//Para rutas protegidas
import authMiddleware from '../middlewares/verifyToken.authMiddleware.js';

//importar controllers
import createAccount from '../controllers/account/createAccount.controller.js';
import getAllAccounts from '../controllers/account/getAllAccounts.controller.js';
import getAccountById from '../controllers/account/getAccountById.controller.js';
import updateAccount from '../controllers/account/updateAccount.controller.js';
import deleteAccount from '../controllers/account/deleteAccount.controller.js';

//Router
const accountRouter = Router();

//Todas las rutas requieren autenticación;
accountRouter.use(authMiddleware);

//Crear nueva categoría 
accountRouter.post('/', createAccount);

//Obtener todas las categorias de un usuario
accountRouter.get('/', getAllAccounts);

//Obtener categoría por ID
accountRouter.get('/:id', getAccountById);

//Actualizar una categoría por ID
accountRouter.put('/:id', updateAccount);

//Elimina una categoría por ID
accountRouter.delete('/:id', deleteAccount);

export default accountRouter;

