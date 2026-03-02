import type {
  Transaction,
  TransactionType,
} from '@/hooks/useAddNewTransaction/types';

export function parseCsvToTransactions(csvString: string): Transaction[] {
  const [_, ...dataLines] = csvString.trim().split('\n');

  return dataLines
    .filter(line => line.trim().length > 0)
    .map(line => {
      const [id, name, amount, type, date, description] = line.split(',');

      return {
        id,
        name,
        amount: Number(amount),
        type: type as TransactionType,
        date,
        description: description || undefined,
      };
    });
}
