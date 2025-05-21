import Transaction from '../../models/Transaction.js';

/**
 * Crea una nueva transacción
 * @param {Object} transactionData - Datos de la transacción(amount, date, description, type, category, account)
 * @param {String} userId - ID del usuario que realiza la transacción
 * @returns {Object} Transacción creada
 */


const createTransaction = async (transactionData, userId) => {
    const { amount, date, description, type, category, account } = transactionData;

    //Validación básica
    if(!amount || !date || !type || !category || !account){
        throw new Error('Todos los campos obligatorios deben ser completados');
    }

    //Creamos una nueva instancia de transacción
    const newTransaction = newTransaction({
        amount,
        date,
        description,
        type,
        category,
        account,
        user:userId
    })

    //Guardamos en la base de datos 
    return await newTransaction.save();
}


export default createTransaction;