import { Schema, model } from 'mongoose';

//Definimos el esquema de transacciones financieras
const transactionSchema = new Schema({
    //Referencia al usuario dueño de la transacción
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    //Descripción de la transacción(ej:'Sueldo','supermercado')
    description: { type: String, required: true },
    //Monto de la transacción (positivo o negativo)
    amount: { type: Number, required: true },
    //Tipo de transacción:ingreso o gasto
    type: { type: String, enum: ['income', 'expense'], required: true },
    //Categoría asociada
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    //Cuenta asociada(ej: banco, efectivo,etc.)
    account: { type: Schema.Types.ObjectId, ref: 'Account' },
    //Fecha de la transacción(por defecto:fecha actual)
    date: { type: DataTransfer, default: Date.now }
    // Registra automáticamente createdAt y updatedAt
}, { timestamps: true });


export default model('Transaction', transactionSchema);