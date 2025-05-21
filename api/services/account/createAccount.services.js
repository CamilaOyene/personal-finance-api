import Account from '../../models/Account.js';

/**
 * Crea una nueva cuenta para un usuario
 * @param {Object} accountData - Datos de la cuenta: user, name, balance 
 * @returns {Object} La cuenta creada 
 */

const createAccount = async (accountData) => {

    const { user, name, balance } = accountData;

    //Verificamos si el usuario ya tiene una cuenta con ese nombre 
    const existing = await Account.findOne({ user, name });
    if (existing) {
        throw new Error('Ya existe una cuenta con ese nombre para este usuario');
    }

    const account = new Account({ user, name, balance });
    const savedAccount = await account.save();
    return savedAccount
}


export default createAccount;