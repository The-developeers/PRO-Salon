// src/api/financial.ts

import { FinanceQueryFilters, FinanceTransaction, FinanceTotals } from '../types/financial';

// Verifique se a porta é 5000 ou 5001 (igual ao seu .env)
const API_BASE_URL = 'http://localhost:5000/api/financial';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path: string, options: RequestInit = {}) {
  const url = path ? `${API_BASE_URL}${path}` : API_BASE_URL;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || `Erro: ${response.status}`);
  }

  if (response.status === 204) return null;

  return response.json();
}

const FinancialService = {
  getAll: async (filters: FinanceQueryFilters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.month) params.append('month', filters.month);
    if (filters.type && filters.type !== 'todos') params.append('type', filters.type);
    if (filters.category && filters.category !== 'todos') params.append('category', filters.category);
    if (filters.status && filters.status !== 'todos') params.append('status', filters.status);
    
    // Adicione paginação se necessário
    // if (filters.page) params.append('page', String(filters.page));

    const queryString = params.toString();
    return request(queryString ? `?${queryString}` : '');
  },

  getTotals: async (): Promise<FinanceTotals> => {
    return request('/totals');
  },

  create: async (data: FinanceTransaction) => {
    return request('', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<FinanceTransaction>) => {
    return request(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  remove: async (id: string) => {
    return request(`/${id}`, {
      method: 'DELETE',
    });
  },
};

export default FinancialService;