import deleteAccount from '../../services/account/deleteAccount.services.js';

/**
 * Elimina una cuenta del usuario autenticado
 * @route DELETE /api/accounts/:id
 */


const deleteAccountController = async (req, res) => {
    try {
        const userId = req.user.id;
        const deleted = await deleteAccount(req.params.id, userId);
        res.status(200).json({ message: 'Cuenta eliminada', account: deleted });
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};


export default deleteAccountController;