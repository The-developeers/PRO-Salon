import Layout from "../components/Layout";
import React, { useState } from "react";
import { useEmployees } from "../hooks/useEmployees";
import { EmployeeCard } from "../components/EmployeeCard";
import "../style/Funcionarios.css";

export interface Employee {
  _id: string;
  nome: string;
  cargo?: string;
  telefone?: string;
  ativo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function EmployeesPage() {
  const { employees, loading, error, load, create, update, remove } = useEmployees();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  // form state
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [saving, setSaving] = useState(false);

  function openCreate() {
    setEditing(null);
    setNome("");
    setCargo("");
    setTelefone("");
    setAtivo(true);
    setIsModalOpen(true);
  }

  function openEdit(e: Employee) {
    setEditing(e);
    setNome(e.nome);
    setCargo(e.cargo ?? "");
    setTelefone(e.telefone ?? "");
    setAtivo(e.ativo);
    setIsModalOpen(true);
  }

  async function handleSave() {
    try {
      if (!nome.trim()) return alert("Nome é obrigatório");
      setSaving(true);
      const payload = { nome, cargo, telefone, ativo };
      if (editing) {
        await update(editing._id, payload);
      } else {
        await create(payload);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar: " + (err?.message || ""));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Confirma exclusão?")) return;
    try {
      await remove(id);
    } catch (err: any) {
      console.error(err);
      alert("Erro ao excluir: " + (err?.message || ""));
    }
  }

  async function doSearch() {
    await load(search || undefined);
  }

  return (
	<Layout>
    <div className="employees-page">
      <header className="emp-header">
        <h1>Funcionárias</h1>
        <div className="header-actions">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, cargo..."
            className="search-input"
            onKeyDown={(ev) => { if (ev.key === "Enter") doSearch(); }}
          />
          <button onClick={doSearch} className="btn-search">Buscar</button>
          <button onClick={openCreate} className="btn-new">+ Nova</button>
        </div>
      </header>

      {loading ? (<div className="center">Carregando...</div>) : null}
      {error ? (<div className="error">{error}</div>) : null}

      <div className="grid">
        {employees.map(e => (
          <EmployeeCard key={e._id} e={e} onEdit={openEdit} onDelete={handleDelete} />
        ))}
      </div>

      {/* Modal simples */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{editing ? "Editar Funcionária" : "Nova Funcionária"}</h2>

            <label>Nome</label>
            <input value={nome} onChange={(ev) => setNome(ev.target.value)} />

            <label>Cargo</label>
            <input value={cargo} onChange={(ev) => setCargo(ev.target.value)} />

            <label>Telefone</label>
            <input value={telefone} onChange={(ev) => setTelefone(ev.target.value)} />

            <label>
              <input type="checkbox" checked={ativo} onChange={(ev) => setAtivo(ev.target.checked)} />
              &nbsp;Ativo
            </label>

            <div className="modal-actions">
              <button onClick={() => setIsModalOpen(false)} className="btn-cancel">Cancelar</button>
              <button onClick={handleSave} disabled={saving} className="btn-save">
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
	</Layout>
  );
}
