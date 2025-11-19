import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from './page/Login'
import Usuario from "./page/Usuario";
import Agenda from "./page/Agenda";
import Clientes from './page/Clientes'
import Financeiro from "./page/Financeiro";
import Funcionario from "./page/Funcionarios";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";
import Servicos from "./page/Servicos";

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
          <Route path="/funcionarias" element={<PrivateRoute>
            <Funcionario/>
          </PrivateRoute>} />
          <Route path="/servicos" element={<PrivateRoute><Servicos/></PrivateRoute>} />
          <Route path="/agendamentos" element={<div><Agenda/></div>}/>
          <Route path="/financeiro" element={<PrivateRoute>
            <Financeiro/>
          </PrivateRoute>} />
          <Route path="/ajuda" element={<div>Ajuda</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
