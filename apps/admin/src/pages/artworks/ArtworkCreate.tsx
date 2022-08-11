import { updateOrCreateOneSchemaType } from '@atelier-amelie-nx-trpc/validation-schema';
import { Progress, useToast } from '@chakra-ui/react';
import { Artwork } from '@prisma/client';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArtworkForm } from '../../components/artworks';
import { routes } from '../../utils/routes';
import { trpc } from '../../utils/trpc';

export const ArtworkCreate = () => {
  const trpcContext = trpc.useContext();
  const toast = useToast();
  const navigate = useNavigate();

  const mutation = trpc.useMutation('artwork.createOne', {
    onSuccess: (data) => {
      trpcContext.invalidateQueries('artwork.getAll');
      navigate(routes['artworks'].url, { replace: true });
      toast({
        title: 'Création réussie !',
        description: `L'oeuvre ${data.artwork.id} - ${data.artwork.name} a été créée.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
    onError: (data, variables) => {
      toast({
        title: 'Erreur !',
        description: `L'oeuvre ${variables.id} - ${variables.name} n'a pas été créée. Raison : ${data.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
  });

  const onSubmit: SubmitHandler<updateOrCreateOneSchemaType> = (data) => mutation.mutate(data);

  return (
    <ArtworkForm
      textSubmitButton={'Créer'}
      onSubmit={onSubmit}
      artwork={{
        name: '',
        slug: '',
        description: '',
        showInGallery: false,
        showInPortfolio: false,
        madeAt: null,
        id: 0,
        categories: [],
      }}
    />
  );
};
