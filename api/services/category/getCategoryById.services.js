import Category from '../../models/Category.js';

/**
 * Obtiene una categoría específica por su ID, asegurando que pertenezca al usuario.
 * @param {string} categoryId -ID de la categoría 
 * @param {string} userId - ID del usuario 
 * @returns {Object} Categoría encontrada 
 */


const getCategoryById = async (categoryId, userId) => {
    if (!categoryId) {
        throw new Error('El ID de la categoría es obligatorio');
    }
    const category = await Category.findOne({ _id: categoryId, user: userId });

    if (!category) {
        throw new Error('Categoría no encontrada');
    }

    return category;
}


export default getCategoryById;