import { CheckIcon } from '@chakra-ui/icons';
import { Button, Spinner } from '@chakra-ui/react';

interface SubmitBtnProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  label: string;
}

export const SubmitBtn = ({ isDisabled = false, isLoading = false, label }: SubmitBtnProps) => {
  return (
    <Button
      type="submit"
      colorScheme="green"
      isDisabled={isDisabled || isLoading}
    >
      {label}
      {!isLoading && <CheckIcon marginStart="3" />}
      {isLoading && <Spinner marginStart="3" />}
    </Button>
  );
};
