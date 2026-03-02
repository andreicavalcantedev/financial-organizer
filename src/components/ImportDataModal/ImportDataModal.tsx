import {useEffect, useState} from 'react';
import {Button} from '../ui/button';
import {Input} from '../ui/input';
import {parseCsvToTransactions} from '@/utils/parseCsvToTransactions';
import type {Transaction} from '@/hooks/useAddNewTransaction/types';
import {Loader2} from 'lucide-react';
import {ModalContainer} from '../ModalContainer/ModalContainer';

interface ImportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (transactions: Transaction[]) => void;
}

export const ImportDataModal = ({
  isOpen,
  onClose,
  onImport,
}: ImportDataModalProps) => {
  const [newTransactions, setNewTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImport = (file: File) => {
    if (!file) return;

    setIsLoading(true);

    const reader = new FileReader();

    reader.onload = e => {
      try {
        const csv = e.target?.result as string;
        const importedTransactions = parseCsvToTransactions(csv);
        setNewTransactions(importedTransactions);
      } catch (error) {
        console.error('Erro ao processar CSV:', error);
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      console.error('Erro ao ler arquivo:', reader.error);
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const handleConfirm = () => {
    onImport(newTransactions);
    setNewTransactions([]);
    onClose();
  };

  const hasNewTransactions = newTransactions.length > 0;

  useEffect(() => {
    if (!isOpen) {
      setNewTransactions([]);
      setIsLoading(false);
    }
  }, [isOpen]);

  return (
    <ModalContainer isOpen={isOpen}>
      <div className="relative max-w-md w-full rounded-lg bg-white p-6 shadow-lg">
        <h2 id="import-data-title" className="mb-4 text-xl font-semibold">
          Importar dados (transações)
        </h2>
        <p id="import-data-description" className="mb-6 text-slate-600">
          Deseja importar as transações já criadas? Selecione um arquivo CSV
          para importar as transações.
        </p>
        <Input
          type="file"
          accept=".csv"
          id="import-data-file"
          className="mb-4"
          onChange={e => handleImport(e.target.files?.[0] as File)}
        />
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={!hasNewTransactions} onClick={handleConfirm}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Importar'
            )}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};
