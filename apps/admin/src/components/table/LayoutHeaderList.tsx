import { Flex, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface LayoutHeaderListProps {
  headingText: string;
  children: ReactNode;
}

export const LayoutHeaderList = ({ headingText, children }: LayoutHeaderListProps) => {
  return (
    <Flex justifyContent="space-between" bg="white" zIndex="banner" p="4" pb='8'>
      <Heading as='h1' fontSize='3xl'>{headingText}</Heading>
      {children}
    </Flex>
  );
};
