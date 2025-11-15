import { NavLink } from "react-router-dom";
import {
  TbLayoutDashboard,
  TbUser,
  TbUsers,
  TbScissors,
  TbCalendarEvent,
  TbCash,
  TbHelpCircle,
  TbLogout
} from "react-icons/tb";
import "../style/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">

      {/* MENU PRINCIPAL */}
      <nav className="sidebar-menu">
        <NavLink to="/dashboard" className="item" id="p-item">
          <TbLayoutDashboard />
          <span>Home</span>
        </NavLink>

        <NavLink to="/clientes" className="item">
          <TbUser />
          <span>Clientes</span>
        </NavLink>

        <NavLink to="/funcionarias" className="item">
          <TbUsers />
          <span>Funcionárias</span>
        </NavLink>

        <NavLink to="/servicos" className="item">
          <TbScissors />
          <span>Serviços</span>
        </NavLink>

        <NavLink to="/agendamentos" className="item">
          <TbCalendarEvent />
          <span>Agendamentos</span>
        </NavLink>

        <NavLink to="/financeiro" className="item">
          <TbCash />
          <span>Financeiro</span>
        </NavLink>
      </nav>

      {/* MENU INFERIOR */}
      <div className="sidebar-bottom">

        <NavLink to="/ajuda" className="item">
          <TbHelpCircle />
          <span>Ajuda</span>
        </NavLink>

        <button className="item logout-btn">
          <TbLogout />
          <span>Sair</span>
        </button>

      </div>
    </div>
  );
};

export default Sidebar;