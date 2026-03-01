import type {Transaction} from '@/hooks/useAddNewTransaction/types';
import {groupByMonth} from './groupByMonth';

export function groupByMonthCombined(transactions: Transaction[]) {
  const incomeData = groupByMonth(transactions, 'income');
  const expenseData = groupByMonth(transactions, 'expense');

  return incomeData.map((item, index) => ({
    month: item.month,
    income: item.value,
    expense: expenseData[index].value,
  }));
}
