import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from './page/Login'
import Usuario from "./page/Usuario";
import Agenda from "./page/Agenda";
import Clientes from './page/Clientes'
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/login" 
            element={<Login />} 
          />
          <Route 
            path="/" 
            element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
            } 
          />
          <Route 
            path="/usuario" 
            element={
              <PrivateRoute>
                <Usuario/>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
            <PrivateRoute>

              <Home />
            </PrivateRoute>
            } />
          <Route path="/clientes" element={<PrivateRoute>
            <Clientes/>
          </PrivateRoute>} />
          <Route path="/funcionarias" element={<div>Funcionárias</div>} />
          <Route path="/servicos" element={<div>Serviços</div>} />
          <Route path="/agendamentos" element={<div><Agenda/></div>}/>
          <Route path="/financeiro" element={<div>Financeiro</div>} />
          <Route path="/ajuda" element={<div>Ajuda</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
