import { FiUser } from "react-icons/fi";
import { useState } from "react";
import "../style/TheHeader.css";

export default function TheHeader() {
  const [openMenu, setOpenMenu] = useState(false);

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
            <button>Editar Perfil</button>
            <button className="logout">Sair</button>
          </div>
        )}
      </div>
    </header>
  );
}
