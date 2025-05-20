//Importar esquema de modelo User
import User from '../../models/User.js';


/**
 * Registra un nuevo usuario en la base de datos 
 * @param {Object} userData - Objeto con username, email y password
 * @returns {Object} El usuario creado sin la contraseña.
 */

const registerUser = async (userData) => {
    //Desestructuración de userData(reqbody)
    const { username, email, password } = userData;

    //Verificar si ya existe un usuario con el mismo email 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('El email ya está registrado');
    }

    //Crea el nuevo usuario 
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();

    //No devolvemos la contraseña
    const { password: _, ...userWhithoutPassword } = savedUser.toObject();
    return userWhithoutPassword;
};


export default registerUser