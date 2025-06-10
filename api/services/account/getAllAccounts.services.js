import Account from "../../models/Account.js";

/**
 * Obtiene todas las cuentas de un usuario
 * @param {String} userId - ID del usuario
 * @returns {Array} Cuentas del usuario
 */

const getAllAccounts = async (userId) => {
    const accounts = await Account.find({ user: userId });
    return accounts;
}


export default getAllAccounts;