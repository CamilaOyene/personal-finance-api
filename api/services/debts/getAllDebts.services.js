import Debt from '../../models/Debt.js';

/**
 * Obtiene todas las deudas asociadas a un usuario
 * @param {String} userId - ID del usuario autenticado
 * @returns {Array} Lista de deudas
 */

const getAllDebtsService = async (userId) => {

    const debts = await Debt.find({ user: userId }).sort({ dueDte: 1 });

    return debts;
};

export default getAllDebtsService;