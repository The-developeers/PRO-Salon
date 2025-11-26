import React, { useState, useMemo, useEffect } from "react";
import Layout from "../components/Layout";
import { Search, Plus } from "lucide-react";
import { FaPause, FaPen, FaEye, FaPlay } from "react-icons/fa"; // Adicionado FaPlay
import "../style/Servicos.css";
import "../style/Variables.css";
import {
  apiGetServices,
  apiCreateService,
  apiUpdateService,
  apiToggleService,
} from "../api/services";

// Tipagem usada na tela
export type Categoria = "Cabelo" | "Unhas" | "Estética" | "Sobrancelha";

interface Servico {
  id: string;
  titulo: string;
  categoria: Categoria;
  descricao: string;
  preco: number;
  duracaoMinutos: number;
  comissao: number;
  imagemUrl: string;
  ativo: boolean;
}

// Metadados visuais (texto, categoria, imagem, comissão) – baseados no mock antigo
const META_SERVICOS: Array<
  Omit<Servico, "id" | "preco" | "duracaoMinutos" | "ativo">
> = [
  {
    titulo: "Corte Feminino",
    categoria: "Cabelo",
    descricao:
      "Corte personalizado de acordo com o formato do rosto e estilo pessoal",
    comissao: 30,
    imagemUrl:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80",
  },
  {
    titulo: "Coloração Completa",
    categoria: "Cabelo",
    descricao:
      "Coloração completa com produtos de alta qualidade e técnicas modernas",
    comissao: 25,
    imagemUrl:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=400&q=80",
  },
  {
    titulo: "Escova Progressiva",
    categoria: "Cabelo",
    descricao:
      "Tratamento alisante que reduz o volume e deixa os cabelos mais lisos",
    comissao: 35,
    imagemUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80",
  },
  {
    titulo: "Manicure Completa",
    categoria: "Unhas",
    descricao:
      "Cuidado personalizado para o formato e saúde natural das suas unhas.",
    comissao: 15,
    imagemUrl:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80",
  },
  {
    titulo: "Sobrancelha simples",
    categoria: "Sobrancelha",
    descricao:
      "Design de sobrancelha personalizado, que harmoniza com seu rosto e estilo.",
    comissao: 15,
    imagemUrl:
      "https://images.unsplash.com/photo-1588097281266-310ce946438c?auto=format&fit=crop&w=400&q=80",
  },
  {
    titulo: "Sobrancelha com Rena",
    categoria: "Sobrancelha",
    descricao:
      "Aplicação de henna personalizada, que realça seu olhar e estilo.",
    comissao: 20,
    imagemUrl:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=400&q=80",
  },
];

