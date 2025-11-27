// frontend/src/components/AgendamentoModal.tsx
import React, { useState, useEffect } from 'react';
import { createAgendamento, getClientes, getFuncionarios, getServicos } from '../api/agenda';
import '../style/Agenda.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AgendamentoModal({ isOpen, onClose, onSuccess }: ModalProps) {
  // Estados do Form
  const [clienteId, setClienteId] = useState('');
  const [funcionarioId, setFuncionarioId] = useState('');
  const [servicoId, setServicoId] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [status, setStatus] = useState('marcado');
  
  // Estado para duração (importante para o calculo de conflito no backend)
  const [duracaoMinutos, setDuracaoMinutos] = useState(60); 

  const [loading, setLoading] = useState(false);

  // Listas para os Selects
  const [listaClientes, setListaClientes] = useState<any[]>([]);
  const [listaFuncionarios, setListaFuncionarios] = useState<any[]>([]);
  const [listaServicos, setListaServicos] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      async function carregarListas() {
        try {
          // Promise.all para carregar tudo junto
          const [cli, func, serv] = await Promise.all([
            getClientes(),
            getFuncionarios(),
            getServicos()
          ]);
          setListaClientes(cli);
          setListaFuncionarios(func);
          setListaServicos(serv);
        } catch (error) {
          console.error("Erro ao carregar listas", error);
        }
      }
      carregarListas();
    }
  }, [isOpen]);

  // Quando escolhe um serviço, atualiza a duração automaticamente
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idSelecionado = e.target.value;
    setServicoId(idSelecionado);
    
    const servicoEncontrado = listaServicos.find(s => s._id === idSelecionado);
    if (servicoEncontrado && servicoEncontrado.duracaoMinutos) {
      setDuracaoMinutos(servicoEncontrado.duracaoMinutos);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combina data e hora para ISO String
      const dataHoraCombinada = new Date(`${data}T${hora}:00`).toISOString();

      await createAgendamento({
        cliente: clienteId,
        funcionario: funcionarioId,
        servico: servicoId,
        dataHora: dataHoraCombinada,
        duracaoMinutos: Number(duracaoMinutos),
        observacoes,
        status
      });

      alert('Agendamento criado com sucesso!');
      onSuccess();
      onClose();
      // Resetar form simples
      setObservacoes('');
    } catch (error: any) {
      // Aqui aparecerá o erro de "Conflito de horário" vindo do backend
      alert(error.message || 'Erro ao salvar.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Novo Agendamento</h2>
          <span className="close-btn" onClick={onClose}>&times;</span>
        </div>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          
          <label>Cliente</label>
          <select value={clienteId} onChange={e => setClienteId(e.target.value)} required>
            <option value="">Selecione...</option>
            {listaClientes.map(c => (
              <option key={c._id} value={c._id}>{c.nome}</option> // Use .nome
            ))}
          </select>

          <label>Serviço</label>
          <select value={servicoId} onChange={handleServiceChange} required>
            <option value="">Selecione...</option>
            {listaServicos.map(s => (
              <option key={s._id} value={s._id}>
                {s.nome} ({s.duracaoMinutos} min) - R$ {s.preco}
              </option>
            ))}
          </select>

          <label>Funcionário</label>
          <select value={funcionarioId} onChange={e => setFuncionarioId(e.target.value)} required>
            <option value="">Selecione...</option>
            {listaFuncionarios.map(f => (
              <option key={f._id} value={f._id}>{f.nome}</option>
            ))}
          </select>

          <div className="form-row">
            <div>
              <label>Data</label>
              <input type="date" value={data} onChange={e => setData(e.target.value)} required />
            </div>
            <div>
              <label>Horário</label>
              <input type="time" value={hora} onChange={e => setHora(e.target.value)} required />
            </div>
          </div>
          
          <label>Duração (minutos)</label>
          <input 
            type="number" 
            value={duracaoMinutos} 
            onChange={e => setDuracaoMinutos(Number(e.target.value))}
            style={{marginBottom: 15}}
          />

          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="marcado">Marcado</option>
            <option value="confirmado">Confirmado</option>
            <option value="concluido">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>

          <label>Observações</label>
          <textarea 
            rows={3}
            value={observacoes} 
            onChange={e => setObservacoes(e.target.value)}
            style={{width: '100%', padding: '8px', borderColor: '#ddd'}}
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
            <button type="submit" className="btn-confirm" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}