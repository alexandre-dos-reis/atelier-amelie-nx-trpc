import { createStandaloneToast } from '@chakra-ui/react';

interface ErrorToastProsp {
  description: string;
  title?: string;
}

const { ToastContainer, toast } = createStandaloneToast();

export const ErrorToast = ({ title = 'Erreur !', description }: ErrorToastProsp) => {
  toast({
    title,
    description,
    status: 'error',
    duration: 5000,
    isClosable: true,
    position: 'top',
  });
  return <ToastContainer />;
};
