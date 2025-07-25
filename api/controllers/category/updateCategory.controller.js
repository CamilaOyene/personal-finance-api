import updateCategory from '../../services/category/updateCategory.services.js';

/**
 * Controlador para actualizar una categoría 
 * @route PUT /api/categories/:id
 */

const updateCategoryController = async ( req, res) => {
    try {
        const userId = req.user.userId;
        const categoryId = req.params.id;
        const updatedCategory = await updateCategory(categoryId, userId, req.body)
        res.status(200).json({
            message:'Categoría actualizada con éxito',
            category: updatedCategory
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}



export default updateCategoryController;