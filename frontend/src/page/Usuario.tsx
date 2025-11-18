import { useState } from "react";
import { User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TheHeader from "../components/TheHeader";
import "../style/Usuario.css";

export default function Usuario() {
  const [editando, setEditando] = useState(false);

  const [formData, setFormData] = useState({
    nome: "Letícia Frutuozo",
    email: "leticia@example.com",
    telefone: "(11) 99999-9999",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSalvar() {
    setEditando(false);
  }

  return (
    <div className="usuario-page">
      <Sidebar />
      <div className="usuario-conteudo">
        <TheHeader />

        <div className="usuario-container">
          <h2 className="usuario-title">
            <User size={26} style={{ marginRight: 8 }} />
            Meu Perfil
          </h2>

          <div className="usuario-form">
            <div>
              <label className="usuario-label">Nome</label>
              <input
                name="nome"
                disabled={!editando}
                className="usuario-input"
                value={formData.nome}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="usuario-label">Email</label>
              <input
                name="email"
                disabled={!editando}
                className="usuario-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="usuario-label">Telefone</label>
              <input
                name="telefone"
                disabled={!editando}
                className="usuario-input"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>

            <div className="usuario-buttons">
              {!editando ? (
                <button className="btn-editar" onClick={() => setEditando(true)}>
                  Editar
                </button>
              ) : (
                <button className="btn-salvar" onClick={handleSalvar}>
                  Salvar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
