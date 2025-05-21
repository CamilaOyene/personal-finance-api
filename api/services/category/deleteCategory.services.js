import Category from '../../models/Category.js';

/**
 * Elimina una categoría por su ID, válidando que pertenezca al usuario.
 * @param {String} categoryId - ID de la categoría a eliminar.
 * @param {String} userId - ID del usuario solicitante.
 * @returns {Object} Categoría eliminada 
 */


const deleteCategory = async(categoryId, userId) => {
    const deleted = await Category.findOneAndDelete({
        _id: categoryId,
        user: userId
    });

    if(!deleted){
        throw new Error('Categoría no encontrada o no pertenece al usuario');
    }

    return deleted;
}


export default deleteCategory;