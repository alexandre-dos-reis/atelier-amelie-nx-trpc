import { trpc } from '../../utils/trpc';
import { useNavigate, useParams } from 'react-router-dom';
import { Progress, useToast, Text } from '@chakra-ui/react';
import { ArtworkForm } from '../../components/artworks';
import { findRoute } from '../../utils/find-route';
import { DeleteBtn } from '../../components/buttons';
import { ErrorToast, SuccessToast } from '../../components/toasts';

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
      SuccessToast({
        type: 'update',
        description: `L'oeuvre ${data.artwork.id} - ${data.artwork.name} a été mise à jour.`,
      });
    },
    onError: (data, variables) => {
      ErrorToast({
        description: `L'oeuvre ${variables.id} - ${variables.name} n'a pas été mise à jour. Raison : ${data.message}`,
      });
    },
  });

  const deleteMutation = trpc.useMutation('artwork.deleteOne', {
    onSuccess: async (data) => {
      await trpcContext.cancelQuery(['artwork.getAll']);
      const previousData = trpcContext.getQueryData(['artwork.getAll']);
      if (previousData) {
        trpcContext.setQueryData(['artwork.getAll'], {
          ...previousData,
          artworks: previousData.artworks.filter((a) => a.id !== data.artwork.id),
        });
      }

      navigate(findRoute('artworks'), { replace: true });

      trpcContext.queryClient.removeQueries(['artwork.getOne', data.artwork.id], { exact: true });

      SuccessToast({
        type: 'delete',
        description: `L'oeuvre ${data.artwork.id} - ${data.artwork.name} a été supprimée.`,
      });
    },
    onError: (data, variables) => {
      ErrorToast({
        description: `L'oeuvre ${variables} n'a pas été supprimée. Raison : ${data.message}`,
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
        isLoading={updateMutation.isLoading}
      >
        <DeleteBtn onConfirm={() => deleteMutation.mutate(id)}>
          Etes-vous sûr de vouloir supprimer l'oeuvre <Text as="b">{data.name}</Text>?
        </DeleteBtn>
      </ArtworkForm>
    );
  } else {
    return <Progress size="md" isIndeterminate />;
  }
};
