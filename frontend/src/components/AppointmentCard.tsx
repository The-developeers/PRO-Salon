// src/components/AppointmentCard.tsx

import '../style/Agenda.css';

// 1. O "Contrato" (TypeScript)
// Isso diz ao React: "Este componente SÓ PODE receber uma prop 
// chamada 'appointmentData', e ela DEVE ter este formato."
type AppointmentProps = {
  appointmentData: {
    clientName: string;
    service: string;
    specialist: string;
    status: string;
    date: string;
    time: string;
    price: number;
    avatarUrl: string; // <-- ADICIONE ESTA LINHA
  }
}

// 2. Recebendo as Props
// Usamos "desestruturação": em vez de receber (props),
// já pegamos { appointmentData } de dentro do objeto props.
export default function AppointmentCard({ appointmentData }: AppointmentProps) {
  
  // 3. Lógica (Estilo Condicional)
  // Esta função é o "cérebro" para mudar a cor do status.
  const getStatusClass = (status: string) => {
    // Pega o status, ex: "Realizada", e retorna um nome de classe CSS
    switch (status.toLowerCase()) {
      case 'realizada':
        return 'status-realizada';
      case 'agendada':
        return 'status-agendada';
      case 'vencida':
        return 'status-vencida';
      default:
        return 'status-aguardando'; // Para "Aguardando" ou outros
    }
  }

  return (
    // 4. Usando os Dados no JSX
    // Usamos {} para inserir os dados das props no HTML.
    <div className={`appointment-card ${getStatusClass(appointmentData.status)}`}> 
      {/* ^ Note aqui! A classe do card muda dinamicamente 
        baseado no status! 
      */}
      
      <div className="card-info">
       <img 
          src={appointmentData.avatarUrl} 
          alt={appointmentData.clientName} 
          className="card-avatar" // Adicionei uma classe para estilizar
        />

        <div>
          <strong>{appointmentData.clientName}</strong>
          <p>{appointmentData.service} - {appointmentData.specialist}</p>
        </div>
        
        <span className={`status-badge ${getStatusClass(appointmentData.status)}`}>
          {appointmentData.status}
        </span>
      </div>

      <div className="card-details">
        <div className="card-datetime">
          {/* Lógica condicional para o texto "Vencido" */}
          <span className={appointmentData.status === 'Vencida' ? 'text-danger' : ''}>
            {appointmentData.date}
          </span>
          <span className={appointmentData.status === 'Vencida' ? 'text-danger' : ''}>
            {appointmentData.time}
          </span>
        </div>
        
        <strong className="card-price">
          R$ {appointmentData.price.toFixed(2)}
        </strong>

        <div className="card-actions">
          <span>Ver detalhes</span>
          <span>X</span>
        </div>
      </div>
    </div>
  );
}