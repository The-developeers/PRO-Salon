// src/components/FinanceModal.tsx
import { useState } from 'react';
import type { FinanceTransaction } from '../types/financial';

type FinanceModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: FinanceTransaction) => void;
};

// objeto inicial 100% compatível com FinanceTransaction
const emptyForm: FinanceTransaction = {
  id: undefined,
  type: 'receita',
  category: 'servico',
  description: '',
  professional: '',
  client: '',
  paymentMethod: 'pix',
  status: 'pago',
  value: 0,
  date: '',
};

export default function FinanceModal({
  open,
  onClose,
  onSave,
}: FinanceModalProps) {
  // deixa o TS inferir o tipo a partir de emptyForm
  const [form, setForm] = useState(emptyForm);

  if (!open) return null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'value' ? Number(value) : (value as string),
    }));
  }

  function handleSubmit() {
    if (!form.description || !form.value) {
      alert('Preencha a descrição e o valor!');
      return;
    }

    const payload: FinanceTransaction = {
      ...form,
      // se não escolher data, manda a de hoje
      date: form.date || new Date().toISOString().slice(0, 10),
    };

    onSave(payload);
    // não reseta aqui pra não perder o que foi digitado se der erro no back
  }

  function handleClose() {
    setForm(emptyForm);
    onClose();
  }

  return (
    <div className='finance-modal-overlay'>
      <div className='finance-modal'>
        <h2 className='modal-title'>Nova Transação</h2>

        <div className='modal-field'>
          <label>Tipo *</label>
          <select name='type' value={form.type} onChange={handleChange}>
            <option value='receita'>Receita</option>
            <option value='despesa'>Despesa</option>
          </select>
        </div>

        <div className='modal-field'>
          <label>Categoria *</label>
          <select name='category' value={form.category} onChange={handleChange}>
            <option value='servico'>Serviço</option>
            <option value='produto'>Produto</option>
            <option value='outros'>Outros</option>
          </select>
        </div>

        <div className='modal-field'>
          <label>Descrição *</label>
          <input
            type='text'
            name='description'
            value={form.description}
            onChange={handleChange}
            placeholder='Ex: Lavagem + Escova'
          />
        </div>

        <div className='modal-field'>
          <label>Profissional</label>
          <input
            type='text'
            name='professional'
            value={form.professional ?? ''}
            onChange={handleChange}
            placeholder='Ex: Ana Vieira'
          />
        </div>

        <div className='modal-row'>
          <div className='modal-field'>
            <label>Forma de pagamento *</label>
            <select
              name='paymentMethod'
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value='pix'>PIX</option>
              <option value='dinheiro'>Dinheiro</option>
              <option value='cartao'>Cartão</option>
            </select>
          </div>

          <div className='modal-field'>
            <label>Status</label>
            <select name='status' value={form.status} onChange={handleChange}>
              <option value='pago'>Pago</option>
              <option value='pendente'>Pendente</option>
              <option value='cancelado'>Cancelado</option>
            </select>
          </div>
        </div>

        <div className='modal-row'>
          <div className='modal-field'>
            <label>Valor *</label>
            <input
              type='number'
              name='value'
              value={form.value}
              onChange={handleChange}
            />
          </div>

          <div className='modal-field'>
            <label>Data</label>
            <input
              type='date'
              name='date'
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='modal-buttons'>
          <button className='modal-btn-cancel' onClick={handleClose}>
            Cancelar
          </button>
          <button className='modal-btn-save' onClick={handleSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
