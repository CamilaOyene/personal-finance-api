import Transaction from '../../models/Transaction.js';

/**
 * Elimina una transacción por ID
 * @param {String} transactionId - ID de la transacción
 * @param {String} userId - ID del usuario
 * @param {void}
 */


const deleteTransaction = async(transactionId, userId) => {
    const deleted = await Transaction.findOneAndDelete({ _id: transactionId, user: userId });
    
    if(!deleted){
        throw new Error('Transacción no encontrada o no autorizada');
    }
};


export default deleteTransaction;