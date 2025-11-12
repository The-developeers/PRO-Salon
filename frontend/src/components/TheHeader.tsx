import React from "react"
import "../style/TheHeader.css"

export const TheHeader: React.FC = () => {
  return (
    <header>
      <h1>PRO-SALON</h1>
      <div>
        <span>Bem-vinda, Letícia</span>
        <img src="https://via.placeholder.com/40" alt="Usuário" />
      </div>
    </header>
  )
}
