// src/components/AgendaHeader.tsx
import '../style/Agenda.css';

// 1. Definimos que esse componente recebe uma função de clique
type AgendaHeaderProps = {
  onNovoAgendamento: () => void;
}

// 2. Recebemos a função nas props
export default function AgendaHeader({ onNovoAgendamento }: AgendaHeaderProps) {
  return (
    <div className="agenda-header">
      <div>
        <h1>Agendamentos</h1>
        <p>Gerencie todos os agendamentos do salão.</p>
      </div>
      
      {/* 3. Adicionamos o evento onClick no botão */}
      <button className="btn-novo-agendamento" onClick={onNovoAgendamento}>
        + Novo Agendamento
      </button>
    </div>
  );
}