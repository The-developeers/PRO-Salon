import { useEffect, useMemo, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../api/users";
import type { User as ApiUser } from '../api/users'
import ClienteFormModal from "../components/ClienteFormModal";
import ClienteViewModal from "../components/ClienteViewModal";
import { FaEye, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import Layout from "../components/Layout";
import '../style/Clientes.css'

// Utilitarios
function formatCurrency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function fmtDate(iso?: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString();
}

// Interface local
type ClientRow = ApiUser & {
  ultimaVisita?: string;
  totalGasto?: number;
  status?: string;
};

export default function Clientes() {
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [onlyClients, setOnlyClients] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ClientRow | null>(null);
  const [viewing, setViewing] = useState<ClientRow | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const all = await getUsers();
      const clientes = all
        .filter((u) => u.role === "cliente")
        .map((u) => ({
          ...u,
          ultimaVisita: (u as any).ultimaVisita || "-",
          totalGasto: (u as any).totalGasto ?? 0,
          status: (u as any).status || "ativo",
        }));
      setClients(clientes);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  }

  // Filtro local
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return clients;
    return clients.filter((c) => {
      return (
        (c.nome || "").toLowerCase().includes(s) ||
        (c.email || "").toLowerCase().includes(s) ||
        (c.telefone || "").toLowerCase().includes(s)
      );
    });
  }, [clients, search]);

  // Abrir modal novo
  function openNew() {
    setEditing(null);
    setShowForm(true);
  }

  // Abrir edição
  function openEdit(c: ClientRow) {
    setEditing(c);
    setShowForm(true);
  }

  // Abrir visualização
  function openView(c: ClientRow) {
    setViewing(c);
  }

  // Deletar
  async function handleDelete(id: string) {
    if (!confirm("Deseja realmente excluir esse cliente?")) return;
    try {
      await deleteUser(id);
      await load();
    } catch (err: any) {
      alert(err.message || "Erro ao excluir");
    }
  }

  // Salvar
  async function handleSave(form: {
    nome: string;
    email: string;
    telefone?: string;
    password?: string;
  }) {
    try {
      if (editing) {
        await updateUser(editing._id, {
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
        });
      } else {
        await createUser({ ...form, role: "cliente" });
      }
      setShowForm(false);
      await load();
    } catch (err: any) {
      alert(err.message || "Erro ao salvar cliente");
    }
  }

  return (
    <Layout>
      <div className="clientes-page">
        <div className="clientes-header">
          <div className="title">
            <h1>Clientes</h1>
            <span className="subtitle">Gerencie seus clientes</span>
          </div>
          <div className="actions">
            <button className="btn primary" onClick={openNew}>
              + Novo Cliente
            </button>
          </div>
        </div>

        <div className="clientes-search">
          <input
            placeholder="Buscar por nome, telefone ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="total">Total: {filtered.length} clientes</div>
        </div>

        {loading ? (
          <div className="loading">Carregando...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="clientes-table">
            <div className="table-head">
              <div>Cliente</div>
              <div>Contato</div>
              <div>Última Visita</div>
              <div>Total Gasto</div>
              <div>Status</div>
              <div>Ações</div>
            </div>

            <div className="table-body">
              {filtered.map((c) => (
                <div className="row" key={c._id}>
                  <div className="col cliente">
                    <div className="avatar">
                      {(c.nome || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="nome">{c.nome}</div>
                  </div>

                  <div className="col contato">
                    <div>{c.telefone || "-"}</div>
                    <div className="email">{c.email}</div>
                  </div>

                  <div className="col">{c.ultimaVisita || "-"}</div>

                  <div className="col">{formatCurrency(c.totalGasto || 0)}</div>

                  <div className="col">
                    <span
                      className={`badge ${
                        c.status === "ativo" ? "ativo" : "inativo"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <div className="col acoes">
                    <button
                      className="icon"
                      onClick={() => openView(c)}
                      title="Ver"
                    >
                      <FaEye/>
                    </button>
                    <button
                      className="icon"
                      onClick={() => openEdit(c)}
                      title="Editar"
                    >
                      <FaPencilAlt/>
                    </button>
                    <button
                      className="icon"
                      onClick={() => handleDelete(c._id)}
                      title="Excluir"
                    >
                      <FaRegTrashAlt/>
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && <div className="no-results">Nenhum cliente encontrado</div>}
            </div>
          </div>
        )}

        {showForm && (
          <ClienteFormModal
            initial={editing}
            onClose={() => setShowForm(false)}
            onSave={handleSave}
          />
        )}

        {viewing && (
          <ClienteViewModal
            item={viewing}
            onClose={() => setViewing(null)}
          />
        )}
        
      </div>
    </Layout>
  )
}