import axios from "axios";

const API_BASE = "http://localhost:5000/api/v1";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const api = axios.create({
  baseURL: `${API_BASE}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const employeesApi = {
  list: (search?: string) =>
    api.get("/employees", { headers: getAuthHeader(), params: search ? { search } : {} }),
  getById: (id: string) => api.get(`/employees/${id}`, { headers: getAuthHeader() }),
  create: (payload: Partial<any>) => api.post("/employees", payload, { headers: getAuthHeader() }),
  update: (id: string, payload: Partial<any>) => api.put(`/employees/${id}`, payload, { headers: getAuthHeader() }),
  remove: (id: string) => api.delete(`/employees/${id}`, { headers: getAuthHeader() }),
};
