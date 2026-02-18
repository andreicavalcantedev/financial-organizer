import {InputMoney} from '../InputMoney/InputMoney';
import {Button} from '../ui/button';
import {Input} from '../ui/input';
import {Checkbox} from '../ui/checkbox';
import {Label} from '../ui/label';
import {Textarea} from '../ui/textarea';
import type {TransactionFormData} from '@/hooks/useAddNewTransaction/types';
import {useAddNewTransaction} from '@/hooks/useAddNewTransaction/useAddNewTransaction';

interface AddNewTransactionProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (data: TransactionFormData) => void;
}

export const AddNewTransactionModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
}: AddNewTransactionProps) => {
  const isModalOpen = isOpen ? 'block' : 'hidden';

  const {
    formData,
    handleInputChange,
    handleSelectChange,
    resetForm,
    isFormValid,
    handleClose,
    makeAnotherTransaction,
    setMakeAnotherTransaction,
  } = useAddNewTransaction({setIsOpen});

  const handleConfirm = () => {
    if (!isFormValid) return;

    onSubmit(formData);

    if (makeAnotherTransaction) {
      resetForm();
      setMakeAnotherTransaction(false);
      return;
    }

    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${isModalOpen} `}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative rounded-lg bg-white p-6 shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Nova Transação</h2>

        <div className="space-y-4 mb-4 flex flex-col">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Transação *</Label>
            <select
              id="type"
              value={formData.type}
              onChange={e => handleSelectChange(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="income">Entrada de dinheiro</option>
              <option value="expense">Saída de dinheiro</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nome da Transação *</Label>
            <Input
              id="name"
              placeholder="Ex: Salário, Aluguel, Mercado"
              value={formData.name}
              onChange={handleInputChange('name')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Valor *</Label>
            <InputMoney
              value={formData.amount}
              onChange={handleInputChange('amount')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange('date')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Descrição adicional..."
              value={formData.description}
              onChange={handleInputChange('description')}
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="makeAnotherTransaction"
              checked={makeAnotherTransaction}
              onCheckedChange={checked =>
                setMakeAnotherTransaction(checked as boolean)
              }
            />
            <Label htmlFor="makeAnotherTransaction" className="cursor-pointer">
              Fazer mais uma transação
            </Label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="destructive" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            disabled={!isFormValid}
            variant="outline"
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};
