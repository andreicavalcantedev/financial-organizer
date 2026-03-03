import {memo} from 'react';
import MenuActions from '../MenuActions/MenuActions';
import type {TransactionType} from '@/hooks/useAddNewTransaction/types';

interface LatestTransactionsProps {
  title: string;
  transactionType: TransactionType;
  date?: string;
  amount: number;
  buttonActions?: {label: string; onClick: () => void}[];
}

export const LatestTransactions = memo(function LatestTransactions({
  title,
  transactionType,
  date,
  amount,
  buttonActions,
}: LatestTransactionsProps) {
  const isIncome = transactionType === 'income';
  const amountColor = isIncome ? 'text-emerald-600' : 'text-rose-600';
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount / 100);

  const displayAmount = isIncome
    ? `+ ${formattedAmount}`
    : `- ${formattedAmount}`;

  return (
    <li className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-slate-500">{date}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-medium ${amountColor}`}>{displayAmount}</span>
        {buttonActions ? (
          <MenuActions key={`${title}-${date}`} options={buttonActions} />
        ) : null}
      </div>
    </li>
  );
});
