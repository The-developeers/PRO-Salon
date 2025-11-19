// src/pages/Clientes/ClienteFormModal.tsx

import React, { useState } from "react";
import type { User } from '../api/users'

export default function ClienteFormModal({
  initial,
  onClose,
  onSave,
}: {
  initial: User | null;
  onClose: () => void;
  onSave: (payload: {
    nome: string;
    email: string;
    telefone?: string;
    password?: string;
  }) => void;
}) {
  const [nome, setNome] = useState(initial?.nome || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [telefone, setTelefone] = useState(initial?.telefone || "");
  const [password, setPassword] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome || !email) {
      alert("Nome e email são obrigatórios");
      return;
    }

    onSave({
      nome,
      email,
      telefone,
      ...(initial ? {} : { password }),
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{initial ? "Editar cliente" : "Novo cliente"}</h3>

        <form onSubmit={submit}>
          <label>Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Telefone</label>
          <input value={telefone} onChange={(e) => setTelefone(e.target.value)} />

          {!initial && (
            <>
              <label>Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </>
          )}

          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn primary">{initial ? "Salvar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
