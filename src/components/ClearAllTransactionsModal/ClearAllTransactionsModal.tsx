import {memo} from 'react';
import {Button} from '../ui/button';
import {ModalContainer} from '../ModalContainer/ModalContainer';

interface ClearAllTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearAllTransactionsModal = memo(
  function ClearAllTransactionsModal({
    isOpen,
    onClose,
    onConfirm,
  }: ClearAllTransactionsModalProps) {
    const handleConfirm = () => {
      onConfirm();
      onClose();
    };

    return (
      <ModalContainer isOpen={isOpen}>
        <div
          className="relative max-w-md w-full rounded-lg bg-white p-6 shadow-lg"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-transactions-title"
          aria-describedby="clear-transactions-description"
        >
          <h2
            id="clear-transactions-title"
            className="mb-4 text-xl font-semibold"
          >
            Limpar transações
          </h2>
          <p
            id="clear-transactions-description"
            className="mb-6 text-slate-600"
          >
            Deseja limpar todas as transações existentes? Esta ação é
            irreversível e não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              Limpar todas
            </Button>
          </div>
        </div>
      </ModalContainer>
    );
  },
);
