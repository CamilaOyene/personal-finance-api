import Category from '../models/Category.js';


/**
 * Crea una nueva categoría
 * @param {Object} categoryData - Objeto con nombre y tipo
 * @param {string} userId - ID del usuario que la crea
 * @returns {Object} Categoría creada
 */

const createCategory = async (categoryData, userId) => {
    const { name, type } = categoryData;

    //Validación básica 
    if (!name || !type) {
        throw new Error('Nombre y tipo son obligatorios');
    }

    //Verificamos si ya existe una categoría con ese nombre para ese usuario
    const existing = await Category.findOne({name, user: userId})
    if(existing){
        throw new Error('Ya existe una categoría con ese nombre');
    }

    //Creamos la categoría
    const newCategory  = new Category({
        name,
        type,
        user: userId
    });
    
    return await newCategory.save();

}



export default createCategory;