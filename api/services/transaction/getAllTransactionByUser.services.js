import Transaction from "../../models/Transaction";

/**
 * Obtiene todas las transacciones de un usuario
 * @param {String} userId - ID del usuario
 * @returns {Array} Lista de transacciones del usuario
 */

const getAllTransactions = async (userId) => {
    return await Transaction.find({user: userId}).populate('category account');
};

export default getAllTransactions;