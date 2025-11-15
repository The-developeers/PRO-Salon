import { Calendar as CalendarIcon, Users, User, DollarSign } from "lucide-react";
import "../style/Dashboard.css";

export default function Dashboard() {

  return (
    <div className="dashboard">
      {/* Cards superiores */}
      <div className="top-cards">
        <div className="card">
          <div className="card-header">
            <span>Agendamentos Hoje</span>
            <CalendarIcon size={20} className="icon" />
          </div>
          <span className="card-number">12</span>
          <span className="percent green">+8%</span>
        </div>

        <div className="card">
          <div className="card-header">
            <span>Clientes Cadastrados</span>
            <User size={20} className="icon" />
          </div>
          <span className="card-number">248</span>
          <span className="percent green">+12%</span>
        </div>

        <div className="card">
          <div className="card-header">
            <span>Funcionárias Ativas</span>
            <Users size={20} className="icon" />
          </div>
          <span className="card-number">8</span>
          <span className="percent green">+2</span>
        </div>

        <div className="card">
          <div className="card-header">
            <span>Receita do Mês</span>
            <DollarSign size={20} className="icon" />
          </div>
          <span className="card-number">R$ 15.420</span>
          <span className="percent green">+15%</span>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="main-grid">
        {/* Agendamentos do dia */}
        <div className="agendamentos">
          <div className="section-header">
            <h2>Agendamentos de Hoje</h2>
            <button className="link">Ver todos</button>
          </div>

          <div className="ag-list">
            {[
              { nome: "Maria Silva", servico: "Corte + Escova", hora: "09:00", pro: "Ana Costa", status: "confirmado" },
              { nome: "Carla Santos", servico: "Manicure", hora: "10:30", pro: "Beatriz Lima", status: "em-andamento" },
              { nome: "Julia Oliveira", servico: "Coloração", hora: "14:00", pro: "Camila Rocha", status: "agendado" },
              { nome: "Fernanda Costa", servico: "Hidratação", hora: "15:30", pro: "Ana Costa", status: "agendado" },
            ].map((item, idx) => (
              <div key={idx} className="ag-item">
                <div>
                  <p className="ag-name">{item.nome}</p>
                  <p className="ag-servico">{item.servico}</p>
                </div>
                <div className="ag-info">
                  <p className="ag-hora">{item.hora}</p>
                  <p className="ag-pro">{item.pro}</p>
                </div>
                <span className={`status ${item.status}`}>{item.status.replace("-", " ")}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Agenda do Dia */}
        <div className="agenda-dia">
          <h2 className="section-title">Agenda do Dia</h2>

          <div className="agenda-list">
            {[
              { hora: "08:00", nome: null, servico: null },
              { hora: "09:00", nome: "Maria Silva", servico: "Corte + Escova" },
              { hora: "10:00", nome: null, servico: null },
              { hora: "10:30", nome: "Carla Santos", servico: "Manicure" },
              { hora: "11:00", nome: null, servico: null },
              { hora: "11:30", nome: null, servico: null },
            ].map((a, idx) => (
              <div key={idx} className={`agenda-item ${a.nome ? "ocupado" : "livre"}`}>
                <p className="hora">{a.hora}</p>

                {a.nome ? (
                  <div>
                    <p className="ag-nome">{a.nome}</p>
                    <p className="ag-servico">{a.servico}</p>
                  </div>
                ) : (
                  <p className="livre-text">Disponível</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
