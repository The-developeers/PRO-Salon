import { memo } from 'react';
import '../style/Financeiro.css';

interface FinanceCardProps {
  title: string;
  value: number;
  type: 'receita' | 'despesa' | 'saldo' | 'pendente';
}

function FinanceCard({ title, value, type }: FinanceCardProps) {
  const formattedValue = `R$ ${value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  })}`;

  return (
    <div className={`finance-card summary-card summary-${type}`}>
      <span className='summary-title'>{title}</span>
      <strong className='summary-value'>{formattedValue}</strong>
    </div>
  );
}

export default memo(FinanceCard);
