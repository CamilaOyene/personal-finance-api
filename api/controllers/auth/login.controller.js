import loginUser from '../../services/auth/login.services';

/**
 * 
 * @route POST /api/auth/login
*/

//============================
//      INICIO DE SESIÓN
//============================

const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            ...result
        })
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
export default login