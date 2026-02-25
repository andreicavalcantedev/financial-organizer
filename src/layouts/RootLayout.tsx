import {useState} from 'react';
import {Outlet, Link} from 'react-router-dom';
import {AddNewTransactionModal} from '../components/AddNewTransactionModal/AddNewTransactionModal';
import {Button} from '../components/ui/button';
import type {
  Transaction,
  TransactionFormData,
} from '../hooks/useAddNewTransaction/types';
import {format} from 'date-fns';

export interface RootLayoutContext {
  transactions: Transaction[];
}

export const RootLayout = () => {
  const [isAddNewTransactionModalOpened, setIsAddNewTransactionModalOpened] =
    useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddTransaction = (data: TransactionFormData) => {
    const transactionDate = new Date(data.date);
    const formattedDate = format(transactionDate, 'dd/MM/yyyy');

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      name: data.name,
      amount: data.amount,
      type: data.type,
      date: formattedDate,
      description: data.description,
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-semibold">
            Organizador Financeiro
          </Link>
          <Button onClick={() => setIsAddNewTransactionModalOpened(true)}>
            Nova transação
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <Outlet context={{transactions} satisfies RootLayoutContext} />
      </main>

      <AddNewTransactionModal
        isOpen={isAddNewTransactionModalOpened}
        setIsOpen={setIsAddNewTransactionModalOpened}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
};
