import Debt from '../../models/Debt.js';
import Transaction from '../../models/Transaction.js';


/**
 * Marca una deuda como pagada 
 * @param {String} userId - ID del usuario autenticado 
 * @param {String} debtId - ID  de la deuda 
 * @returns {Object}  La deuda actualizada 
 */


const markDebtAsPaidService = async (userId, debtId, accountId) => {
    const debt = await Debt.findOne({ _id: debtId, user: userId });

    if (!debt) {
        throw new Error('Deuda no encontrada');
    }

    if (debt.isPaid) {
        throw new Error('La deuda ya está marcada como pagada. ')
    }

    //Creamos la transacción asciada al pago de la deuda
    const transaction = await Transaction.create({
        user: userId,
        type: 'expence',
        amount: debt.amount,
        account: accountId,
        description: `Pago de deuda: ${debt.description || 'Sin descripción'}`,
        date: new Date(),
    })


    debt.isPaid = true;
    debt.status = 'pagada';
    debt.paidAt = new Date();
    debt.transactionId = transaction._id;

    await debt.save();

    return debt;

}

export default markDebtAsPaidService;