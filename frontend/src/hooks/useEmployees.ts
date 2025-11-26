import { useEffect, useState } from "react";
import { employeesApi } from "../api/employees";

export interface Employee {
  _id: string;
  nome: string;
  cargo?: string;
  telefone?: string;
  ativo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function load(search?: string) {
    try {
      setLoading(true);
      setError(null);
      const res = await employeesApi.list(search);
      // Assumimos res.data.data === Employee[]
      setEmployees(res.data?.data ?? []);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Erro ao carregar funcionários");
    } finally {
      setLoading(false);
    }
  }

  async function create(payload: Partial<Employee>) {
    const res = await employeesApi.create(payload);
    // res.data.data -> novo funcionário
    setEmployees(prev => [res.data.data, ...prev]);
    return res.data.data;
  }

  async function update(id: string, payload: Partial<Employee>) {
    const res = await employeesApi.update(id, payload);
    setEmployees(prev => prev.map(p => (p._id === id ? res.data.data : p)));
    return res.data.data;
  }

  async function remove(id: string) {
    await employeesApi.remove(id);
    setEmployees(prev => prev.filter(p => p._id !== id));
  }

  useEffect(() => {
    load();
  }, []);

  return {
    employees,
    loading,
    error,
    load,
    create,
    update,
    remove,
  };
}
