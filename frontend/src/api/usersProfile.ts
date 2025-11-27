// src/api/users.ts
import axios from "axios";

const API_BASE = "http://localhost:5000/api/v1";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const usersApi = {
  list: () => api.get("/users", { headers: getAuthHeader() }),
  update: (id: string, payload: any) => api.put(`/users/${id}`, payload, { headers: getAuthHeader() }),
  getById: (id: string) => api.get(`/users/${id}`, { headers: getAuthHeader() }),
};
