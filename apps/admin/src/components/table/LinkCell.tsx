import { Link } from '@chakra-ui/react';
import { Link as L } from 'react-router-dom';

interface LinkCellProps {
  to: string;
  label: string;
}

export const LinkCell = ({ to, label }: LinkCellProps) => {
  return (
    <Link as={L} to={to} color={'gray.700'} fontSize="larger" fontWeight="semibold">
      {label}
    </Link>
  );
};
