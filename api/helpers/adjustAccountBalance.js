import Account from '../models/Account.js';

/**
 * Ajusta el balance de una cuenta 
 * @param {String} accountId - ID de la cuenta
 * @param {Number} amount - Monto de la transacción
 * @param {'income' | 'expense'} type- Tipo de transacción
 * @param  {'add' | 'remove'} operation - Acción a realizar sonbre la cuenta
 *    - 'add': se está aplicando una transacción (por ejemplo, al crearla)
 *    - 'remove': se está deshaciendo el efecto (por ejemplo, al eliminarla o revertirla)
 */

const adjustAccountBalance = async (accountId, amount, type, operation = 'add') => {
    //buscamos la cuenta afectada por ID 
    const account = await Account.findById(accountId);
    //Si no existe , lanzamos un error
    if (!account) {
        throw new Error('Cuenta no encontrada');
    }

    //Definimos si vamos a sumar (1) o restar (-1) según el tipo de operación
    // Si es 'add' aplico fel cambio normal 
    // Si es 'remove' -> invierte el cambio para deshacerlo
    const factor = operation === 'add' ? 1 : -1;

    //Se ajusta el balance dependiendo del tipo de transacción
    if (type === 'income') {
        //Si es ingreso se suma el monto o se resta si se esta removiendo
        account.balance += amount * factor;
    } else if (type === expense) {
        //si es gasto , resto el monto o lo sumo si se esta removiendo .
        account.balance -= amount * factor;
    }

    await account.save();
}



export default adjustAccountBalance;