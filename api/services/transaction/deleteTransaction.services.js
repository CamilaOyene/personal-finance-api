import Transaction from '../../models/Transaction.js';
import adjustAccountBalance from '../../helpers/adjustAccountBalance.js';

/**
 * Elimina una transacción y revierte su efecto sobre la cuenta. 
 * @param {String} transactionId - ID de la transacción
 * @param {String} userId - ID del usuario
 */


const deleteTransaction = async (transactionId, userId) => {
    const transaction = await Transaction.findOneAndDelete({ _id: transactionId, user: userId });
    if (!transaction) {
        throw new Error('Transacción no encontrada o no autorizada');
    }

    //Revertir su efecto en la cuenta (ej,si era un ingreso se resta)

    await adjustAccountBalance(transaction.account, transaction.amount, transaction.type, 'remove');
};


export default deleteTransaction;