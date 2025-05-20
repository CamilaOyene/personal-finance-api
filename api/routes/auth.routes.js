import { Router } from 'express';
const authRouter = Router();

//Importamos controladores de autenticación
import { register } from '../controllers/auth/register.controller.js';
import { login } from '../controllers/auth/login.controller.js';

//Ruta para registrar un nuevo usuario
authRouter.post('/auth/register', register);

//Ruta para iniciar sesión 
authRouter.post('/auth/login', login);

export default authRouter;