import { Switch } from '@chakra-ui/react';
import { memo, useCallback, useEffect, useState } from 'react';

interface SwitchCellProps {
  initialIsChecked: boolean;
  onChangeCallback: (isChecked: boolean) => void;
}

export const SwitchCell = ({ initialIsChecked, onChangeCallback }: SwitchCellProps) => {
  const [isChecked, setIsChecked] = useState(initialIsChecked);

  const memoedHandleOnChange = useCallback(() => {
    setIsChecked((prev) => {
      onChangeCallback(!prev);
      return !prev;
    });
  }, [])

  useEffect(() => {
    setIsChecked(initialIsChecked);
  }, [initialIsChecked]);

  return <Switch isChecked={isChecked} onChange={memoedHandleOnChange} />;
};

export const MemoedSwitchCell = memo(SwitchCell)
