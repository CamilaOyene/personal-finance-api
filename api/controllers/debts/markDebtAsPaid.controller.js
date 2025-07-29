import markDebtAsPaidService from "../../services/debts/markDebtsAsPaid.services.js";

const markDebtAsPaidController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { debtId, accountId } = req.body;

        const updatedDebt = await markDebtAsPaidService(userId, debtId, accountId);

        res.status(200).json(updatedDebt);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default markDebtAsPaidController;