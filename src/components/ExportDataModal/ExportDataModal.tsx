import {memo} from 'react';
import {Button} from '../ui/button';

interface ExportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ExportDataModal = memo(function ExportDataModal({
  isOpen,
  onClose,
  onConfirm,
}: ExportDataModalProps) {
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
        aria-labelledby="export-data-title"
        aria-describedby="export-data-description"
      >
        <h2
          id="export-data-title"
          className="mb-4 text-xl font-semibold"
        >
          Exportar dados (transações)
        </h2>
        <p
          id="export-data-description"
          className="mb-6 text-slate-600"
        >
          Deseja exportar as transações já criadas? Um arquivo CSV será
          baixado no seu computador para que você possa importar ou guardar
          os dados no futuro.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
});
