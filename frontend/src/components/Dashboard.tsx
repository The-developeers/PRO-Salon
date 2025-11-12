import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../style/Dashboard.css";

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const agendamentos = [
    { nome: "Eduarda Pinheiro", servico: "Escova", horario: "08:00" },
    { nome: "Paula Rocha", servico: "Corte + Hidratação", horario: "09:00" },
    { nome: "Camila Souza", servico: "Coloração", horario: "11:00" },
    { nome: "Fernanda Lima", servico: "Manicure", horario: "14:00" },
  ];

  const horarios = Array.from({ length: 16 }, (_, i) => {
    const hora = `${(8 + i).toString().padStart(2, "0")}:00`;
    const ocupado = agendamentos.find((a) => a.horario === hora);
    return {
      hora,
      nome: ocupado ? ocupado.nome : null,
      disponivel: !ocupado,
    };
  });

  return (
    <div className="dashboard-container">
      {/* VISÃO GERAL */}
      <div className="overview-section">
        <div className="overview-card">
          <h3>Agendamentos Hoje</h3>
          <p>4</p>
        </div>
        <div className="overview-card">
          <h3>Clientes</h3>
          <p>120</p>
        </div>
        <div className="overview-card">
          <h3>Funcionárias</h3>
          <p>6</p>
        </div>
        <div className="overview-card">
          <h3>Saldo do Mês</h3>
          <p>R$ 12.350</p>
        </div>
      </div>

      {/* AGENDAMENTOS + HORÁRIOS DISPONÍVEIS */}
      <div className="schedules-section">
        {/* Agendamentos do Dia */}
        <div className="appointments-section">
          <h2>Agendamentos de Hoje</h2>
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Serviço</th>
                <th>Horário</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>{item.servico}</td>
                  <td>{item.horario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Horários Disponíveis */}
        <div className="available-times-section">
          <h2>Horários Disponíveis</h2>
          <div className="time-grid">
            {horarios.map((hora, index) => (
              <div
                key={index}
                className={`time-slot ${hora.disponivel ? "available" : "occupied"}`}
              >
                {hora.hora}{" "}
                {!hora.disponivel && <span>— {hora.nome}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CALENDÁRIO */}
      <div className="calendar-section">
        <h2>Calendário</h2>
        <Calendar
          onChange={(value) => setDate(value as Date)}
          value={date}
          locale="pt-BR"
          next2Label={null}
          prev2Label={null}
        />
      </div>

      {/* AÇÕES RÁPIDAS */}
      <div className="quick-actions">
        <h2>Ações Rápidas</h2>
        <div className="actions-grid">
          <input type="text" placeholder="Nome do cliente" />
          <input type="time" />
          <select>
            <option>Serviço</option>
            <option>Lavagem</option>
            <option>Corte</option>
            <option>Escova</option>
          </select>
          <button>Agendar</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
