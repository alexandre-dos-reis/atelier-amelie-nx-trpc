import { trpc } from '../../utils/trpc';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Progress, useToast } from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';
import { updateOrCreateOneSchemaType } from '@atelier-amelie-nx-trpc/validation-schema';
import { ArtworkForm } from '../../components/artworks';
import { routes } from '../../utils/routes';

export const ArtworkEdit = () => {
  // Params from router
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const trpcContext = trpc.useContext();
  const navigate = useNavigate();

  // Trpc / React Query
  const { data, isLoading, isError, error } = trpc.useQuery(['artwork.getOne', id]);

  // Toast
  const toast = useToast();

  const updateMutation = trpc.useMutation('artwork.updateOne', {
    onSuccess: (data) => {
      trpcContext.queryClient.invalidateQueries('artwork.getAll');
      trpcContext.invalidateQueries(['artwork.getOne', data.artwork.id]);
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

  const deleteMutation = trpc.useMutation('artwork.deleteOne', {
    onSuccess: (data) => {
      navigate(routes['artworks'].url, { replace: true });
      trpcContext.invalidateQueries('artwork.getAll');
      toast({
        title: 'Suppression réussie !',
        description: `L'oeuvre ${data.artwork.id} - ${data.artwork.name} a été supprimée.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
    onError: (data, variables) => {
      toast({
        title: 'Erreur !',
        description: `L'oeuvre ${variables} n'a pas été supprimée. Raison : ${data.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
  });

  // React Query handlers...
  if (isError) return <div>{error.message}</div>;

  if (!isLoading && data) {
    return (
      <ArtworkForm
        textSubmitButton={'Mettre à jour'}
        onSubmit={(data) => updateMutation.mutate(data)}
        artwork={{
          ...data.artwork,
          categories: data.artwork.categories.map((c) => ({
            label: c.name,
            value: c.id,
          })),
        }}
      >
        <Button colorScheme="red" onClick={() => deleteMutation.mutate(id)}>
          Supprimer
        </Button>
      </ArtworkForm>
    );
  } else {
    return <Progress size="md" isIndeterminate />;
  }
};
