import Account from "../../models/Account";

/**
 * Actualiza una cuenta por ID
 * @param {String} accountId - ID de la cuenta
 * @param {String} userId - ID del usuario 
 * @param {Object} updateData- Datos a actualizar
 * @returns {Object} Cuenta actualizada 
 */


const updateAccount = async (accountId, userId, updateData) => {
    const updated = await Account.findOneAndUpdate(
        { _id: accountId, userId },
        updateData,
        { new: true }
    );
    if(!updated){
        throw new Error('Cuenta no encontrada o no autorizada');
    }
    return updated;
};


export default updateAccount;