function findMetaByTitulo(titulo: string) {
  return META_SERVICOS.find(
    (m) => m.titulo.toLowerCase() === titulo.toLowerCase()
  );
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const formatDuracao = (minutos: number | undefined) => {
  if (!minutos) return "-";
  if (minutos % 60 === 0) return `${minutos / 60}h`;
  if (minutos > 60) {
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return `${h}h ${m}min`;
  }
  return `${minutos}min`;
};

const categorias: Categoria[] = ["Cabelo", "Unhas", "Estética", "Sobrancelha"];

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  // Modal de criação/edição
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Servico | null>(null);
  const [form, setForm] = useState({
    titulo: "",
    categoria: "Cabelo" as Categoria,
    preco: 0,
    duracaoMinutos: 60,
    comissao: 0,
    imagemUrl: "",
    descricao: "",
    ativo: true,
  });

  // Carregar serviços do backend
  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      setLoading(true);
      setErro(null);
      const data = await apiGetServices();

      const lista = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : [];

      if (!Array.isArray(lista)) {
        console.error("Formato inesperado da API:", data);
        setErro("Retorno inesperado do servidor.");
        return;
      }

      const mapped: Servico[] = lista.map((item: any) => {
        // Tenta achar metadados antigos pelo título, caso existam
        const meta = findMetaByTitulo(item.nome || item.titulo || "");
        
        return {
          id: item._id || item.id,
          titulo: item.nome || item.titulo || meta?.titulo || "Serviço",
          preco: Number(item.preco ?? 0),
          duracaoMinutos: Number(item.duracaoMinutos ?? 60),
          ativo: item.ativo ?? true,
          
          // CORREÇÃO: Prioriza o dado que vem do banco (item), depois o meta, depois o padrão
          categoria: item.categoria || meta?.categoria || "Cabelo",
          descricao: item.descricao || meta?.descricao || "",
          comissao: item.comissao || meta?.comissao || 0,
          imagemUrl: item.imagemUrl || meta?.imagemUrl || "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
        };
      });

      setServicos(mapped);
    } catch (e: any) {
      console.error(e);
      setErro("Erro ao carregar serviços.");
    } finally {
      setLoading(false);
    }
  }

  // Filtros
  const filteredServices = useMemo(() => {
    return servicos.filter((servico) => {
      const matchesSearch = servico.titulo
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todos" ||
        servico.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [servicos, searchTerm, selectedCategory]);

  function handleNovo() {
    setEditing(null);
    setForm({
      titulo: "",
      categoria: "Cabelo",
      preco: 0,
      duracaoMinutos: 60,
      comissao: 0,
      imagemUrl: "",
      descricao: "",
      ativo: true,
    });
    setShowForm(true);
  }

  function handleEditar(servico: Servico) {
    setEditing(servico);
    setForm({
      titulo: servico.titulo,
      categoria: servico.categoria,
      preco: servico.preco,
      duracaoMinutos: servico.duracaoMinutos,
      comissao: servico.comissao,
      imagemUrl: servico.imagemUrl,
      descricao: servico.descricao,
      ativo: servico.ativo,
    });
    setShowForm(true);
  }

  async function handlePause(servico: Servico) {
    try {
      await apiToggleService(servico.id, !servico.ativo);
      await loadServices();
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar serviço.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      nome: form.titulo,
      preco: Number(form.preco),
      duracaoMinutos: Number(form.duracaoMinutos),
      ativo: form.ativo,
      categoria: form.categoria,
      descricao: form.descricao,
      comissao: Number(form.comissao),
      imagemUrl: form.imagemUrl,
    };

    try {
      if (editing) {
        await apiUpdateService(editing.id, payload);
      } else {
        await apiCreateService(payload);
      }
      setShowForm(false);
      await loadServices();
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar serviço.");
    }
  }

  return (
    <Layout>
      <div className="servicos-page">
        {/* Header */}
        <div className="servicos-header">
          <div className="header-text">
            <h1>Serviços</h1>
            <p>Gerencie todos os Seus Serviços do salão</p>
          </div>
          <button className="btn-novo-servico" onClick={handleNovo}>
            <Plus size={18} style={{ marginRight: 5 }} />
            Novo Serviço
          </button>
        </div>

        {/* Filtros */}
        <div className="servicos-filters-bar">
          <div className="search-wrapper">
            <Search size={20} color="#888" />
            <input
              type="text"
              placeholder="Busca serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-pills">
            {["Todos", ...categorias].map((cat) => (
              <button
                key={cat}
                className={`pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && <p>Carregando serviços...</p>}
        {erro && <p style={{ color: "red" }}>{erro}</p>}

        {/* Grid */}
        <div className="servicos-grid">
          {filteredServices.map((servico) => (
            <div
              className={`service-card ${!servico.ativo ? "paused" : ""}`}
              key={servico.id}
            >
              <div
                className="card-image"
                style={{ backgroundImage: `url(${servico.imagemUrl})` }}
              />

              <div className="card-content">
                <div className="card-header-info">
                  <h3>{servico.titulo}</h3>
                  <span
                    className={`badge badge-${servico.categoria
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase()}`}
                  >
                    {servico.categoria}
                  </span>
                </div>

                <p className="card-description">{servico.descricao}</p>

                <div className="card-stats">
                  <div className="stat-item">
                    <span className="label">Preço:</span>
                    <span className="value">{formatCurrency(servico.preco)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Duração:</span>
                    <span className="value">
                      {formatDuracao(servico.duracaoMinutos)}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Comissão:</span>
                    <span className="value">{servico.comissao}%</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="action-btn btn-detail">
                    <FaEye style={{ marginRight: 4 }} />
                    Ver detalhe
                  </button>
                  <button
                    className="action-btn btn-edit"
                    onClick={() => handleEditar(servico)}
                  >
                    <FaPen style={{ marginRight: 4 }} />
                    Editar
                  </button>
                  {/* CORREÇÃO: Adicionada classe condicional e ícone Play/Pause */}
                  <button
                    className={`action-btn btn-pause ${!servico.ativo ? "paused" : "active"}`}
                    onClick={() => handlePause(servico)}
                    title={servico.ativo ? "Pausar" : "Reativar"}
                  >
                    {servico.ativo ? <FaPause /> : <FaPlay style={{ marginLeft: 2 }} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showForm && (
          <div className="servico-modal-backdrop">
            <div className="servico-modal">
              <h2>{editing ? "Editar serviço" : "Novo serviço"}</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Título
                  <input
                    type="text"
                    value={form.titulo}
                    onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                    required
                  />
                </label>

                <label>
                  Categoria
                  <select
                    value={form.categoria}
                    onChange={(e) =>
                      setForm({ ...form, categoria: e.target.value as Categoria })
                    }
                  >
                    {categorias.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Preço (R$)
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={form.preco}
                    onChange={(e) =>
                      setForm({ ...form, preco: Number(e.target.value) })
                    }
                    required
                  />
                </label>

                <label>
                  Duração (minutos)
                  <input
                    type="number"
                    min={10}
                    step={5}
                    value={form.duracaoMinutos}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        duracaoMinutos: Number(e.target.value),
                      })
                    }
                    required
                  />
                </label>

                <label>
                  Comissão (%)
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={form.comissao}
                    onChange={(e) =>
                      setForm({ ...form, comissao: Number(e.target.value) })
                    }
                  />
                </label>

                <label>
                  URL da imagem
                  <input
                    type="text"
                    value={form.imagemUrl}
                    onChange={(e) =>
                      setForm({ ...form, imagemUrl: e.target.value })
                    }
                  />
                </label>

                <label>
                  Descrição
                  <textarea
                    rows={3}
                    value={form.descricao}
                    onChange={(e) =>
                      setForm({ ...form, descricao: e.target.value })
                    }
                  />
                </label>

                <div className="servico-modal-actions">
                  <button
                    type="button"
                    className="action-btn btn-secondary" 
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="action-btn btn-edit">
                    {editing ? "Salvar" : "Criar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}