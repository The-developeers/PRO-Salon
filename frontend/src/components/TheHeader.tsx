import { FiUser } from "react-icons/fi";
import { useState } from "react";
import "../style/TheHeader.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function TheHeader() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(false);

  // função de logout no sidebar
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="header-container">
      <div className="logo">
        <img src="/img/LogoPrincipal.png" alt="Logo" className="logo" />
      </div>

      <div className="profile-area">
        <div className="user-info">
          <span className="welcome-text">Bem-vinda, Leticia</span>
          <span className="role-text">Administrador</span>
        </div>

        <div
          className="avatar"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <FiUser size={22} />
        </div>

        {openMenu && (
          <div className="dropdown-menu">
            <Link to="/usuario" ><button>Editar Perfil</button></Link>
            <button className="logout" onClick={handleLogout}>Sair</button>
          </div>
        )}
      </div>
    </header>
  );
}
