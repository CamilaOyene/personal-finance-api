import deleteCategory from '../../services/category/deleteCategory.services.js';

/**
 * Controlador para eliminar una categoría
 * @route DELETE /api/categories/:id
 */


const deleteCategoryController = async(req, res) =>{
    try {
        const userId = req.user.id;
        const categoryId = req.params.id;
        await deleteCategory(categoryId, userId);
        res.status(200).json({message: 'Categoría eliminada con éxito'})
    } catch (error) {
        res.status(400).json({error: error.message})        
    }
};


export default deleteCategoryController;