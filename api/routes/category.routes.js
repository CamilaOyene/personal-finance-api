import { Router } from 'express';

//Para rutas protegidas
import authMiddleware from '../middlewares/verifyToken.authMiddleware.js';

//importar controllers
import createCategory from '../controllers/category/createCategory.controller.js';
import getAllCategories from '../controllers/category/getAllCategories.controller.js';
import getCategoryById from '../controllers/category/getCategoryById.controller.js';
import updateCategory from '../controllers/category/updateCategory.controller.js';
import deleteCategory from '../controllers/category/deleteCategory.controller.js';

//Router
const categoryRouter = Router();

//Todas las rutas requieren autenticación;
categoryRouter.use(authMiddleware);

//Crear nueva categoría 
categoryRouter.post('/', createCategory);

//Obtener todas las categorias de un usuario
categoryRouter.get('/', getAllCategories);

//Obtener categoría por ID
categoryRouter.get('/:id', getCategoryById);

//Actualizar una categoría
categoryRouter.put('/:id', updateCategory);

//Elimina una categoría por ID
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;

