import {useMemo, useState} from 'react';
import type {TransactionFormData, TransactionType} from '../useAddNewTransaction/types';

const DEFAULT_FORM_DATA: TransactionFormData = {
  name: '',
  amount: 0,
  type: 'income',
  date: '',
  description: '',
};

export const useEditTransaction = (initialData: TransactionFormData | null) => {
  const [formData, setFormData] = useState<TransactionFormData>(
    initialData ?? DEFAULT_FORM_DATA,
  );

  const handleInputChange =
    (field: keyof TransactionFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({...prev, [field]: e.target.value}));
    };

  const handleAmountChange = (cents: number) => {
    setFormData(prev => ({...prev, amount: cents}));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({...prev, type: value as TransactionType}));
  };

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim().length > 0 &&
      formData.amount > 0 &&
      formData.date !== ''
    );
  }, [formData]);

  return {
    formData,
    handleInputChange,
    handleAmountChange,
    handleSelectChange,
    isFormValid,
  };
};
