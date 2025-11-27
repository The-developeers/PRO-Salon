// src/components/AppointmentCard.tsx
import '../style/Agenda.css';
import type { Agendamento } from '../api/agenda';

type AppointmentProps = {
  appointmentData: Agendamento;
  onDelete: () => void; // Recebe a função de deletar
  onStatusChange: (status: string) => void; // Recebe a função de mudar status
}

export default function AppointmentCard({ appointmentData, onDelete, onStatusChange }: AppointmentProps) {
  
  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'concluido': return 'status-realizada';
      case 'marcado': return 'status-agendada';
      case 'confirmado': return 'status-agendada';
      case 'cancelado': return 'status-vencida';
      default: return 'status-aguardando';
    }
  }

  const dataObj = new Date(appointmentData.dataHora);
  const dataFormatada = dataObj.toLocaleDateString('pt-BR');
  const horaFormatada = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const nomeCliente = appointmentData.cliente?.nome || 'Cliente não identificado';
  const nomeServico = appointmentData.servico?.nome || 'Serviço';
  const nomeFuncionario = appointmentData.funcionario?.nome || 'Profissional';
  const cargoFuncionario = appointmentData.funcionario?.cargo || '';
  const preco = appointmentData.servico?.preco || 0;

  return (
    <div className={`appointment-card ${getStatusClass(appointmentData.status)}`}> 
      
      <div className="card-info">
        <img 
          src={appointmentData.cliente?.avatar || '/img/iconman.png'} 
          alt={nomeCliente} 
          className="card-avatar"
        />

        <div className="card-client-details">
          <strong>{nomeCliente}</strong>
          <p>{nomeServico} - {nomeFuncionario} <small>({cargoFuncionario})</small></p>
          
          {/* MUDANÇA: O Status agora é um SELECT disfarçado de badge */}
          <select 
            className={`status-badge ${getStatusClass(appointmentData.status)} select-status`}
            value={appointmentData.status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="marcado">Marcado</option>
            <option value="confirmado">Confirmado</option>
            <option value="concluido">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>
          
          {appointmentData.observacoes && (
             <small style={{color: '#888', display:'block', marginTop: 4}}>
               Obs: {appointmentData.observacoes}
             </small>
          )}
        </div>
      </div>

      <div className="card-details">
        <div className="card-datetime">
          <span>{dataFormatada}</span>
          <span>{horaFormatada}</span>
        </div>
        
        <strong className="card-price">
          R$ {Number(preco).toFixed(2)}
        </strong>

        <div className="card-actions">
          <span>Ver detalhes</span>
          
          {/* MUDANÇA: O X agora é clicável */}
          <span 
            className="btn-delete" 
            onClick={onDelete}
            title="Excluir Agendamento"
          >
            X
          </span>

        </div>
      </div>
    </div>
  );
}