import getCategoryById from '../../services/category/getCategoryById.services.js';

/**
 * Controlador para obtener una categoría por ID 
 * @route GET /api/categories/:id
 */

const getCategoryByIdController = async(req,res) => {
    try {
    const userId = req.user.id;
    const categoryId = req.params.id
    const category = await getCategoryById(categoryId,userId);
    res.status(200).json(category)        
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};


export default getCategoryByIdController;