import User from '../../models/User.js';
import  generateToken  from '../../helpers/jwt.js';

//Inicia sesión verificando las credenciales y devolviendo un token
/**
 * @param {Object} loginData - Objeto con email y password
 * @returns {Object} Objeto con el token y datos del usuario.
 */

const loginUser = async (loginData) => {
    //Desestructurar loginData(reqbody)
    const { email, password } = loginData;

    //Buscar el usuario por email
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    //Comparar la contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }

    //Generar el token
    const token = generateToken({ userId: user._id });

    //Devolver un usuario y token

    const { password: _, ...userWhithoutPassword } = user.toObject();

    return {
        token,
        user: userWhithoutPassword
    };
};

export default loginUser