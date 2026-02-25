import {Link, useOutletContext} from 'react-router-dom';
import {ChartPieLabel} from '../components/Charts/ChartPieLabel';
import {ChartBarHorizontal} from '../components/Charts/ChartBarHorizontal';
import {LatestTransactions} from '../components/LatestTransactions/LatestTransactions';
import {AnyTransactionsWarning} from '../components/AnyTransactionsWarning/AnyTransactionsWarning';
import type {RootLayoutContext} from '../layouts/RootLayout';

const LATEST_TRANSACTIONS_LIMIT = 5;

export const Home = () => {
  const {transactions} = useOutletContext<RootLayoutContext>();
  const hasTransactions = transactions.length > 0;

  return (
    <>
      <section className="grid gap-4 md:grid-cols-3">
        <ChartPieLabel title="Saldo Atual" transactions={transactions} />
        <ChartBarHorizontal type="income" transactions={transactions} />
        <ChartBarHorizontal type="expense" transactions={transactions} />
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Últimas transações</h2>
          {hasTransactions ? (
            <Link
              to="/transactions"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              Ver todas
            </Link>
          ) : (
            <span className="cursor-not-allowed text-sm font-medium text-emerald-700 opacity-50">
              Ver todas
            </span>
          )}
        </div>

        {hasTransactions ? (
          <ul className="mt-4 divide-y rounded-lg border bg-white">
            {transactions
              .slice(0, LATEST_TRANSACTIONS_LIMIT)
              .map(transaction => (
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
    </>
  );
};
