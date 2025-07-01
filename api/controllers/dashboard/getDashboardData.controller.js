import getDashboardData from "../../services/dashboard/getDashboardData.services";

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
        res.status(500).json({
            message: 'Error al obtener datos del dashboard',
            error: error.message
        });
    };
};

export default getDashboardController;