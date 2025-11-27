import FinanceItem from './FinanceItem';
import type { FinanceTransaction } from '../types/financial';

export default function FinanceList({
  data,
  loading,
}: {
  data: FinanceTransaction[];
  loading: boolean;
}) {
  if (loading) {
    return <p style={{ textAlign: 'center' }}>Carregando...</p>;
  }

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '14px',
          boxShadow: '0 3px 8px rgba(0,0,0,0.07)',
          textAlign: 'center',
          color: '#555',
        }}
      >
        Nenhuma transação encontrada.
      </div>
    );
  }

  return (
    <div className='finance-list-container'>
      {data.map((item) => (
        <FinanceItem key={item.id} {...item} />
      ))}
    </div>
  );
}
