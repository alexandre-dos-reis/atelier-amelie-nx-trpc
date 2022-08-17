import { trpc } from '../../utils/trpc';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Progress, useToast } from '@chakra-ui/react';
import { ArtworkForm } from '../../components/artworks';
import { routes } from '../../utils/routes';
import { DeleteIcon } from '@chakra-ui/icons';
import { DeleteBtn } from '../../components/buttons';

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
    onMutate: async (variables) => {
      trpcContext.setQueryData(['artwork.getOne', variables.id], {
        ...variables,
        madeAt: variables.madeAt || null,
      });

      await trpcContext.cancelQuery(['artwork.getAll']);
      const previousData = trpcContext.getQueryData(['artwork.getAll']);
      if (previousData) {
        trpcContext.setQueryData(['artwork.getAll'], {
          ...previousData,
          artworks: previousData.artworks.map((a) =>
            a.id === variables.id
              ? {
                  ...a,
                  ...variables,
                }
              : a
          ),
        });
      }

      return { previousData };
    },
    onSuccess: (data) => {
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
    onMutate: async (variables) => {
      await trpcContext.cancelQuery(['artwork.getAll']);
      const previousData = trpcContext.getQueryData(['artwork.getAll']);
      if (previousData) {
        trpcContext.setQueryData(['artwork.getAll'], {
          ...previousData,
          artworks: previousData.artworks.filter((a) => a.id !== variables),
        });
      }

      return { previousData };
    },
    onSuccess: (data) => {
      navigate(routes['artworks'].url, { replace: true });
      trpcContext.queryClient.removeQueries(['artwork.getOne', data.artwork.id], { exact: true });
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
        textSubmitButton="Mettre à jour"
        onSubmit={(data) => updateMutation.mutate(data)}
        artwork={data}
      >
        {/* <Button colorScheme="red" onClick={() => deleteMutation.mutate(id)}>
          Supprimer
          <DeleteIcon marginStart="3" />
        </Button> */}
        <DeleteBtn onConfirm={() => console.log('ok')}/>
      </ArtworkForm>
    );
  } else {
    return <Progress size="md" isIndeterminate />;
  }
};
