import {useMemo} from 'react';
import {parse, format} from 'date-fns';
import {InputMoney} from '../InputMoney/InputMoney';
import {Button} from '../ui/button';
import {Input} from '../ui/input';
import {Label} from '../ui/label';
import {Textarea} from '../ui/textarea';
import type {
  Transaction,
  TransactionFormData,
} from '@/hooks/useAddNewTransaction/types';
import {useEditTransaction} from '@/hooks/useEditTransaction/useEditTransaction';

interface EditTransactionModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  onConfirm: (id: string, data: TransactionFormData) => void;
}

function toInputDate(displayDate: string): string {
  const parsed = parse(displayDate, 'dd/MM/yyyy', new Date());
  return format(parsed, 'yyyy-MM-dd');
}

export const EditTransactionModal = ({
  transaction,
  onClose,
  onConfirm,
}: EditTransactionModalProps) => {
  const initialData = useMemo<TransactionFormData | null>(() => {
    if (!transaction) return null;
    return {
      name: transaction.name,
      amount: transaction.amount,
      type: transaction.type,
      date: toInputDate(transaction.date),
      description: transaction.description ?? '',
    };
  }, [transaction]);

  const {
    formData,
    handleInputChange,
    handleAmountChange,
    handleSelectChange,
    isFormValid,
  } = useEditTransaction(initialData);

  if (!transaction) return null;

  const handleConfirm = () => {
    if (!isFormValid) return;
    onConfirm(transaction.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" aria-hidden />
      <div
        className="relative rounded-lg bg-white p-6 shadow-lg max-w-md w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-transaction-title"
      >
        <h2 id="edit-transaction-title" className="text-xl font-semibold mb-4">
          Editar transação
        </h2>

        <div className="space-y-4 mb-4 flex flex-col">
          <div className="space-y-2">
            <Label htmlFor="edit-type">Tipo de Transação *</Label>
            <select
              id="edit-type"
              value={formData.type}
              onChange={e => handleSelectChange(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="income">Entrada de dinheiro</option>
              <option value="expense">Saída de dinheiro</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome da Transação *</Label>
            <Input
              id="edit-name"
              placeholder="Ex: Salário, Aluguel, Mercado"
              value={formData.name}
              onChange={handleInputChange('name')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-amount">Valor *</Label>
            <InputMoney
              value={formData.amount}
              onChange={handleAmountChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-date">Data *</Label>
            <Input
              id="edit-date"
              type="date"
              value={formData.date}
              onChange={handleInputChange('date')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Descrição (opcional)</Label>
            <Textarea
              id="edit-description"
              placeholder="Descrição adicional..."
              value={formData.description}
              onChange={handleInputChange('description')}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={!isFormValid} onClick={handleConfirm}>
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
};
