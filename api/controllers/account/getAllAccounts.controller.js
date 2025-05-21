import getAllAccounts from "../../services/account/getAllAccounts.services.js";

/**
 * Obtiene todas las cuentas del usuario autenticado
 * @route GET /api/accounts
 */

const getAllAccountsController = async (req, res) => {
    try {
        const userId = req.user.id;
        const accounts = await getAllAccounts(userId);
        res.status(200).json({ accounts });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default getAllAccountsController;