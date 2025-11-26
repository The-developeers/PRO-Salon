// src/api/agenda.ts

// Baseado no seu auth.ts
const API_URL = 'http://localhost:5000/api/v1'; 

// O tipo de dados que esperamos do backend
export interface Agendamento {
  id: number;
  clientName: string;
  service: string;
  specialist: string;
  status: string;
  date: string;
  time: string;
  price: number;
  avatarUrl?: string; // Opcional
}

export const getAgendamentos = async (): Promise<Agendamento[]> => {
  try {
    // Ajuste '/agendamentos' se sua rota no backend tiver outro nome
    const response = await fetch(`${API_URL}/agendamentos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Se precisar de token (login), descomente a linha abaixo:
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar agendamentos');
    }

    const json = await response.json();
    
    // ATENÇÃO: Verifique se seu backend retorna { data: [...] } ou direto [...]
    // Se for igual ao seu auth.ts, deve ser json.data
    return json.data || json; 
    
  } catch (error) {
    console.error("Erro na API de agenda:", error);
    return [];
  }
};

export interface NovoAgendamento {
  clientName: string;
  service: string;
  specialist: string; // Se você tiver esse campo no form
  date: string;
  time: string;
  price: number;
  status: string;
}

// 2. A função que ENVIA os dados
export const createAgendamento = async (dados: NovoAgendamento) => {
  try {
    const response = await fetch(`${API_URL}/agendamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ...` (se precisar)
      },
      body: JSON.stringify(dados)
    });

    if (!response.ok) {
      throw new Error('Erro ao criar agendamento');
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao salvar:", error);
    throw error;
  }
};