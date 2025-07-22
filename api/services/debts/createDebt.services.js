import Debt from '../../models/Debt.js';
/**
 * Crea una nueva deuda y la asocia al usuario
 * @param {String} userId - ID del usuario autenticado.
 * @param {Object} debtData - Datos de la deuda.
 * @returns {Object} La deuda creada.
 */

const createDebtService = async (userId, debtData) => {
    const { title, amount, description, dueDate, type, contact } = debtData;

    if (!title || !amount || !dueDate || !type) {
        throw new Error('Faltan campos obligatorios');
    }
    const newDebt = new Debt({
        user: userId,
        title,
        amount,
        description,
        dueDate,
        type,
        contact
    });

    await newDebt.save();

    return newDebt;
}


export default createDebtService;