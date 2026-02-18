import {useState} from 'react';
import {AddNewTransactionModal} from './components/AddNewTransactionModal/AddNewTransactionModal';
import {Button} from './components/ui/button';
import type {
  Transaction,
  TransactionFormData,
} from './hooks/useAddNewTransaction/types';
import {format} from 'date-fns';
import {LatestTransactions} from './components/LatestTransactions/LatestTransactions';
import {AnyTransactionsWarning} from './components/AnyTransactionsWarning/AnyTransactionsWarning';

export const App = () => {
  const [isAddNewTransactionModalOpened, setIsAddNewTransactionModalOpened] =
    useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddTransaction = (data: TransactionFormData) => {
    const formattedAmount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseFloat(data.amount));

    const transactionDate = new Date(data.date);

    const formattedDate = format(transactionDate, 'dd/MM/yyyy');

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      name: data.name,
      amount:
        data.type === 'expense' ? `- ${formattedAmount}` : formattedAmount,
      type: data.type,
      date: formattedDate,
      description: data.description,
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  const hasTransactions = transactions.length > 0;

  console.log('teste');

  console.log(transactions, 'transactions');
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold">Organizador Financeiro</h1>
          <Button onClick={() => setIsAddNewTransactionModalOpened(true)}>
            Nova transação
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500 text-center">Saldo atual</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-600 text-center">
              R$ 2.450,00
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500 text-center">Receitas</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-600 text-center">
              R$ 3.200,00
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500 text-center">Despesas</p>
            <p className="mt-2 text-2xl font-semibold text-rose-600 text-center">
              R$ 750,00
            </p>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Últimas transações</h2>
            <button
              disabled={!hasTransactions}
              className={`text-sm font-medium text-emerald-700 hover:text-emerald-800 ${!hasTransactions && 'cursor-not-allowed opacity-50'}`}
            >
              Ver todas
            </button>
          </div>

          {hasTransactions ? (
            <ul className="mt-4 divide-y rounded-lg border bg-white">
              {transactions.map(transaction => (
                <LatestTransactions
                  key={transaction.id}
                  title={transaction.name}
                  transactionType={transaction.type}
                  date={transaction.date}
                  amount={transaction.amount}
                />
              ))}
            </ul>
          ) : (
            <AnyTransactionsWarning />
          )}
        </section>
      </main>

      <AddNewTransactionModal
        isOpen={isAddNewTransactionModalOpened}
        setIsOpen={setIsAddNewTransactionModalOpened}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
};

export default App;
