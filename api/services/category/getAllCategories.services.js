import Category from "../../models/Category.js";

/**
 * Devuelve todas las categorías a un usuari
 * @param {string} userId
 * @returns {Array}
 */

const getAllCategories = async ( userId) => {
    return await Category.find({user: userId});
}

export default getAllCategories;