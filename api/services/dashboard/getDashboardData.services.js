import Transaction from "../../models/Transaction.js";
import Account from "../../models/Account.js";

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

    let balance = totalIncome - totalExpense;

    // Si el balance es negativo, lo dejamos en 0
    if (balance < 0) {
        balance = 0;
    }

    //Traemos las cuentas del usuario con sus saldos
    const accounts = await Account.find({ user: userId });

    //Ultimas 5 transacciones ordenadas por fecha 
    const latestTransactions = await Transaction.find({ user: userId })
        .sort({ date: -1 })
        .limit(5)
        .populate('category account');

    console.log("Transactions encontradas:", transactions.length);
    console.log("Ejemplo de transacción:", transactions[0]);



    return {
        totalIncome,
        totalExpense,
        balance,
        accounts,
        latestTransactions,
        chartTransactions: transactions
    };

};


export default getDashboardData;