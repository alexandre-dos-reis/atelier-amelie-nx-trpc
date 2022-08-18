import { artwork as schema } from '@atelier-amelie-nx-trpc/validation-schema';
import { useToast } from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArtworkForm } from '../../components/artworks';
import { findRoute } from '../../utils/find-route';
import { trpc } from '../../utils/trpc';

export const ArtworkCreate = () => {
  const trpcContext = trpc.useContext();
  const toast = useToast();
  const navigate = useNavigate();

  const mutation = trpc.useMutation('artwork.createOne', {
    onSuccess: async (data) => {
      await trpcContext.cancelQuery(['artwork.getAll']);
      const previousData = trpcContext.getQueryData(['artwork.getAll']);
      if (previousData) {
        trpcContext.setQueryData(['artwork.getAll'], {
          ...previousData,
          artworks: [data.artwork, ...previousData.artworks],
        });
      }
      toast({
        title: 'Création réussie !',
        description: `L'oeuvre ${data.artwork.id} - ${data.artwork.name} a été créée.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      navigate(findRoute('artworks'), { replace: true });
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

  const onSubmit: SubmitHandler<schema.updateOrCreateOneSchemaType> = (data) => mutation.mutate(data);

  return (
    <ArtworkForm
      textSubmitButton="Créer"
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
