import getDashboardData from '../../services/dashboard/getDashboardData.services.js'

/**
 * Controlador del dashboard : respnde con datos resumidos del usuario
 */


const getDashboardController = async (req, res) => {
    try {
        const userId = req.user.userId;
        //Llamo al servicio que calcula todo
        const dashboardData = await getDashboardData(userId);

        res.status(200).json(dashboardData);

    } catch (error) {
        console.error("Error en getDashboardController:", error)
        res.status(500).json({
            message: 'Error al obtener datos del dashboard',
            error: error.message
        });
    };
};

export default getDashboardController;