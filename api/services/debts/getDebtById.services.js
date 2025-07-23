import Debt from '../../models/Debt.js';

/**
 * Obtiene una deuda por ID si pertenece al usuario
 * @param {String} userId - ID del usuario autenticado 
 * @param {String} debtId - ID de la deuda a buscar 
 * @returns {Object} La deuda encontrada 
 */

const getDebtByIdService = async (userId, debtId) => {
    const debt = await Debt.findOne({ _id: debtId, user: userId });

    if (!debt) {
        throw new Error('Deuda no encontrada');
    }
    return debt;
}


export default getDebtByIdService; 