import Account from '../../models/Account.js';

/**
 * Obtiene una cuenta por su ID, asegurando que pertenezca al usuario autenticado.
 * @param {string} accountId - ID de la cuenta a buscar.
 * @param {string} userId - ID del usuario que solicita la cuenta.
 * @returns {Object} Cuenta encontrada.
 * @throws {Error} Si no se encuentra la cuenta o no pertenece al usuario.
 */
const getAccountById = async (accountId, userId) => {
    // Buscamos la cuenta con ese ID y que pertenezca al usuario
    const account = await Account.findOne({ _id: accountId, user: userId });

    if (!account) {
        throw new Error('Cuenta no encontrada o no autorizada');
    }

    return account;
};

export default getAccountById;
