// import Debt from '../../models/Debt.js';

// /**
//  * Elimina una deuda si pertenece al usuario autenticado
//  * @param {String} userId  - ID del usuario
//  * @param {Sting} debtId - ID de la deuda a eliminar
//  * @returns {Object} La deuda eliminada o null
//   */

const deleteDebtService = async (userId, debtId) => {
    const deletedDebt = await Debt.findOneAndDelete({ _id: debtId, user: userId });

    if (!deletedDebt) {
        throw new Error('Deuda no encontrada o no pertenece al usuario');
    }

    return deletedDebt;
}

export default deleteDebtService;