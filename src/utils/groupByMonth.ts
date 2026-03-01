import type {
  Transaction,
  TransactionType,
} from '@/hooks/useAddNewTransaction/types';
import {MONTHS} from './constants';
import {parse} from 'date-fns';
import {getMonth} from 'date-fns';

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
