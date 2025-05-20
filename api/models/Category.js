const mongoose = require(mongoose);
//Definimos el esquema de categoría de transacciones
const categorySchema = new mongoose.Schema({
    //Referencia al usuario dueño de esta categoría
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //Nombre de la categoría (ej:Salario, Transporte)
    name: { type: String, required: true },
    //Tipo de categoría : ingreso o gasto. 
    type: { type: String, enum: ['income', 'expense'], required: true }
    // Campos createdAt y updatedAt automáticos
}, { timestamps: true });



module.exports = mongoose.model('Category', categorySchema);