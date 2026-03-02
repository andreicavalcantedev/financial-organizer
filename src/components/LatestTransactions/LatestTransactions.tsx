import {memo} from 'react';
import MenuActions from '../MenuActions/MenuActions';

interface LatestTransactionsProps {
  title: string;
  transactionType: string;
  date?: string;
  amount: number;
  transactionId: string;
  onDeleteClick?: (transactionId: string) => void;
  onEditClick?: (transactionId: string) => void;
}

export const LatestTransactions = memo(function LatestTransactions({
  title,
  transactionType,
  date,
  amount,
  transactionId,
  onDeleteClick,
  onEditClick,
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

  const handleDeleteTransaction = () => {
    onDeleteClick?.(transactionId);
  };

  const handleEditTransaction = () => {
    onEditClick?.(transactionId);
  };

  const menuOptions = [
    {label: 'Editar', onClick: handleEditTransaction},
    {label: 'Deletar', onClick: handleDeleteTransaction},
  ];

  return (
    <li className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-slate-500">{date}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-medium ${amountColor}`}>{displayAmount}</span>
        <MenuActions options={menuOptions} />
      </div>
    </li>
  );
});
