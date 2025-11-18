import '../style/Agenda.css'; 

export default function AgendaHeader() {
  return (
    <div className="agenda-header">
      <div>
        <h1>Agendamentos</h1>
        <p>Gerencie todos os agendamentos do salão.</p>
      </div>
      <button className="btn-novo-agendamento">
        + Novo Agendamento
      </button>
    </div>
  );
}