import {useState} from 'react';
import {Link, useOutletContext} from 'react-router-dom';
import {ChartLineMultiple} from '../components/Charts/ChartLineMultiple';
import {DeleteTransactionModal} from '../components/DeleteTransactionModal/DeleteTransactionModal';
import {LatestTransactions} from '../components/LatestTransactions/LatestTransactions';
import type {Transaction} from '../hooks/useAddNewTransaction/types';
import type {RootLayoutContext} from '../layouts/RootLayout';
import {ArrowLeft} from 'lucide-react';

export const AllTransactions = () => {
  const {transactions, onDeleteTransaction} =
    useOutletContext<RootLayoutContext>();
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);

  const handleConfirmDelete = () => {
    if (transactionToDelete) {
      onDeleteTransaction(transactionToDelete.id);
      setTransactionToDelete(null);
    }
  };

  return (
    <section>
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

      <div className="mt-4">
        <ChartLineMultiple transactions={transactions} />
      </div>

      <ul className="mt-4 divide-y rounded-lg border bg-white">
        {transactions.map(transaction => (
          <LatestTransactions
            key={transaction.id}
            transactionId={transaction.id}
            title={transaction.name}
            transactionType={transaction.type}
            date={transaction.date}
            amount={transaction.amount}
            onDeleteClick={() => setTransactionToDelete(transaction)}
          />
        ))}
      </ul>

      <DeleteTransactionModal
        isOpen={transactionToDelete !== null}
        onClose={() => setTransactionToDelete(null)}
        transactionName={transactionToDelete?.name ?? ''}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
};
