import Transaction from "../../models/Transaction.js";

/**
 * Actualiza una transacción existente
 * @param {String} transactionId - ID de la transacción
 * @param {String} userId - ID del usuario
 * @param {Object} updateData - Datos a actualizar
 * @returns {Object} Transacción actualizada 
 */

const updateTransaction = async (transactionId, userId, updateData) => {
    const transaction = await Transaction.findOneAndUpdate(
        { _id: transactionId, userId },
        updateData,
        { new: true }
    );
    if(!transaction){
        throw new Error('Transacción no encontrada o no autorizada');
    }
    return transaction;
}


export default updateTransaction;