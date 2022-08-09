import { Switch } from '@chakra-ui/react';
import { ChangeEventHandler, useState } from 'react';

interface SwitchCellProps {
  isChecked: boolean;
  onChange?: ChangeEventHandler;
}

export const SwitchCell = ({ isChecked }: SwitchCellProps) => {
  const [value, setValue] = useState(isChecked);
  return <Switch isChecked={value} onChange={() => setValue(!value)} />;
};
