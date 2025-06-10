import Account from '../../models/Account.js';

/**
 * Elimina una cuenta por ID
 * @param {String} accountId - ID de la cuenta
 * @param {String} userId - ID del usuario (para verificar propiedad)
 * @returns {Object} Cuenta eliminada
 */


const deleteAccount = async (accountId, userId) => {
    const account = await Account.findOneAndDelete({ _id: accountId, user: userId });
    if (!account) {
        throw new Error('Cuenta no encontrada o no pertenece al usuario');
    }
    return account;
}


export default deleteAccount;