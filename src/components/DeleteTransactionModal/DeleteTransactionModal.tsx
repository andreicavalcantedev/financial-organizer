import {memo} from 'react';
import {Button} from '../ui/button';

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionName: string;
  onConfirm: () => void;
}

export const DeleteTransactionModal = memo(function DeleteTransactionModal({
  isOpen,
  onClose,
  transactionName,
  onConfirm,
}: DeleteTransactionModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" aria-hidden />
      <div
        className="relative max-w-md w-full rounded-lg bg-white p-6 shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-transaction-title"
        aria-describedby="delete-transaction-description"
      >
        <h2
          id="delete-transaction-title"
          className="mb-4 text-xl font-semibold"
        >
          Deletar transação
        </h2>
        <p
          id="delete-transaction-description"
          className="mb-6 text-slate-600"
        >
          A transação {transactionName} será removida. Deseja
          continuar?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Deletar
          </Button>
        </div>
      </div>
    </div>
  );
});
