// src/page/Agenda.tsx
import { useState } from 'react'; 
import Sidebar from "../components/Sidebar";
import TheHeader from "../components/TheHeader";
import AgendaFilters from "../components/AgendaFilters";
import AgendaHeader from "../components/AgendaHeader"; 
import AgendaList from "../components/AgendaList";
import AgendamentoModal from "../components/AgendamentoModal"; 
import "../style/Agenda.css";

export default function Agenda() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 1. Estado para forçar a atualização da lista
  const [refreshKey, setRefreshKey] = useState(0);

  // Função que muda o número da chave (forçando recarregamento)
  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="dashboard-layout"> 
      <Sidebar />
      <div className="main-content">
        <TheHeader />

        <main className="home-main">
          <AgendaHeader onNovoAgendamento={() => setIsModalOpen(true)} />
          <AgendaFilters />
          
          {/* 2. O segredo está aqui: key={refreshKey} 
             Sempre que 'refreshKey' mudar, o React apaga e recria essa lista,
             buscando os dados novos do banco.
          */}
          <AgendaList key={refreshKey} />
          
        </main>

        <AgendamentoModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          // 3. Passamos a função de sucesso para o modal
          onSuccess={handleSuccess}
        />
        
      </div>
    </div>
  );
}