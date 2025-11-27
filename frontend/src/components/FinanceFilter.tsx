import { useState, useEffect } from 'react';
import type { FinanceQueryFilters } from '../types/financial';

export default function FinanceFilter({
  onFilterChange,
}: {
  onFilterChange: (f: FinanceQueryFilters) => void;
}) {
  const [filters, setFilters] = useState<FinanceQueryFilters>({});

  function handleChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    setFilters((prev) => ({ ...prev, [target.name]: target.value }));
  }

  function resetFilters() {
    setFilters({});
  }

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  return (
    <div className='finance-filter-wrapper'>
      <div className='finance-filter-container'>
        {/* Tipo */}
        <div className='finance-filter-field'>
          <span className='finance-filter-label'>Tipo</span>
          <select
            name='type'
            value={filters.type || ''}
            onChange={handleChange}
            className='finance-filter-select'
          >
            <option value=''>Todos</option>
            <option value='receita'>Receita</option>
            <option value='despesa'>Despesa</option>
          </select>
        </div>

        {/* Categoria */}
        <div className='finance-filter-field'>
          <span className='finance-filter-label'>Categoria</span>
          <select
            name='category'
            value={filters.category || ''}
            onChange={handleChange}
            className='finance-filter-select'
          >
            <option value=''>Todos</option>
            <option value='servico'>Serviço</option>
            <option value='produto'>Produto</option>
            <option value='outros'>Outros</option>
          </select>
        </div>

        {/* Status */}
        <div className='finance-filter-field'>
          <span className='finance-filter-label'>Status</span>
          <select
            name='status'
            value={filters.status || ''}
            onChange={handleChange}
            className='finance-filter-select'
          >
            <option value=''>Todos</option>
            <option value='pago'>Pago</option>
            <option value='pendente'>Pendente</option>
            <option value='cancelado'>Cancelado</option>
          </select>
        </div>

        {/* Mês */}
        <div className='finance-filter-field'>
          <span className='finance-filter-label'>Mês</span>
          <input
            type='month'
            name='month'
            value={filters.month || ''}
            onChange={handleChange}
            className='finance-filter-input'
          />
        </div>

        <button className='finance-filter-clear' onClick={resetFilters}>
          Limpar Filtros
        </button>
      </div>
    </div>
  );
}
