// src/models/Agendamento.js
import mongoose from 'mongoose';

const AgendamentoSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Por favor, adicione o nome do cliente']
  },
  service: {
    type: String,
    required: [true, 'Por favor, selecione o serviço']
  },
  specialist: {
    type: String,
    default: 'Profissional Padrão'
  },
  date: {
    type: String,
    required: [true, 'Por favor, adicione a data']
  },
  time: {
    type: String,
    required: [true, 'Por favor, adicione o horário']
  },
  price: {
    type: Number,
    required: [true, 'Por favor, adicione o preço']
  },
  status: {
    type: String,
    enum: ['Realizada', 'Agendada', 'Vencida', 'Aguardando'],
    default: 'Agendada'
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Agendamento', AgendamentoSchema);