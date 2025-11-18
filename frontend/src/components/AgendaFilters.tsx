import '../style/Agenda.css'; 

export default function AgendaFilters() {
  return (
    <div className="agenda-filters">
      <input type="text" placeholder="Buscar Cliente, Especialidade ou Serviço..." />
      <select>
        <option value="">Todos os Status</option>
        <option value="realizada">Realizada</option>
        <option value="agendada">Agendada</option>
        <option value="vencida">Vencida</option>
      </select>
      <input type="date" />
      <button className="btn-limpar-filtro">Limpar Filtro</button>
    </div>
  );
}