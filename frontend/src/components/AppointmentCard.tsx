// src/components/AppointmentCard.tsx
import '../style/Agenda.css';

type AppointmentProps = {
  appointmentData: {
    clientName: string;
    service: string;
    specialist: string;
    status: string;
    date: string;
    time: string;
    price: number;
    avatarUrl?: string; // Agora é opcional com ?
  }
}

export default function AppointmentCard({ appointmentData }: AppointmentProps) {
  
  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'realizada': return 'status-realizada';
      case 'agendada': return 'status-agendada';
      case 'vencida': return 'status-vencida';
      default: return 'status-aguardando';
    }
  }

  return (
    <div className={`appointment-card ${getStatusClass(appointmentData.status)}`}> 
      
      {/* LADO ESQUERDO: Avatar + Infos */}
      <div className="card-info">
        <img 
          // Se não tiver avatar, usa um padrão (ajuste o caminho se precisar)
          src={appointmentData.avatarUrl || '/img/Logo.png'} 
          alt={appointmentData.clientName} 
          className="card-avatar"
        />

        {/* MUDANÇA IMPORTANTE PARA O CSS NOVO: */}
        <div className="card-client-details">
          <strong>{appointmentData.clientName}</strong>
          <p>{appointmentData.service} - {appointmentData.specialist}</p>
          
          {/* O Status agora fica aqui dentro para o CSS posicionar ele no topo */}
          <span className={`status-badge ${getStatusClass(appointmentData.status)}`}>
            {appointmentData.status}
          </span>
        </div>
      </div>

      {/* LADO DIREITO: Data, Preço e Botões */}
      <div className="card-details">
        <div className="card-datetime">
          <span className={appointmentData.status === 'Vencida' ? 'text-danger' : ''}>
            {appointmentData.date}
          </span>
          <span className={appointmentData.status === 'Vencida' ? 'text-danger' : ''}>
            {appointmentData.time}
          </span>
        </div>
        
        <strong className="card-price">
          R$ {Number(appointmentData.price).toFixed(2)}
        </strong>

        <div className="card-actions">
          <span>Ver detalhes</span>
          <span>X</span>
        </div>
      </div>
    </div>
  );
}