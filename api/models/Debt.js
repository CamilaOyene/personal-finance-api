import mongoose from 'mongoose';

const debtSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'El monto es obligatorio'],
    min: [0, 'El monto no puede ser negativo'],
  },
  dueDate: {
    type: Date,
    required: [true, 'La fecha de vencimiento es obligatoria'],
  },
  contact: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pendiente', 'pagada', 'vencida'],
    default: 'pendiente',
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    default: null,
  }
}, {
  timestamps: true, // crea createdAt y updatedAt automáticamente
});

const Debt = mongoose.model('Debt', debtSchema);

export default Debt;
