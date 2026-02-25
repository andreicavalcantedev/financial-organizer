interface LatestTransactionsProps {
  title: string;
  transactionType: string;
  date?: string;
  amount: number;
}

export const LatestTransactions = ({
  title,
  transactionType,
  date,
  amount,
}: LatestTransactionsProps) => {
  const isIncome = transactionType === 'income';
  const transactionColor = isIncome ? 'text-emerald-600' : 'text-rose-600';
  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount / 100);

  const amountToDisplay = isIncome
    ? `+ ${formattedTotal}`
    : `- ${formattedTotal}`;

  return (
    <li className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-slate-500">{date}</p>
      </div>
      <span className={`font-medium ${transactionColor}`}>
        {amountToDisplay}
      </span>
    </li>
  );
};
