import buildTransactionQuery from "../../helpers/buildTransactionQuery.js";
import Transaction from "../../models/Transaction.js";

/**
 * Obtiene todas las transacciones de un usuario
 * @param {String} userId - ID del usuario
 * @returns {Array} Lista de transacciones del usuario
 */

const getAllTransactions = async (userId, filters) => {
    const {page = 1, limit = 10} = filters;
    
    const skip = (page- 1) * limit;

    const query = buildTransactionQuery(filters, userId);

    const[transactions, total] = await Promise.all([
        Transaction.find(query)
        .sort({date:-1})
        .skip(skip)
        .limit(Number(limit))
        .populate('category account'),
        Transaction.countDocuments(query)
    ])

    return {
        transactions,
        total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit)
    }
};

export default getAllTransactions;