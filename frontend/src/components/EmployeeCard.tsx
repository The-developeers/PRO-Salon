import React from "react";

export interface Employee {
  _id: string;
  nome: string;
  cargo?: string;
  telefone?: string;
  ativo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  e: Employee;
  onEdit: (e: Employee) => void;
  onDelete: (id: string) => void;
}

export const EmployeeCard: React.FC<Props> = ({ e, onEdit, onDelete }) => {
  const initials = e.nome ? e.nome.split(" ").slice(0,2).map(n=>n[0]).join("").toUpperCase() : "US";

  return (
    <div className="emp-card">
      <div className="emp-card-top">
        <div className="avatar">{initials}</div>
        <div className="info">
          <h3>{e.nome}</h3>
          <small className="cargo">{e.cargo || "—"}</small>
        </div>
        <div className={`status ${e.ativo ? "ativo" : "inativo"}`}>{e.ativo ? "Ativo" : "Inativo"}</div>
      </div>

      <div className="emp-body">
        <div className="line">📞 {e.telefone || "—"}</div>
        <div className="meta">Criado: {e.createdAt ? new Date(e.createdAt).toLocaleDateString() : "—"}</div>
      </div>

      <div className="emp-actions">
        <button className="btn-edit" onClick={() => onEdit(e)}>Editar</button>
        <button className="btn-delete" onClick={() => onDelete(e._id)}>Excluir</button>
      </div>
    </div>
  );
};
