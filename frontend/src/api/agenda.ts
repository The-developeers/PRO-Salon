// frontend/src/api/agenda.ts
const API_URL = 'http://localhost:5000/api/v1';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// --- TIPAGEM EXATA DO SEU CONTROLLER ---
export interface Agendamento {
  _id: string;
  dataHora: string;
  duracaoMinutos: number;
  status: 'marcado' | 'confirmado' | 'concluido' | 'cancelado';
  observacoes: string; // Controller usa plural
  
  // Baseado no basePopulate do controller
  cliente: { 
    _id: string; 
    nome: string;    // <--- Mudou de name para nome
    email: string;
    telefone?: string;
    // Se o backend nao retornar avatar, usaremos um padrao no front
    avatar?: string; 
  }; 
  funcionario: { 
    _id: string; 
    nome: string;    // <--- Mudou de name para nome
    cargo: string;
  };
  servico: { 
    _id: string; 
    nome: string;    // <--- Mudou de name para nome
    preco: number;
    duracaoMinutos: number; 
  };
}

// O que enviamos para criar (req.body do controller)
export interface NovoAgendamentoDTO {
  cliente: string;      // ID
  funcionario: string;  // ID
  servico: string;      // ID
  dataHora: string;     // ISO Date
  duracaoMinutos: number;
  observacoes: string;
  status: string;
}

// --- FUNÇÕES ---

// Ajuste os endpoints abaixo conforme suas rotas reais de users/employees/services
export const getClientes = async () => {
  const res = await fetch(`${API_URL}/users`, { headers: getHeaders() });
  const json = await res.json();
  return json.data || []; 
};

export const getFuncionarios = async () => {
  const res = await fetch(`${API_URL}/employees`, { headers: getHeaders() });
  const json = await res.json();
  return json.data || [];
};

export const getServicos = async () => {
  const res = await fetch(`${API_URL}/services`, { headers: getHeaders() });
  const json = await res.json();
  return json.data || [];
};

export const getAgendamentos = async (): Promise<Agendamento[]> => {
  try {
    const response = await fetch(`${API_URL}/agendamentos`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Erro ao buscar');
    const json = await response.json();
    // O seu controller retorna ok(res, items), verifique se vem direto ou dentro de data
    // Geralmente utils/apiResponse.js retorna { status: true, data: [...] } ou algo assim
    return json.data || json; 
  } catch (error) {
    console.error("Erro API:", error);
    return [];
  }
};

export const createAgendamento = async (dados: NovoAgendamentoDTO) => {
  const response = await fetch(`${API_URL}/agendamentos`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(dados)
  });
  
  const json = await response.json();

  if (!response.ok) {
    // Aqui pegamos a mensagem de erro do seu badRequest (ex: Conflito de horário)
    throw new Error(json.message || 'Erro ao criar agendamento');
  }
  return json;
};
export const updateStatusAgendamento = async (id: string, novoStatus: string) => {
  const response = await fetch(`${API_URL}/agendamentos/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status: novoStatus }) // Envia só o status
  });

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.message || 'Erro ao atualizar status');
  }
  return await response.json();
};

// EXCLUIR AGENDAMENTO (DELETE)
export const deleteAgendamento = async (id: string) => {
  const response = await fetch(`${API_URL}/agendamentos/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir agendamento');
  }
  return true; // Sucesso
};
export const getDashboardData = async () => {
  const response = await fetch(`${API_URL}/dashboard`, {
    method: 'GET',
    headers: getHeaders(),
  });
  
  if (!response.ok) throw new Error('Erro ao carregar dashboard');
  const json = await response.json();
  return json.data || json;
};