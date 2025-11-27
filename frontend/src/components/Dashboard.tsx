// frontend/src/components/Dashboard.tsx
import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Users, User, DollarSign } from "lucide-react";
import { getDashboardData } from "../api/agenda"; // Ajuste o caminho do import
import "../style/Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    clientes: 0,
    funcionarios: 0,
    agendamentosHojeCount: 0,
    receitaMensal: 0,
    listaHoje: [] as any[] // Lista dos agendamentos
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDashboardData();
        setStats(data);
      } catch (error) {
        console.error("Erro dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Helpers de formatação
  const formatMoney = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const formatHora = (dataISO: string) => {
    const d = new Date(dataISO);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // --- LÓGICA DA LINHA DO TEMPO (AGENDA DO DIA) ---
  // Gera horários das 08:00 as 18:00
  const horariosTimeline = Array.from({ length: 11 }, (_, i) => 8 + i); // [8, 9, 10... 18]

  return (
    <div className="dashboard">
      {/* Cards superiores */}
      <div className="top-cards">
        <div className="card">
          <div className="card-header">
            <span>Agendamentos Hoje</span>
            <CalendarIcon size={20} className="icon" />
          </div>
          <span className="card-number">{loading ? "..." : stats.agendamentosHojeCount}</span>
          <span className="percent green">Dia atual</span>
        </div>

        <div className="card">
          <div className="card-header">
            <span>Clientes Cadastrados</span>
            <User size={20} className="icon" />
          </div>
          <span className="card-number">{loading ? "..." : stats.clientes}</span>
          <span className="percent green">Total</span>
        </div>

        <div className="card">
          <div className="card-header">
            <span>Funcionárias Ativas</span>
            <Users size={20} className="icon" />
          </div>
          <span className="card-number">{loading ? "..." : stats.funcionarios}</span>
          <span className="percent green">Equipe</span>
        </div>

        <div className="card">
          <div className="card-header">
            <span>Receita do Mês</span>
            <DollarSign size={20} className="icon" />
          </div>
          <span className="card-number">
            {loading ? "..." : formatMoney(stats.receitaMensal)}
          </span>
          <span className="percent green">Estimado</span>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="main-grid">
        
        {/* LISTA: Agendamentos de Hoje */}
        <div className="agendamentos">
          <div className="section-header">
            <h2>Agendamentos de Hoje</h2>
            <button className="link">Atualizar</button>
          </div>

          <div className="ag-list">
  {stats.listaHoje.length === 0 ? (
    <p style={{ padding: 20, color: '#888' }}>Nenhum agendamento para hoje.</p>
  ) : (
    stats.listaHoje.map((item: any, idx) => (
      // Adicionamos a classe baseada no status para pintar a borda esquerda
      <div key={idx} className={`ag-item status-${item.status?.toLowerCase() || 'marcado'}`}>
        
        {/* LADO ESQUERDO: Avatar + Infos */}
        <div className="ag-left">
          {/* Avatar (Se não tiver foto, usa um placeholder) */}
          <img 
            src={item.cliente?.avatar || "https://ui-avatars.com/api/?name=" + (item.cliente?.nome || "C")} 
            alt="Avatar" 
            className="ag-avatar"
          />
          
          <div className="ag-texts">
            <p className="ag-name">{item.cliente?.nome || 'Cliente'}</p>
            <p className="ag-servico">{item.servico?.nome || 'Serviço'}</p>
          </div>
        </div>

        {/* LADO DIREITO: Hora + Pro + Status */}
        <div className="ag-right">
          <div className="ag-info">
            <p className="ag-hora">{formatHora(item.dataHora)}</p>
            <p className="ag-pro">{item.funcionario?.nome?.split(' ')[0] || 'Pro'}</p> {/* Só o primeiro nome */}
          </div>
          
          <span className={`status ${item.status?.toLowerCase() || 'marcado'}`}>
            {item.status}
          </span>
        </div>

      </div>
    ))
  )}
</div>
        </div>

        {/* TIMELINE: Agenda do Dia */}
        <div className="agenda-dia">
          <h2 className="section-title">Agenda do Dia</h2>

          <div className="agenda-list">
            {horariosTimeline.map((hora) => {
              // Verifica se tem agendamento começando nessa hora (Ex: 14:00)
              const agendamentoNestaHora = stats.listaHoje.find((ag: any) => {
                const h = new Date(ag.dataHora).getHours();
                return h === hora;
              });

              const horaFormatada = `${hora.toString().padStart(2, '0')}:00`;

              return (
                <div key={hora} className={`agenda-item ${agendamentoNestaHora ? "ocupado" : "livre"}`}>
                  <p className="hora">{horaFormatada}</p>

                  {agendamentoNestaHora ? (
                    <div>
                      <p className="ag-nome">{agendamentoNestaHora.cliente?.nome}</p>
                      <p className="ag-servico">{agendamentoNestaHora.servico?.nome}</p>
                    </div>
                  ) : (
                    <p className="livre-text">Disponível</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}