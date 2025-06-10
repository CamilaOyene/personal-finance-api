import mongoose from 'mongoose';

//Definimos el esquema de cuentas(Cuentas bancarias, efectivo, etc)
const accountSchema = new mongoose.Schema({
    //Referencia al usuario dueño de esta cuenta
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //Nombre de la cuenta (ej: Banco Nacion, Efectivo)
    name: { type: String, required: true },
    //Saldo inicial o actual de la cuenta
    balance: { type: Number, default: 0 }
    // Campos createdAt y updatedAt automáticos
}, { timestamps: true });


const Account = mongoose.model('Account', accountSchema);

export default Account;