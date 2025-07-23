import Debt from '../../models/Debt.js';

/**
 * Actualiza una deuda si pertenece al usuario
 * @param {String} userId - ID del usuario autenticado
 * @param {String} debtId - ID de la deuda a actualizar
 * @param {Object} updateData - Datos nuevos de la deuda
 * @return {Object} La deuda actualizada
 */

const updateDebtService = async (userId, debtId, updateData) => {
    const debt = await Debt.findOneAndUpdate(
        { _id: debtId, user: userId },
        updateData,
        { new: true, runValidators: true }
    );
    
    if (!debt) {
        throw new Error('No se encontró la deuda o no tenés permisos');
    }
    return debt;
}

export default updateDebtService;