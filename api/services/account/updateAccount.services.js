import Account from "../../models/Account.js";

/**
 * Actualiza una cuenta por ID
 * @param {String} accountId - ID de la cuenta
 * @param {String} userId - ID del usuario 
 * @param {Object} updateData- Datos a actualizar
 * @returns {Object} Cuenta actualizada 
 */


const updateAccount = async (accountId, userId, updateData) => {

    //Buscar cuenta original 
    const account = await Account.findOne({ _id: accountId, user: userId });

    if (!account) {
        throw new Error('Cuenta no encontrada o no autorizada');
    }

    //Validar nombre duplicado
    if (updateData.name && updateData.name !== account.name) {
        const nameExists = await Account.findOne({
            user: userId,
            name: updateData.name,
            _id: { $ne: accountId }
        });

        if (nameExists) {
            throw new Error('Ya tenés otra cuenta con ese nombre');
        }
    }

    //Validar saldo negativo
    if(updateData.balance !== undefined && updateData.balance < 0){
        throw new Error('El saldo no puede ser negaativo')
    }

    //Actuaizar los campos 
    Object.assign(account, updateData);
    const updated = await account.save();
    
    return updated;

};


export default updateAccount;