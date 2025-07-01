import Transaction from "../../models/Transaction";
import Account from "../../models/Account";

/**
 * Obtiene los datos estadísticos para el dashboard de un usuario
 * @param {String} userId - ID del usuario
 * @returns {Object} Datos del dashboard
 */

const getDashboardData = async (userId) => {
    //Buscar todas las transacciones del usuario
    const transactions = await Transaction.find({ user: userId });

    //Total de ingresos
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);


    //Total de gastos 
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    //Traemos las cuentas del usuario con sus saldos
    const account = await Account.find({ user: userId });

    return {
        totalIncome,
        totalExpense,
        balance,
        account,
        transactionsCount: transactions.length
    };

};


export default getDashboardData;