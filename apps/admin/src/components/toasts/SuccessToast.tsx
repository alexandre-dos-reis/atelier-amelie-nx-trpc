import { createStandaloneToast } from '@chakra-ui/react';

type CommonProp = {
  description: string;
};

type ConditionnalProps =
  | { type: 'update' | 'create' | 'delete'; title?: never }
  | { type?: never; title: string };

type SuccessToastProsp = CommonProp & ConditionnalProps;

const typeTitle = {
  update: () => 'Création réussie !',
  create: () => 'Mise à jour réussie !',
  delete: () => 'Suppression réussie !',
};

const { ToastContainer, toast } = createStandaloneToast();

export const SuccessToast = ({ title, description, type }: SuccessToastProsp) => {
  toast({
    title: type ? typeTitle[type as keyof typeof typeTitle]() : title,
    description,
    status: 'success',
    duration: 5000,
    isClosable: true,
    position: 'top',
  });
  return <ToastContainer />;
};
