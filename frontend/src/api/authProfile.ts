// src/api/auth.ts
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

export const authApi = {
  me: () => api.get("/auth/me", { headers: getAuthHeader() }),
};
