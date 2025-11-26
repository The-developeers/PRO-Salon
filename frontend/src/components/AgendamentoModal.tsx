// src/components/AgendamentoModal.tsx
import React, { useState } from 'react';
import { createAgendamento } from '../api/agenda';
import '../style/Agenda.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Nova prop para avisar que salvou com sucesso
}

export default function AgendamentoModal({ isOpen, onClose, onSuccess }: ModalProps) {
  // 1. Estados para capturar os inputs
  const [clientName, setClientName] = useState('');
  const [service, setService] = useState('Corte');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // 2. Função que roda ao clicar em SALVAR
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede a página de recarregar
    setLoading(true);

    try {
      // Monta o objeto para mandar pro backend
      await createAgendamento({
        clientName,
        service,
        specialist: 'Profissional Padrão', // Você pode criar um input pra isso depois
        date,
        time,
        price: 100.00, // Preço fixo ou criar input depois
        status: 'Agendada'
      });

      // Se deu certo:
      alert('Agendamento salvo com sucesso!');
      onSuccess(); // Avisa a página pai para atualizar
      onClose();   // Fecha o modal
      
      // Limpa o form
      setClientName('');
      setDate('');
      setTime('');

    } catch (error) {
      alert('Erro ao salvar agendamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Novo Agendamento</h2>
          <span className="close-btn" onClick={onClose}>&times;</span>
        </div>
        
        {/* O onSubmit chama a nossa função handleSubmit */}
        <form className="modal-form" onSubmit={handleSubmit}>
          
          <label>Nome da Cliente</label>
          <input 
            type="text" 
            placeholder="Ex: Ana Silva" 
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />

          <label>Serviço</label>
          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="Corte">Corte</option>
            <option value="Coloração">Coloração</option>
            <option value="Manicure">Manicure</option>
            <option value="Lavagem">Lavagem</option>
          </select>

          <div className="form-row">
            <div>
              <label>Data</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Horário</label>
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

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