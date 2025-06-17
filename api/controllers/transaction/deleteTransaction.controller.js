import deleteTransaction from '../../services/transaction/deleteTransaction.services.js';

/**
 * Elimina una transacción si pertenece al usuario autenticado 
 * @route DELETE /api/transactions/:id
 */


const deleteTransactionController = async(req,res ) => {
    try {
        const userId = req.user.userId;
        const transactionId = req.params.id;
        await deleteTransaction(transactionId,userId);
        res.status(200).json({message:'Transacción eliminada correctamente'});
    } catch (error) {
            res.status(400).json({error: error.message});
    }
};




export default deleteTransactionController;