import { CheckIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

interface SubmitBtnProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  label: string;
}

export const SubmitBtn = ({ isDisabled = false, isLoading = false, label }: SubmitBtnProps) => {
  return (
    <Button type="submit" colorScheme="green" isDisabled={isDisabled} isLoading={isLoading}>
      {label}
      <CheckIcon marginStart="3" />
    </Button>
  );
};
