export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  name: string;
  amount: string;
  type: TransactionType;
  date: string;
  description?: string;
}

export interface TransactionFormData {
  name: string;
  amount: string;
  type: TransactionType;
  date: string;
  description?: string;
}
