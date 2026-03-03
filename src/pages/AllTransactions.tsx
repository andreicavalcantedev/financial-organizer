import {useCallback, useMemo, useState} from 'react';
import {Link, useOutletContext} from 'react-router-dom';
import {ChartLineMultiple} from '../components/Charts/ChartLineMultiple';
import {DeleteTransactionModal} from '../components/DeleteTransactionModal/DeleteTransactionModal';
import {EditTransactionModal} from '../components/EditTransactionModal/EditTransactionModal';
import {ExportDataModal} from '../components/ExportDataModal/ExportDataModal';
import {LatestTransactions} from '../components/LatestTransactions/LatestTransactions';
import type {Transaction} from '../hooks/useAddNewTransaction/types';
import type {RootLayoutContext} from '../layouts/RootLayout';
import {ArrowLeft} from 'lucide-react';
import MenuActions from '@/components/MenuActions/MenuActions';
import {ImportDataModal} from '@/components/ImportDataModal/ImportDataModal';

export const AllTransactions = () => {
  const {
    transactions,
    onDeleteTransaction,
    onEditTransaction,
    setTransactions,
  } = useOutletContext<RootLayoutContext>();
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);

  const handleDeleteClick = useCallback(
    (transactionId: string) => {
      const transaction = transactions.find(
        transaction => transaction.id === transactionId,
      );
      if (transaction) setTransactionToDelete(transaction);
    },
    [transactions],
  );

  const handleEditClick = useCallback(
    (transactionId: string) => {
      const transaction = transactions.find(
        transaction => transaction.id === transactionId,
      );
      if (transaction) setTransactionToEdit(transaction);
    },
    [transactions],
  );

  const handleCloseDeleteModal = useCallback(() => {
    setTransactionToDelete(null);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setTransactionToEdit(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (transactionToDelete) {
      onDeleteTransaction(transactionToDelete.id);
      setTransactionToDelete(null);
    }
  }, [transactionToDelete, onDeleteTransaction]);

  const handleCloseExportModal = useCallback(() => {
    setIsExportModalOpen(false);
  }, []);

  const handleCloseImportModal = useCallback(() => {
    setIsImportModalOpen(false);
  }, []);

  const handleImportTransactions = useCallback(
    (transactions: Transaction[]) => {
      setTransactions(prev => [...prev, ...transactions]);
    },
    [setTransactions],
  );

  const menuOptions = useMemo(
    () => [
      {label: 'Exportar dados', onClick: () => setIsExportModalOpen(true)},
      {label: 'Importar dados', onClick: () => setIsImportModalOpen(true)},
    ],
    [],
  );

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm text-emerald-700 hover:text-emerald-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <h2 className="text-lg font-semibold">Todas as transações</h2>
        </div>

        <MenuActions options={menuOptions} />
      </div>

      <div className="mt-4">
        <ChartLineMultiple transactions={transactions} />
      </div>

      <ul className="mt-4 divide-y rounded-lg border bg-white">
        {transactions.map(transaction => (
          <LatestTransactions
            key={transaction.id}
            title={transaction.name}
            transactionType={transaction.type}
            date={transaction.date}
            amount={transaction.amount}
            buttonActions={[
              {label: 'Editar', onClick: () => handleEditClick(transaction.id)},
              {
                label: 'Deletar',
                onClick: () => handleDeleteClick(transaction.id),
              },
            ]}
          />
        ))}
      </ul>

      <DeleteTransactionModal
        isOpen={transactionToDelete !== null}
        onClose={handleCloseDeleteModal}
        transactionName={transactionToDelete?.name ?? ''}
        onConfirm={handleConfirmDelete}
      />

      <EditTransactionModal
        key={transactionToEdit?.id}
        isOpen={transactionToEdit !== null}
        transaction={transactionToEdit}
        onClose={handleCloseEditModal}
        onConfirm={onEditTransaction}
      />

      <ExportDataModal
        isOpen={isExportModalOpen}
        transactions={transactions}
        onClose={handleCloseExportModal}
      />

      <ImportDataModal
        isOpen={isImportModalOpen}
        onClose={handleCloseImportModal}
        onImport={handleImportTransactions}
      />
    </section>
  );
};
