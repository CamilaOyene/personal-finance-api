import getAllTransactions from '../../services/transaction/getAllTransactionByUser.services';

/**
 * Devuelve todas las transacciones del usuario autenticado
 * @route GET /api/transactions
 */

const getAllTransactionsController = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = await getAllTransactions(userId);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export default getAllTransactionsController;