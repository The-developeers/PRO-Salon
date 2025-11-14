import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./page/Home";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/clientes" element={<div>Clientes</div>} />
        <Route path="/funcionarias" element={<div>Funcionárias</div>} />
        <Route path="/servicos" element={<div>Serviços</div>} />
        <Route path="/agendamentos" element={<div>Agendamentos</div>} />
        <Route path="/financeiro" element={<div>Financeiro</div>} />
        <Route path="/ajuda" element={<div>Ajuda</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
