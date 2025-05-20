//Importo modelo de usuario
const User = require('../models/User');

//Impoto jsonwebtoken para generar tokens de autenticación
const jwt = require('jsonwebtoken');

//============================
//    REGISTRO DE USUARIO
//============================

const register = async (req, res) => {
    try {
        //Extraigo los datos del cuerpo de la petición
        const { username, email, password } = req.body;
        //Verificó si ya existe un usuario con ese email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado.' })
        }
        //Creo una nueva instancia del usuario
        const newUser = new user({ username, email, password });

        //Guardo el nuevo usuario(se encripta la contraseña automáticamente en el modelo).
        await newUser.save();

        //Retorno el usuario creado(sin mostrar la contraseña)
        res.status(201).json({
            message: 'Usuario registrado correctamente.',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.log('Error en auth.controllers - register', error)
        res.status(500).json({ messagge: 'Error interno del servidor.' })
    }
};




//============================
//      INICIO DE SESIÓN
//============================

const login = async (req, res) => {
    try {
        //Extraemos los datos del cuerpo de la petición
        const { email, password } = req.body;

        //Buscamos un usuario con ese email
        const user = await User.findOne({ email });

        //Si no tengo usuario devuelvo mensaje de error.
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        //Comparamos la contraseña ingresada con la almacenada ya encriptada
        const isMatch = await user.comparePassword(password);

        //Si no coincide, devuelvo mensaje de error
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        //Generamos un token JWT para autenticar al usuario
        const token = jwt.sign(
            { userId: user._id },
            proccess.env.JWT_SECRET || 'secretkey', //Usar variable de entorno idealmente 
            { expiresIn: '7d' } // Expira en 7 días.     
        );

        //Respondemos con el token y los datos del usuario
        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        constole.error('Error en auth.controllers.js login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


module.exports = {
    register,
    login
}