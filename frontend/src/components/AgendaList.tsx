// src/components/AgendaList.tsx
import  { useEffect, useState } from 'react';
import AppointmentCard from './AppointmentCard';
import  { getAgendamentos, deleteAgendamento, updateStatusAgendamento } from '../api/agenda'; 
import type { Agendamento } from '../api/agenda';
import '../style/Agenda.css';

export default function AgendaList() {
  const [appointments, setAppointments] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); // Para forçar recarregamento

  // Função para recarregar a lista
  const refreshList = () => setRefreshKey(prev => prev + 1);

  useEffect(() => {
    async function carregarDados() {
      setLoading(true);
      const dados = await getAgendamentos();
      setAppointments(dados);
      setLoading(false);
    }
    carregarDados();
  }, [refreshKey]);

  // --- AÇÃO DE DELETAR ---
  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este agendamento?")) {
      try {
        await deleteAgendamento(id);
        refreshList(); // Recarrega a lista após excluir
      } catch (error) {
        alert("Erro ao excluir.");
      }
    }
  };

  // --- AÇÃO DE MUDAR STATUS ---
  const handleStatusChange = async (id: string, novoStatus: string) => {
    try {
      await updateStatusAgendamento(id, novoStatus);
      refreshList(); // Recarrega a lista para atualizar a cor
    } catch (error) {
      alert("Erro ao atualizar status.");
    }
  };

  if (loading) return <div style={{padding: 20}}>Carregando...</div>;

  return (
    <div className="agenda-list">
      {appointments.length === 0 ? (
        <div style={{padding: 20, textAlign: 'center'}}>Nenhum agendamento encontrado.</div>
      ) : (
        appointments.map((appointment) => (
          <AppointmentCard 
            key={appointment._id} 
            appointmentData={appointment}
            // Passamos as funções para o Card
            onDelete={() => handleDelete(appointment._id)}
            onStatusChange={(novoStatus: string) => handleStatusChange(appointment._id, novoStatus)}
          />
        ))
      )}
    </div>
  );
}