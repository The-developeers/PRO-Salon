type FinanceSummaryProps = {
  receita: number;
  despesa: number;
  saldo: number;
  pendente: number;
};

export default function FinanceSummary({
  receita,
  despesa,
  saldo,
  pendente,
}: FinanceSummaryProps) {
  return (
    <div className='finance-summary-container'>
      {/* RECEITAS */}
      <div className='summary-card'>
        <span className='summary-title'>Receitas</span>
        <span className='summary-value summary-receita'>
          R$ {receita.toFixed(2)}
        </span>
      </div>

      {/* DESPESAS */}
      <div className='summary-card'>
        <span className='summary-title'>Despesas</span>
        <span className='summary-value summary-despesa'>
          - R$ {despesa.toFixed(2)}
        </span>
      </div>

      {/* SALDO */}
      <div className='summary-card'>
        <span className='summary-title'>Saldo Atual</span>
        <span className='summary-value summary-saldo'>
          R$ {saldo.toFixed(2)}
        </span>
      </div>

      {/* PENDENTES */}
      <div className='summary-card'>
        <span className='summary-title'>Pendentes</span>
        <span className='summary-value summary-pendente'>
          R$ {pendente.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
