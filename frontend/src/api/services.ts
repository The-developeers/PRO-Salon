
const BASE_URL = "http://localhost:5000/api/v1/services";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Erro HTTP ${res.status}`);
  }

  if (res.status === 204) return null;

  return res.json();
}

export async function apiGetServices() {
  return request("/", { method: "GET" });
}

export async function apiCreateService(payload: any) {
  return request("/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function apiUpdateService(id: string, payload: any) {
  return request(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function apiToggleService(id: string, ativo: boolean) {
  return request(`/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ ativo }),
  });
}

export async function apiDeleteService(id: string) {
  return request(`/${id}`, { method: "DELETE" });
}
