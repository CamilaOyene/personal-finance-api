import adjustAccountBalance from "../../helpers/adjustAccountBalance.js";
import Transaction from "../../models/Transaction.js";

/**
 * Actualiza una transacción existente
 * @param {String} transactionId - ID de la transacción
 * @param {String} userId - ID del usuario
 * @param {Object} updateData - Datos a actualizar
 * @returns {Object} Transacción actualizada 
 */

const updateTransaction = async (transactionId, userId, updateData) => {
    //Busco transacción original antes de cambiarla.
    const oldTransaction = await Transaction.findOne({ _id: transactionId, user: userId });

    if (!oldTransaction) {
        throw new Error('Transacción no encontrada o no actualizada');
    }

    //Revertir efecto en la cuenta original (si era ingreso se resta)
    await adjustAccountBalance(oldTransaction.account, oldTransaction.amount, oldTransaction.type, 'remove');

    //Acrtualizamos la transacción con los nuevos datos
    const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        updateData,
        { new: true } // Devolver versión actualizada
    );

    //Sse aplica el nuevo efecto sobre la cuenta 
    await adjustAccountBalance(updateTransaction.account, updatedTransaction.amount, updatedTransaction.type, 'add');

    return updatedTransaction;

}


export default updateTransaction;