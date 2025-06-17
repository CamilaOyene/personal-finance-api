import getAccountById from "../../services/account/getAccountById.services.js";

/**
 * Obtiene una cuenta especificada por ID del usuario autenticado
 * @route GET /api/accounts/:id
*/

const getAccountByIdController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const account = await getAccountById(req.params.id, userId);
        res.status(200).json({ account });
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}



export default getAccountByIdController;