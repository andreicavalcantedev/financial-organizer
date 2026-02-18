import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';

interface InputMoneyProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const InputMoney = ({
  value,
  onChange,
  placeholder = '0.00',
}: InputMoneyProps) => {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>R$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          type="number"
          step="0.01"
          min="0"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>BRL</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
