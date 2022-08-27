import { Flex, Switch } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface SwitchCellProps {
  initialIsChecked: boolean;
  onChangeCallback: (isChecked: boolean) => void;
}

export const SwitchCell = ({ initialIsChecked, onChangeCallback }: SwitchCellProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeCallback(e.target.checked);
  };

  return <Switch defaultChecked={initialIsChecked} onChange={onChange} />;
};
