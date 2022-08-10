import { Switch } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

interface SwitchCellProps {
  isChecked: boolean;
  onChangeCallback: (isChecked: boolean) => void;
}

export const SwitchCell = ({ isChecked, onChangeCallback }: SwitchCellProps) => {
  const [value, setValue] = useState(isChecked);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((v) => !v);
    onChangeCallback(e.target.checked);
  };

  return <Switch isChecked={value} onChange={handleOnChange} />;
};
