// src/routes/agendamentos.js
import express from 'express';
// ATENÇÃO: Em projetos com "type": "module", é obrigatório colocar o .js no final
import Agendamento from '../models/Agendamento.js'; 

const router = express.Router();

// ROTA GET: Buscar todos
router.get('/', async (req, res) => {
  try {
    const agendamentos = await Agendamento.find().sort({ date: 1, time: 1 });
    res.status(200).json({ success: true, count: agendamentos.length, data: agendamentos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Erro ao buscar agendamentos' });
  }
});

// ROTA POST: Criar novo
router.post('/', async (req, res) => {
  try {
    const agendamento = await Agendamento.create(req.body);
    res.status(201).json({ success: true, data: agendamento });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: 'Erro ao criar agendamento' });
  }
});

export default router;