const mongoose = require('mongoose');

//Definimos el esquema de transacciones financieras
const transactionSchema = new mongoose.Schema({
    //Referencia al usuario dueño de la transacción
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //Titulo o descripción de la transacción(ej:'Sueldo','supermercado')
    title: { type: String, required: true },
    //Monto de la transacción (positivo o negativo)
    amount: { type: Number, required: true },
    //Tipo de transacción:ingreso o gasto
    type: { type: String, enum: ['income', 'expense'], required: true },
    //Categoría asociada
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    //Cuenta asociada(ej: banco, efectivo,etc.)
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    //Fecha de la transacción(por defecto:fecha actual)
    date: { type: DataTransfer, default: Date.now }
    // Registra automáticamente createdAt y updatedAt
}, { timestamps: true });


module.exports = mongoose.model('Transaction', transactionSchema);