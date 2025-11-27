// src/hooks/useUserProfile.ts
import { useEffect, useState } from "react";
import { authApi } from "../api/authProfile";
import { usersApi } from "../api/usersProfile";

// src/types/user.ts
export interface User {
  _id: string;
  nome: string;
  email: string;
  role?: string;
  telefone?: string;
  createdAt?: string;
  updatedAt?: string;
}


export function useUserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function loadUser() {
    try {
      setLoading(true);
      setError(null);
      const res = await authApi.me();
      // assumimos res.data.data -> user
      setUser(res.data?.data ?? null);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  }

  async function changePassword(newPassword: string) {
    if (!user) throw new Error("Usuário não carregado");
    try {
      setSaving(true);
      setError(null);
      await usersApi.update(user._id, { password: newPassword });
      // opcional: recarregar usuário para pegar updatedAt
      await loadUser();
      return true;
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Erro ao alterar senha");
      throw err;
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return { user, loading, error, saving, loadUser, changePassword };
}
