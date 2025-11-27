// src/pages/ProfilePage.tsx
import React, { useState } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import "../style/Usuario.css";
import Layout from "../components/Layout";

export default function ProfilePage() {
  const { user, loading, error, saving, changePassword } = useUserProfile();

  const [showPwd, setShowPwd] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!password || password.length < 6) {
      setMessage("Senha deve ter ao menos 6 caracteres");
      return;
    }
    if (password !== passwordConfirm) {
      setMessage("As senhas não combinam");
      return;
    }

    try {
      await changePassword(password);
      setMessage("Senha atualizada com sucesso");
      setPassword("");
      setPasswordConfirm("");
      setShowPwd(false);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || err?.message || "Erro ao alterar senha");
    }
  }

  if (loading) return <div className="profile-page"><p>Carregando perfil...</p></div>;
  if (error) return <div className="profile-page"><p className="error">{error}</p></div>;

  return (
    <Layout>
    <div className="profile-page">
      <header className="profile-header">
        <h1>Meu Perfil</h1>
      </header>

      {!user ? (
        <div>Nenhum usuário carregado.</div>
      ) : (
        <div className="profile-card">
          <div className="left">
            <div className="avatar">
              {(user.nome || "U").split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase()}
            </div>
          </div>

          <div className="center">
            <h2>{user.nome}</h2>
            <div className="meta">{user.role ?? "—"}</div>
            <div className="info">📧 {user.email}</div>
            <div className="info">📞 {user.telefone ?? "—"}</div>
            <div className="info">Criado: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</div>
          </div>

          <div className="right">
            <button className="btn-edit" onClick={() => setShowPwd(s => !s)}>
              {showPwd ? "Cancelar" : "Alterar senha"}
            </button>
          </div>
        </div>
      )}

      {showPwd && (
        <form className="pwd-form" onSubmit={handleChangePassword}>
          <h3>Alterar senha</h3>
          <label>Nova senha</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Digite a nova senha"
          />
          <label>Confirmar senha</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            placeholder="Confirme a nova senha"
          />
          {message && <div className="message">{message}</div>}
          <div className="actions">
            <button type="button" className="btn-cancel" onClick={() => { setShowPwd(false); setMessage(null); }}>
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? "Salvando..." : "Salvar senha"}
            </button>
          </div>
        </form>
      )}
    </div>
    </Layout>
  );
}
