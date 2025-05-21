import Transaction from '../../models/Transaction.js';

/**
 * Obtiene una transacción especifica por ID
 * @param {String} transactionId - ID de la transacción
 * @param {String} userId - ID del usuario
 * @returns {Object} Transacción encontrada
 */

const getTransactionById = async (transactionId, userId) => {

    const transaction = await Transaction.findOne({ _id: transactionId, user: userId }).populate('category account');

    if (!transaction) {
        throw new Error('Transacción no encontrada');
    }
    return transaction;
};

export default getTransactionById;