// src/components/AgendaList.tsx
import { useEffect, useState } from 'react';
import AppointmentCard from './AppointmentCard';
import { getAgendamentos, type Agendamento } from '../api/agenda'; 
import '../style/Agenda.css';

export default function AgendaList() {
  const [appointments, setAppointments] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      setLoading(true);
      const dados = await getAgendamentos();
      setAppointments(dados);
      setLoading(false);
    }
    carregarDados();
  }, []);

  if (loading) {
    return <div style={{padding: 20}}>Carregando agendamentos...</div>;
  }

  return (
    <div className="agenda-list">
      {appointments.length === 0 ? (
        <div style={{padding: 20, textAlign: 'center'}}>
           Nenhum agendamento encontrado ou erro na conexão.
        </div>
      ) : (
        appointments.map((appointment) => (
          <AppointmentCard 
            key={appointment.id} 
            appointmentData={appointment} 
          />
        ))
      )}
    </div>
  );
}