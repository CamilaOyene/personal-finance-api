import getAllCategories from '../../services/category/getAllCategories.services.js';

/**
 * Controlador para obtener todas las categorías del usuario
 * @route GET /api/categories
 */

const getAllCategoriesController = async( req, res) => {
    try {
        const userId = req.user.id;
        const categories = await getAllCategories(userId);
        res.status(200).json(categories);
    } catch (error) {   
        res.status(500).json({error: error.message})
    }
};


export default getAllCategoriesController;