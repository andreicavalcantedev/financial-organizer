import type {
  Transaction,
  TransactionType,
} from '@/hooks/useAddNewTransaction/types';
import {clsx, type ClassValue} from 'clsx';
import {getMonth, parse} from 'date-fns';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

export function groupByMonth(
  transactions: Transaction[],
  type: TransactionType,
) {
  const currentYear = new Date().getFullYear();

  const incomeByMonth = Array.from({length: 12}, (_, i) => ({
    month: MONTHS[i],
    value: 0,
  }));

  transactions
    .filter(t => t.type === type)
    .forEach(t => {
      const date = parse(t.date, 'dd/MM/yyyy', new Date());
      if (date.getFullYear() !== currentYear) return;
      const monthIndex = getMonth(date);
      incomeByMonth[monthIndex].value += t.amount / 100;
    });
  return incomeByMonth;
}
