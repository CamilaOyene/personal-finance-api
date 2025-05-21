import createCategory from '../../services/category/createCategory.services.js';
/**
 * Controlador para crear una nueva categoría 
 * @route  POST /api/categories
 */

const createCategoryController = async(req,res) => {
    try {
        const userId = req.user.id;
        const category = await createCategory(req.body, userId)
        res.status(201).json({
            message:'Categoría creada con éxito',
            category
        })
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}



export default createCategoryController;