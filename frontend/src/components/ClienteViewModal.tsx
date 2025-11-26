// src/pages/Clientes/ClienteViewModal.tsx

import React from "react";
import type { User } from '../api/users'

export default function ClienteViewModal({
  item,
  onClose,
}: {
  item: User & {
    ultimaVisita?: string;
    totalGasto?: number;
    status?: string;
  };
  onClose: () => void;
}) {
  function formatCurrency(v: number) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Dados do cliente</h3>

        <div className="view-grid">
          <div><strong>Nome</strong><div>{item.nome}</div></div>
          <div><strong>Email</strong><div>{item.email}</div></div>
          <div><strong>Telefone</strong><div>{item.telefone || "—"}</div></div>
          <div><strong>Última Visita</strong><div>{item.ultimaVisita || "—"}</div></div>
          <div><strong>Total Gasto</strong><div>{formatCurrency(item.totalGasto || 0)}</div></div>
          <div><strong>Status</strong><div>{item.status || "ativo"}</div></div>
        </div>

        <div style={{ marginTop: 16, textAlign: "right" }}>
          <button className="btn" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
