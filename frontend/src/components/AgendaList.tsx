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
    price: 100.00
  },
  {
    id: 2,
    clientName: 'Eduarda Pinheiro',
    service: 'Lavagem',
    specialist: 'Paula Viera',
    status: 'Agendada',
    date: '08/11/2025',
    time: '08:28:00',
    price: 100.00
  },
  {
    id: 3,
    clientName: 'Carla Pinheiro',
    service: 'Escova',
    specialist: 'Viena',
    status: 'Aguardando',
    date: '08/11/2025',
    time: '08:28:00',
    price: 100.00
  },
    {
    id: 4,
    clientName: 'Ana Flavia',
    service: 'Coloração',
    specialist: 'Rebecca Viana',
    status: 'Vencida',
    date: '08/11/2025',
    time: '08:28:00',
    price: 100.00
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