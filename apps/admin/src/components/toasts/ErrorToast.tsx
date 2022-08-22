import { useToast } from '@chakra-ui/react';

interface ErrorToastProsp {
  description: string;
  title?: string;
}

export const ErrorToast = ({ title = 'Erreur !', description }: ErrorToastProsp) => {
  const toast = useToast();
  toast({
    title,
    description,
    status: 'error',
    duration: 10000,
    isClosable: true,
    position: 'top',
  });
};
