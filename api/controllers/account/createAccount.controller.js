import createAccount from '../../services/account/createAccount.services.js';

/**
 * Crea una nueva cuenta para el usuario autenticado
 * @route POST /api/accounts
 */

const createAccountController = async ( req,res) =>{
    try {
        const userId = req.user.id;
        const newAccount = await createAccount(req.body, userId);
        res.status(200).json({message:'Cuenta creada con éxito', account: newAccount});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


export default createAccountController;