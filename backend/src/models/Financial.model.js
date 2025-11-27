// Importa o mongoose
import mongoose from 'mongoose';

// Extrai o Schema corretamente (com S maiúsculo)
const { Schema } = mongoose;

// Define o schema da coleção FinancialTransaction
const FinancialTransactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['receita', 'despesa'],
      required: true,
      index: true,
    },

    category: {
      type: String,
      enum: ['servico', 'produto', 'outros'],
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },

    professional: {
      type: String,
      trim: true,
      maxlength: 80,
    },

    client: {
      type: String,
      trim: true,
      maxlength: 80,
    },

    paymentMethod: {
      type: String,
      enum: ['dinheiro', 'cartao', 'pix'],
      required: true,
    },

    status: {
      type: String,
      enum: ['pago', 'pendente', 'cancelado'],
      default: 'pago',
      index: true,
    },

    value: {
      type: Number,
      required: true,
      min: 0,
    },

    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Índice composto
FinancialTransactionSchema.index({ date: -1, type: 1, status: 1 });

// Ajuste no retorno JSON
FinancialTransactionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

// Exporta o modelo
const FinancialTransaction = mongoose.model(
  'FinancialTransaction',
  FinancialTransactionSchema
);

export default FinancialTransaction;
