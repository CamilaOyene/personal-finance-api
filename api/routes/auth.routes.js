const express = require('express');
const router = express.Router();

const authRouter = router
//Importamos el controlador de autenticación
const authController = require/('../controllers/auth.controllers.js');

//Ruta para registrar un nuevo usuario
authRouter.post('/register',authController.register);

//Ruta para iniciar sesión 
authRouter.post('/login', authController.login);

module.exports = authRouter;