// backend/src/controllers/dashboard.controller.js
import User from "../models/User.model.js";
import Employee from "../models/Employee.model.js";
import Appointment from "../models/Appointment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ok } from "../utils/apiResponse.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  console.log("--- INICIANDO DASHBOARD ---");

  // 1. Configurando Datas (Cuidado com Fuso Horário!)
  const hojeInicio = new Date();
  hojeInicio.setHours(0, 0, 0, 0);
  
  const hojeFim = new Date();
  hojeFim.setHours(23, 59, 59, 999);

  console.log("Buscando de:", hojeInicio.toLocaleString());
  console.log("Até:", hojeFim.toLocaleString());

  const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  // 2. Buscas separadas para ver onde está o erro (sem Promise.all por enquanto)
  
  // A) Clientes: Verifica se role não é employee
  const totalClientes = await User.countDocuments({ role: { $ne: 'employee' } });
  console.log("Clientes encontrados:", totalClientes);

  // B) Funcionários
  const totalFuncionarios = await Employee.countDocuments();
  console.log("Funcionários encontrados:", totalFuncionarios);

  // C) Agendamentos Hoje
  const agendamentosHoje = await Appointment.find({
    dataHora: { $gte: hojeInicio, $lte: hojeFim },
    status: { $ne: 'cancelado' }
  })
  .populate('cliente', 'nome') // Verifique se no User.model é 'nome' ou 'name'
  .populate('funcionario', 'nome')
  .populate('servico', 'nome preco')
  .sort({ dataHora: 1 });

  console.log("Agendamentos Hoje encontrados:", agendamentosHoje.length);

  // D) Agendamentos Mês (Receita)
  const agendamentosMes = await Appointment.find({
    dataHora: { $gte: inicioMes },
    status: { $in: ['concluido', 'confirmado', 'realizada', 'marcado'] } 
  }).populate('servico', 'preco');

  // 3. Calcular Receita
  const receitaMensal = agendamentosMes.reduce((acc, curr) => {
    // Tenta pegar preço do serviço OU do agendamento se tiver salvo lá
    const valor = curr.servico?.preco || 0;
    return acc + valor;
  }, 0);

  const dadosFinais = {
    clientes: totalClientes,
    funcionarios: totalFuncionarios,
    agendamentosHojeCount: agendamentosHoje.length,
    receitaMensal,
    listaHoje: agendamentosHoje
  };

  console.log("Dados enviados pro front:", dadosFinais);

  return ok(res, dadosFinais);
});