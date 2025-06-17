import createTransaction from '../../services/transaction/createTransaction.services.js';

/**
 * Crea una nueva transacción para el usuario autenticado
 * @route POST /api/transactions
 */

const createTransactionController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const newTransaction = await createTransaction(req.body, userId);
        res.status(201).json({
            message: 'Transacción creada exitosamente',
            transaction: newTransaction
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export default createTransactionController;