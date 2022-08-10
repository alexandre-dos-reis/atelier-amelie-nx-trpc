import { trpc } from '../../utils/trpc';
import { useParams } from 'react-router-dom';
import { Button, Progress, useToast } from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';
import { updateOrCreateOneSchemaType } from '@atelier-amelie-nx-trpc/validation-schema';
import { ArtworkForm } from '../../components/artworks';

export const ArtworkEdit = () => {
  // Params from router
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const trpcContext = trpc.useContext();

  // Trpc / React Query
  const { data, isLoading, isError, error } = trpc.useQuery(['artwork.getOne', id]);

  // Toast
  const toast = useToast();

  const mutation = trpc.useMutation('artwork.updateOne', {
    onSuccess: (data) => {
      trpcContext.invalidateQueries(['artwork.getOne', id]);
      trpcContext.invalidateQueries(['artwork.getAll']);
      toast({
        title: 'Mise à jour réussie !',
        description: `L'oeuvre ${data.artwork.id} - ${data.artwork.name} a été mise à jour.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
    onError: (data, variables) => {
      toast({
        title: 'Erreur !',
        description: `L'oeuvre ${variables.id} - ${variables.name} n'a pas été mise à jour. Raison : ${data.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
  });

  const onSubmit: SubmitHandler<updateOrCreateOneSchemaType> = (data) => mutation.mutate(data);

  // React Query handlers...
  if (isError) return <div>{error.message}</div>;

  if (!isLoading && data) {
    return (
      <ArtworkForm
        textSubmitButton={'Mettre à jour'}
        onSubmit={onSubmit}
        artwork={{
          ...data.artwork,
          categories: data.artwork.categories.map((c) => ({
            label: c.name,
            value: c.id,
          })),
        }}
      >
        <Button colorScheme="red">Supprimer</Button>
      </ArtworkForm>
    );
  } else {
    return <Progress size="md" isIndeterminate />;
  }
};
