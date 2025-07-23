import updateDebtServices from '../../services/debts/updateDebt.services.js';

const updateDebtController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id: debtId } = req.params;
        const updateData = req.body;

        const updatedDebt = await updateDebtServices(userId, debtId, updateData);

        res.status(200).json(updatedDebt);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }


}

export default updateDebtController;