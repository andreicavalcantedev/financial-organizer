interface LatestTransactionsProps {
  title: string;
  transactionType: string;
  date?: string;
  amount: string;
}

export const LatestTransactions = ({
  title,
  transactionType,
  date,
  amount,
}: LatestTransactionsProps) => {
  const isIncome = transactionType === 'income';
  const transactionColor = isIncome ? 'text-emerald-600' : 'text-rose-600';

  return (
    <li className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-slate-500">{date}</p>
      </div>
      <span className={`font-medium ${transactionColor}`}>
        {isIncome ? `+ ${amount}` : `- ${amount}`}
      </span>
    </li>
  );
};
