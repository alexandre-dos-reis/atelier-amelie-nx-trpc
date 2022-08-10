import { Switch } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';

interface SwitchCellProps {
  isChecked: boolean;
  onChangeCallback: (isChecked: boolean) => void;
}

export const SwitchCell = ({ isChecked, onChangeCallback }: SwitchCellProps) => {
  const [value, setValue] = useState(isChecked);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(!value);
    onChangeCallback(e.target.checked);
  };

  return <Switch isChecked={isChecked} onChange={handleOnChange} />;
};
