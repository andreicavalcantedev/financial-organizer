import {Link, useOutletContext} from 'react-router-dom';
import {LatestTransactions} from '../components/LatestTransactions/LatestTransactions';
import {AnyTransactionsWarning} from '../components/AnyTransactionsWarning/AnyTransactionsWarning';
import type {RootLayoutContext} from '../layouts/RootLayout';
import {ArrowLeft} from 'lucide-react';

export const AllTransactions = () => {
  const {transactions} = useOutletContext<RootLayoutContext>();
  const hasTransactions = transactions.length > 0;

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
  );
};
