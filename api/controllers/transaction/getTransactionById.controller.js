import getAllTransactionById from '../../services/transaction/getTransactionById.services.js';

/**
 * Devuelve una transacción por su ID, si pertenece al usuario autenticado.
 * @route GET /api/transactions/:id
 */

const getTransactionByIdController = async (req,res) => {
    try {
        const userId = req.user.id;
        const transactionId = req.params.id;
        const transaction = await getAllTransactionById(transactionId,userId);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};



export default getTransactionByIdController;