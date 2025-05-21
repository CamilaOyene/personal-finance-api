import updateAccount from '../../services/account/updateAccount.services.js';

/**
 * Actualiza una cuenta del usuario autenticado.
 * @route PUT /api/accounts/:id
 */

const updateAccountController = async (req,res) => {
    try {
        const userId = req.user.id;
        const updated = await updateAccount(req.params.id, req.body, userId)
        res.status(200).json({message:'Cuenta actualizada', account:updated});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


export default updateAccountController;