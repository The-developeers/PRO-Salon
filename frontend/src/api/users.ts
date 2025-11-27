export interface User {
  _id: string;
  nome: string;
  email: string;
  telefone?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  ultimaVisita?: string; 
  totalGasto?: number;    
  status?: string;        
}

const BASE = "http://localhost:5000/api/v1/users";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(BASE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Erro ao buscar usuários");
  return data.data || [];
}

export async function getUserById(id: string): Promise<User> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Usuário não encontrado");
  return data.data;
}

export async function createUser(payload: Partial<User & { password: string }>) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Erro ao criar usuário");
  return data.data;
}

export async function updateUser(id: string, payload: Partial<User>) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Erro ao atualizar usuário");
  return data.data;
}

export async function deleteUser(id: string) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data?.message || "Erro ao deletar usuário");
  }
  return;
}
