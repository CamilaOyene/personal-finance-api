import Debt from '../../models/Debt.js';
/**
 * Crea una nueva deuda y la asocia al usuario
 * @param {String} userId - ID del usuario autenticado.
 * @param {Object} debtData - Datos de la deuda.
 * @returns {Object} La deuda creada.
 */

const createDebtService = async (userId, debtData) => {
    const { description, amount, dueDate, contact } = debtData;

    if (!description || !amount || !dueDate) {
        throw new Error('Faltan campos obligatorios');
    }
    const newDebt = new Debt({
        user: userId,
        description,
        amount,
        dueDate,
        contact
    });

    await newDebt.save();

    return newDebt;
}


export default createDebtService;