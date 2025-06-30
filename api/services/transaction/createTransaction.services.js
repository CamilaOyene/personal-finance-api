import Transaction from '../../models/Transaction.js';
import adjustAccountBalance from '../../helpers/adjustAccountBalance.js';


/**
 * Crea una nueva transacción
 * @param {Object} transactionData - Datos de la transacción(amount, date, description, type, category, account)
 * @param {String} userId - ID del usuario que realiza la transacción
 * @returns {Object} Transacción creada
 */


const createTransaction = async (transactionData, userId) => {
    const { amount, date, description, type, category, account } = transactionData;

    //Se valida que todos los coampos esten presentes
    if (!amount || !date || !type || !category || !account) {
        throw new Error('Todos los campos obligatorios deben ser completados');
    }

    //Creamos una nueva instancia de transacción
    const newTransaction = new Transaction({
        amount,
        date,
        description,
        type,
        category,
        account,
        user: userId
    })

    //Guardamos la transacción en la base de datos
    const savedTransaction = await newTransaction.save();


    //Ajustamos el saldo de la cuenta según el tipo de transacción
    await adjustAccountBalance(account, amount, type, 'add');


    return savedTransaction;

}


export default createTransaction;