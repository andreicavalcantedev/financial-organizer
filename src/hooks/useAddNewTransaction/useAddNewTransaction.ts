import {useMemo, useState} from 'react';
import type {TransactionFormData, TransactionType} from './types';

interface UseAddNewTransactionProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const useAddNewTransaction = ({
  setIsOpen,
}: UseAddNewTransactionProps) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    name: '',
    amount: '',
    type: 'income',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });
  const [makeAnotherTransaction, setMakeAnotherTransaction] =
    useState<boolean>(false);

  const resetForm = () => {
    setFormData({
      name: '',
      amount: '',
      type: 'income',
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
  };

  const handleInputChange =
    (field: keyof TransactionFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({...prev, [field]: e.target.value}));
    };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({...prev, type: value as TransactionType}));
  };

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim().length > 0 &&
      !isNaN(parseFloat(formData.amount)) &&
      parseFloat(formData.amount) > 0 &&
      formData.date !== ''
    );
  }, [formData]);

  const handleClose = () => {
    resetForm();
    setMakeAnotherTransaction(false);
    setIsOpen(false);
  };

  return {
    formData,
    handleInputChange,
    handleSelectChange,
    resetForm,
    isFormValid,
    handleClose,
    makeAnotherTransaction,
    setMakeAnotherTransaction,
  };
};
