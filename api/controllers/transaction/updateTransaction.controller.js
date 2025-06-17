import updateTransaction from '../../services/transaction/updateTransaction.services.js';

/**
 * Actualiza una transacción existente si pertenece al usuario
 * @route PUT /api/transactions/:id
 */

const updateTransactionController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const transactionId = req.params.id;
        const updateData = req.body;
        const updatedTransaction = await updateTransaction(transactionId, userId, updateData);
        res.status(200).json({
            message: 'Transacción actualizada correctamente',
            transaction: updatedTransaction
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export default updateTransactionController;