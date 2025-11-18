import "../style/Login.css";
import Logo from "../../public/img/Logo.png";
import IconEmail from "../../public/img/IconEmail.png";
import IconCadeado from "../../public/img/IconCadeado.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Erro desconhecido ao fazer login");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="left-section">
          <img
            src={Logo}
            alt="Logo Pro Salon"
            width={144}
            height={144}
            loading="lazy"
          />
          <h1 className="left-title">Bem-Vindo!</h1>
          <p className="left-subtitle">
            Sua gestão inteligente para um salão mais eficiente!
          </p>
        </div>
        <div className="right-section">
          <h2 className="form-title">Acesse sua conta</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <img
                src={IconEmail}
                alt="Icone Email"
                width={32}
                height={32}
                loading="lazy"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <img
                src={IconCadeado}
                alt="Icone Cadeado"
                width={32}
                height={32}
                loading="lazy"
              />
              <input 
			  	type="password" 
				placeholder="Senha" 
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required	
			  />
            </div>

            <button className="btn-login" type="submit">Entrar</button>

			{error && <p className="error-message">{error}</p>}

          </form>

          <p className="register-text">
            Ainda não tem cadastro?
            <a href="#">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}
