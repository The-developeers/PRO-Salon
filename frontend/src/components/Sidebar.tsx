import React from "react"
import "../style/Sidebar.css"

export const Sidebar: React.FC = () => {
  return (
    <aside>
      <nav>
        <button>🏠 Início</button>
        <button>📅 Agendamentos</button>
        <button>💇 Salão</button>
        <button>💰 Financeiro</button>
        <button>📊 Relatórios</button>
        <button>👤 Perfil</button>
      </nav>
      <div className="logout">
        <button>🚪 Sair</button>
      </div>
    </aside>
  )
}
