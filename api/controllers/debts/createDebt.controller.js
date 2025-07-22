import createDebtService from '../../services/debts/createDebt.services.js';

/**
 * Controlador para crear una nueva ruta 
 * @route  POST /api/debts
 */


const createDebtController = async () => {
    try {
        const userId = req.user.userId;
        const debtData = req.body;

        const newDebt = await createDebtService(userId, debtData);
        return res.status(201).json(newDebt)

    } catch (error) {
        console.error('Error al crear deuda: ', error);
        return res.status(500).json({ message: 'Error al crear deuda' });
    }
}

export default createDebtController;