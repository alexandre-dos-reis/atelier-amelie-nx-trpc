import { Flex, Link } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link as L } from 'react-router-dom';

interface LinkCellProps {
  to: string;
  children: ReactNode;
  fontSize?: string;
  centered?: boolean;
}

export const LinkCell = ({
  to,
  children,
  fontSize = 'larger',
  centered = false,
}: LinkCellProps) => {
  return (
    <Link as={L} to={to} color={'gray.700'} fontSize={fontSize} fontWeight="semibold">
      <Flex align={centered ? 'center' : 'left'} justify={centered ? 'center' : 'left'}>
        {children}
      </Flex>
    </Link>
  );
};
