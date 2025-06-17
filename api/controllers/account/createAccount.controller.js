import createAccount from '../../services/account/createAccount.services.js';

/**
 * Crea una nueva cuenta para el usuario autenticado
 * @route POST /api/accounts
 */

const createAccountController = async ( req,res) =>{
    try {
        const userId = req.user.userId;
        const newAccount = await createAccount({...req.body, user: userId});
        res.status(201).json({message:'Cuenta creada con éxito', account: newAccount});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


export default createAccountController;