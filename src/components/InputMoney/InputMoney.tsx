import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';

interface InputMoneyProps {
  value: number;
  onChange: (cents: number) => void;
  placeholder?: string;
  max?: number;
}

export const InputMoney = ({
  value,
  onChange,
  placeholder = '0,00',
  max = 99999999,
}: InputMoneyProps) => {
  const displayValue =
    value === 0
      ? ''
      : (value / 100).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(/\D/g, '');
    const cents = parseInt(sanitizedValue || '0', 10);
    if (cents <= max) {
      onChange(cents);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && value > 0) {
      event.preventDefault();
      const newCents = Math.floor(value / 10);
      onChange(newCents);
    }
  };

  return (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>R$</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
};
