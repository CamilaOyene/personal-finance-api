import getAllDebtsService from '../../services/debts/getAllDebts.services.js';

const getAllDebtsController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const debts = await getAllDebtsService(userId);

        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export default getAllDebtsController;