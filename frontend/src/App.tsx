import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from './page/Login'
import Usuario from "./page/Usuario";
import Agenda from "./page/Agenda";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuario" element={<Usuario/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/clientes" element={<div>Clientes</div>} />
        <Route path="/funcionarias" element={<div>Funcionárias</div>} />
        <Route path="/servicos" element={<div>Serviços</div>} />
        <Route path="/agendamentos" element={<div><Agenda/></div>}/>
        <Route path="/financeiro" element={<div>Financeiro</div>} />
        <Route path="/ajuda" element={<div>Ajuda</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
