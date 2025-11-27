import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../style/Financeiro.css';

// ==========================================
// 1. TIPOS
// ==========================================
export type FinanceTransaction = {
  id?: string;
  type: 'receita' | 'despesa';
  category: 'servico' | 'produto' | 'outros';
  description: string;
  professional?: string;
  client?: string;
  paymentMethod: 'dinheiro' | 'cartao' | 'pix';
  status: 'pago' | 'pendente' | 'cancelado';
  value: number;
  date?: string;
};

export type FinanceTotals = {
  receita: number;
  despesa: number;
  pendente: number;
  saldo: number;
};

export type FinanceQueryFilters = {
  month?: string;
  type?: string;
  category?: string;
  status?: string;
};

// ==========================================
// 2. SERVICE INTERNO (API)
// ==========================================
const API_BASE_URL = 'http://localhost:5000/api/v1/financial'; // Confirme a porta do seu backend

const FinancialService = {
  getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  async request(path: string, options: RequestInit = {}) {
    // Monta a URL corretamente sem duplicar barras
    const url = `${API_BASE_URL}${path}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...FinancialService.getAuthHeader(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      // Tenta ler o erro do backend (ex: erro de validação do Mongoose)
      const errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.error || errorJson.message || 'Erro na requisição');
      } catch {
        throw new Error(errorText || `Erro HTTP: ${response.status}`);
      }
    }

    if (response.status === 204) return null;
    return response.json();
  },

  getAll: async (filters: FinanceQueryFilters = {}) => {
    const params = new URLSearchParams();
    if (filters.month) params.append('month', filters.month);
    if (filters.type && filters.type !== 'todos') params.append('type', filters.type);
    if (filters.category && filters.category !== 'todos') params.append('category', filters.category);
    if (filters.status && filters.status !== 'todos') params.append('status', filters.status);
    
    const queryString = params.toString();
    return FinancialService.request(queryString ? `?${queryString}` : '');
  },

  getTotals: async (): Promise<FinanceTotals> => {
    return FinancialService.request('/totals');
  },

  create: async (data: FinanceTransaction) => {
    return FinancialService.request('', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return FinancialService.request(`/${id}`, {
      method: 'DELETE',
    });
  }
};

// ==========================================
// 3. COMPONENTE TELA
// ==========================================
export default function Financeiro() {
  const [transactions, setTransactions] = useState<FinanceTransaction[]>([]);
  const [totals, setTotals] = useState<FinanceTotals>({ receita: 0, despesa: 0, pendente: 0, saldo: 0 });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Filtros
  const [filters, setFilters] = useState<FinanceQueryFilters>({});

  // Formulário
  const emptyForm: FinanceTransaction = {
    type: 'receita',
    category: 'servico',
    description: '',
    professional: '',
    client: '',
    paymentMethod: 'pix',
    status: 'pago',
    value: 0,
    date: new Date().toISOString().slice(0, 10),
  };
  const [form, setForm] = useState<FinanceTransaction>(emptyForm);

  useEffect(() => {
    loadData();
  }, [filters]);

  async function loadData() {
    setLoading(true);
    try {
      const [listData, totalsData] = await Promise.all([
        FinancialService.getAll(filters),
        FinancialService.getTotals()
      ]);
      
      const list = Array.isArray(listData) ? listData : listData?.data ?? [];
      setTransactions(list);
      setTotals(totalsData || { receita: 0, despesa: 0, pendente: 0, saldo: 0 });
    } catch (error) {
      console.error("Erro ao carregar:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenModal() {
    setForm(emptyForm);
    setModalOpen(true);
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'value' ? Number(value) : value
    }));
  }

  async function handleSave() {
    // 1. Validação básica de preenchimento
    if (!form.description || form.value <= 0) {
      alert('Preencha a descrição e um valor maior que zero!');
      return;
    }

    // 2. Validação do Backend (minlength: 3)
    if (form.description.length < 3) {
      alert('A descrição deve ter no mínimo 3 letras.');
      return;
    }

    try {
      await FinancialService.create(form);
      setModalOpen(false);
      loadData(); // Recarrega a lista
      alert('Transação salva com sucesso!');
    } catch (error: any) {
      console.error(error);
      // Mostra o erro real vindo do backend
      alert(`Erro ao salvar: ${error.message}`);
    }
  }

  async function handleDelete(id: string) {
    if(!window.confirm("Tem certeza que deseja excluir?")) return;
    
    try {
      await FinancialService.delete(id);
      loadData();
    } catch (error: any) {
      alert(`Erro ao excluir: ${error.message}`);
    }
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <Layout>
      <div className='financeiro-container'>
        
        {/* HEADER */}
        <div className='financeiro-header'>
          <div>
            <h1 className='financeiro-title'>Financeiro</h1>
            <p className='financeiro-subtitle'>Controle de caixa</p>
          </div>
          <button className='financeiro-nova-transacao-btn' onClick={handleOpenModal}>
            + Nova Transação
          </button>
        </div>

        {/* RESUMO */}
        <div className='finance-summary-container'>
          <div className='summary-card'>
            <span className='summary-title'>Receitas</span>
            <span className='summary-value summary-receita'>R$ {totals.receita.toFixed(2)}</span>
          </div>
          <div className='summary-card'>
            <span className='summary-title'>Despesas</span>
            <span className='summary-value summary-despesa'>- R$ {totals.despesa.toFixed(2)}</span>
          </div>
          <div className='summary-card'>
            <span className='summary-title'>Saldo</span>
            <span className='summary-value summary-saldo'>R$ {totals.saldo.toFixed(2)}</span>
          </div>
          <div className='summary-card'>
            <span className='summary-title'>Pendente</span>
            <span className='summary-value summary-pendente'>R$ {totals.pendente.toFixed(2)}</span>
          </div>
        </div>

        {/* FILTROS */}
        <div className='finance-filter-wrapper'>
          <div className='finance-filter-container'>
            <div className='finance-filter-field'>
              <span className='finance-filter-label'>Tipo</span>
              <select name='type' onChange={handleFilterChange} className='finance-filter-select'>
                <option value=''>Todos</option>
                <option value='receita'>Receita</option>
                <option value='despesa'>Despesa</option>
              </select>
            </div>
            <div className='finance-filter-field'>
              <span className='finance-filter-label'>Status</span>
              <select name='status' onChange={handleFilterChange} className='finance-filter-select'>
                <option value=''>Todos</option>
                <option value='pago'>Pago</option>
                <option value='pendente'>Pendente</option>
              </select>
            </div>
            <div className='finance-filter-field'>
              <span className='finance-filter-label'>Mês</span>
              <input type='month' name='month' onChange={handleFilterChange} className='finance-filter-input' />
            </div>
            <button className='finance-filter-clear' onClick={() => setFilters({})}>Limpar</button>
          </div>
        </div>

        {/* LISTA */}
        <div className='finance-list-container'>
          {loading && <p style={{textAlign: 'center'}}>Carregando...</p>}
          
          {!loading && transactions.length === 0 && (
            <div style={{ textAlign: 'center', padding: 20, color: '#666' }}>Nenhuma transação encontrada.</div>
          )}

          {!loading && transactions.map((item) => {
             const isIncome = item.type === 'receita';
             const dateObj = item.date ? new Date(item.date) : null;
             if (dateObj) dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
             
             return (
              <div className='finance-item' key={item.id || Math.random()}>
                <div className='finance-item-left'>
                  <div className={`finance-item-icon ${item.type}`} />
                  <div>
                    <h3 className='finance-item-title'>{item.description}</h3>
                    <span className='finance-item-category'>{item.category}</span>
                  </div>
                </div>

                <div className='finance-item-right'>
                  <span className='finance-item-date'>
                    {dateObj ? dateObj.toLocaleDateString('pt-BR') : ''}
                  </span>
                  <span className={`finance-item-value ${isIncome ? 'income' : 'expense'}`}>
                    {isIncome ? '+ ' : '- '}R$ {item.value.toFixed(2)}
                  </span>
                  <span className={`finance-status ${item.status}`}>{item.status}</span>
                  
                  {/* Botão de Excluir Adicionado */}
                  {item.id && (
                    <button 
                      onClick={() => handleDelete(item.id!)}
                      style={{marginLeft: 10, color: 'red', border: 'none', background: 'transparent', cursor: 'pointer'}}
                    >
                      Excluir
                    </button>
                  )}
                </div>
              </div>
             );
          })}
        </div>

        {/* MODAL */}
        {modalOpen && (
          <div className='finance-modal-overlay'>
            <div className='finance-modal'>
              <h2 className='modal-title'>Nova Transação</h2>
              
              <div className='modal-field'>
                <label>Tipo</label>
                <select name='type' value={form.type} onChange={handleFormChange}>
                  <option value='receita'>Receita</option>
                  <option value='despesa'>Despesa</option>
                </select>
              </div>

              <div className='modal-field'>
                <label>Categoria</label>
                <select name='category' value={form.category} onChange={handleFormChange}>
                  <option value='servico'>Serviço</option>
                  <option value='produto'>Produto</option>
                  <option value='outros'>Outros</option>
                </select>
              </div>

              <div className='modal-field'>
                <label>Descrição (mín 3 letras)</label>
                <input type='text' name='description' value={form.description} onChange={handleFormChange} />
              </div>

              <div className='modal-row'>
                <div className='modal-field'>
                  <label>Valor</label>
                  <input type='number' name='value' value={form.value} onChange={handleFormChange} />
                </div>
                <div className='modal-field'>
                  <label>Data</label>
                  <input type='date' name='date' value={form.date} onChange={handleFormChange} />
                </div>
              </div>
              
              <div className='modal-row'>
                <div className='modal-field'>
                  <label>Pagamento</label>
                  <select name='paymentMethod' value={form.paymentMethod} onChange={handleFormChange}>
                    <option value='pix'>PIX</option>
                    <option value='dinheiro'>Dinheiro</option>
                    <option value='cartao'>Cartão</option>
                  </select>
                </div>
                <div className='modal-field'>
                   <label>Status</label>
                   <select name='status' value={form.status} onChange={handleFormChange}>
                     <option value='pago'>Pago</option>
                     <option value='pendente'>Pendente</option>
                   </select>
                </div>
              </div>

              <div className='modal-buttons'>
                <button className='modal-btn-cancel' onClick={() => setModalOpen(false)}>Cancelar</button>
                <button className='modal-btn-save' onClick={handleSave}>Salvar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}