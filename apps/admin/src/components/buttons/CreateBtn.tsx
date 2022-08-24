import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface CreateBtnProps {
  to: string;
  label: string;
}

export const CreateBtn = ({ to, label }: CreateBtnProps) => {
  return (
    <Button as={Link} to={to}  colorScheme="blue">
      <AddIcon marginEnd="3" />
      {label}
    </Button>
  );
};
