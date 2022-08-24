import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface CreateBtnProps {
  to: string;
  label: string;
  colorScheme?: string;
}

export const CreateBtn = ({ to, label, colorScheme = 'blue' }: CreateBtnProps) => {
  return (
    <Button as={Link} to={to} colorScheme={colorScheme}>
      <AddIcon marginEnd="3" />
      {label}
    </Button>
  );
};
