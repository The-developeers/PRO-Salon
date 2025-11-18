import Sidebar from "../components/Sidebar"
import TheHeader from "../components/TheHeader"
import AgendaFilters from "../components/AgendaFilters"

import AgendaHeader from "../components/AgendaHeader" 
import AgendaList from "../components/AgendaList"

import "../style/Agenda.css"

export default function Agenda() {
  return (
    <div className="dashboard-layout"> 
      
      <Sidebar />

      
      <div className="main-content">
        
       
        <TheHeader />

        
        <main className="home-main">
          <AgendaHeader />
          <AgendaFilters />
          <AgendaList />
        </main>
      </div>
    </div>
  );
}