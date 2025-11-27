import type { FinanceTransaction } from '../types/financial';

type FinanceItemProps = FinanceTransaction;

export default function FinanceItem({
  type,
  category,
  description,
  professional,
  client,
  date,
  value,
  status,
  paymentMethod,
}: FinanceItemProps) {
  // Labels amigáveis
  const statusLabel = {
    pago: 'Pago',
    pendente: 'Pendente',
    cancelado: 'Cancelado',
  }[status];

  const categoryLabel: Record<FinanceTransaction['category'], string> = {
    servico: 'Serviço',
    produto: 'Produto',
    outros: 'Outros',
  };

  const paymentLabel: Record<FinanceTransaction['paymentMethod'], string> = {
    dinheiro: 'Dinheiro',
    cartao: 'Cartão',
    pix: 'PIX',
  };

  const isIncome = type === 'receita';

  const formattedDate = date ? new Date(date).toLocaleDateString('pt-BR') : '';

  return (
    <div className='finance-item'>
      {/* LEFT */}
      <div className='finance-item-left'>
        <div className={`finance-item-icon ${type}`} />

        <div>
          {/* Agora usa description, que é o campo correto do back */}
          <h3 className='finance-item-title'>{description}</h3>

          <span className='finance-item-category'>
            {categoryLabel[category]} • {professional || '—'}
          </span>

          {/* Mostra cliente (quando existir) */}
          {client && (
            <span className='finance-item-client'>Cliente: {client}</span>
          )}

          {/* Mostra forma de pagamento */}
          <span className='finance-item-payment'>
            Pagamento: {paymentLabel[paymentMethod]}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className='finance-item-right'>
        <span className='finance-item-date'>{formattedDate}</span>

        <span
          className={`finance-item-value ${isIncome ? 'income' : 'expense'}`}
        >
          {isIncome ? '+ ' : '- '}R$ {value.toFixed(2)}
        </span>

        <span className={`finance-status ${status}`}>{statusLabel}</span>

        <button className='finance-item-details'>Ver detalhes</button>
      </div>
    </div>
  );
}
