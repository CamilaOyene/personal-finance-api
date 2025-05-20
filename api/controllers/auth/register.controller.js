import registerUser from '../../services/auth/register.services';


/**
 * Controlador para registrar un nuevo usuario
 * @route POST /api/auth/register 
*/

//============================
//    REGISTRO DE USUARIO
//============================

const register = async (req, res) => {

    try {
        const user = await registerUser(req.body);
        res.status(201).json({
            message: 'Usuario registrado con éxito.',
            user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default register