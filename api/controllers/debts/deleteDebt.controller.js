import deleteDebtService from '../../services/debts/deleteDebt.services.js';

const deleteDebtController = async(req, res)=>{
    try {
        const userId = req.user.userId;
        const debtId = req.params.id;
        await deleteDebtService(userId, debtId);
        
        res.status(200).json('Deuda eliminada correctamente');

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default deleteDebtController;