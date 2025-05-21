import Account from "../../models/Account";

/**
 * Obtiene todas las cuentas de un usuario
 * @param {String} userId - ID del usuario
 * @returns {Array} Cuentas del usuario
 */

const getAccounts = async (userId) => {
    const accounts = await Account.find({ user: userId });
    return accounts;
}


export default getAccounts;