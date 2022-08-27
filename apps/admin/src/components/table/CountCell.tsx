import { Flex, Tag } from '@chakra-ui/react';

interface CountCellProps {
  value: number;
  redAtZero?: boolean;
}

export const CountCell = ({ value, redAtZero = false }: CountCellProps) => {
  return (
    <Tag
      bgColor={redAtZero && value === 0 ? 'red.500' : 'gray.500'}
      color="white"
      textAlign="center"
    >
      {value}
    </Tag>
  );
};
