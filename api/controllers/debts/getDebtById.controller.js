import getDebtByIdService from "../../services/debts/getDebtById.services.js";

const getDebtByIdController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id: debtId } = req.params;

        const debt = await getDebtByIdService(userId, debtId);
        res.status(200).json(debt);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export default getDebtByIdController;