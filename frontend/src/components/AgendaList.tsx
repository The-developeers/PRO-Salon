import AppointmentCard from './AppointmentCard'; 
import '../style/Agenda.css';


const mockAppointments = [
  {
    id: 1,
    clientName: 'Eduarda Pinheiro',
    service: 'Lavagem',
    specialist: 'Clara Viera',
    status: 'Realizada',
    date: '08/11/2025',
    time: '08:28:00',
    price: 100.00,
    avatarUrl: '/img/avatar-eduarda.png' // <-- ADICIONE ISSO
  },
  {
    id: 2,
    clientName: 'Paula Pinheiro',
    service: 'Lavagem',
    specialist: 'Paula Viera',
    status: 'Agendada',
    date: '08/11/2025',
    time: '08:28:00',
    price: 100.00,
    avatarUrl: '/img/avatar-paula.png' // <-- ADICIONE ISSO
  },
  {
    id: 3,
    clientName: 'Carla Pinheiro',
    service: 'Escova',
    specialist: 'Viena',
    status: 'Aguardando',
    date: '08/11/2025',
    time: '08:28:00',
    price: 100.00,
    avatarUrl: '/img/avatar-carla.png' // <-- ADICIONE ISSO
  },
    {
    id: 4,
    clientName: 'Ana Flavia',
    service: 'Coloração',
    specialist: 'Rebecca Viana',
    status: 'Vencida',
    date: '08/11/2025',
    time: '08:28:00',
    price: 100.00,
    avatarUrl: '/img/avatar-ana.png' // <-- ADICIONE ISSO
  }
];

export default function AgendaList() {
  return (
    <div className="agenda-list">
      {mockAppointments.map((appointment) => (
        <AppointmentCard 
          key={appointment.id} 
          appointmentData={appointment} 
        />
      ))}
    </div>
  );
}