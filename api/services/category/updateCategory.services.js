import Category from '../../models/Category.js';

/**
 * Actualiza una categoría por su ID , validando que pertenezca al usuario
 * @param {String} categoryId - ID de la categoría a actualizar
 * @param {Object} updatedData - Nuevos datos
 * @param {String} userId - ID del usuario solicitante
 * @returns {Object} Categoría actualizada
 */


const updateCategory = async (categoryId, updatedData, userId) => {
    const { name, type } = updatedData;

    if (!name || !type) {
        throw new Error('Nombre y tipo son obligatorios para actualizar')
    }
    const category = await Category.findOneAndUpdate(
        { _id: categoryId, user: userId },
        { name, type },
        { new: true }
    );

    if(!category){
        throw new Error('Categoría no encontrada o no pertenece al usuario');
    }
    return category;
}




export default updateCategory;