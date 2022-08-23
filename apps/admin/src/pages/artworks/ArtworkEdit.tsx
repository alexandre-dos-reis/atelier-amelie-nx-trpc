import { trpc } from '../../utils/trpc';
import { useNavigate, useParams } from 'react-router-dom';
import { Progress, Text } from '@chakra-ui/react';
import { ArtworkForm } from '../../components/artworks';
import { findRoute } from '../../utils/find-route';
import { DeleteBtn } from '../../components/buttons';
import { ErrorToast, SuccessToast } from '../../components/toasts';

export const ArtworkEdit = () => {
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const trpcContext = trpc.useContext();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = trpc.useQuery(['artwork.getOne', id]);

  const updateMutation = trpc.useMutation('artwork.updateOne', {
    onSuccess: async (data) => {
      trpcContext.setQueryData(['artwork.getOne', data.artwork.id], {
        artwork: data.artwork,
      });
      await trpcContext.cancelQuery(['artwork.getAll']);
      const previousData = trpcContext.getQueryData(['artwork.getAll']);
      if (previousData) {
        trpcContext.setQueryData(['artwork.getAll'], {
          ...previousData,
          artworks: previousData.artworks.map((a) =>
            a.id === data.artwork.id
              ? {
                  ...a,
                  ...data.artwork,
                }
              : a
          ),
        });
      }

      trpcContext.invalidateQueries(['product.getAllArtworks']);

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

      trpcContext.invalidateQueries(['product.getAllArtworks']);

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
        artwork={{
          ...data.artwork,
          categories: data.artwork.categories.map((c) => ({
            label: c.name,
            value: c.id,
          })),
        }}
        isLoading={updateMutation.isLoading}
      >
        <DeleteBtn onConfirm={() => deleteMutation.mutate({ id })}>
          Etes-vous sûr de vouloir supprimer l'oeuvre <Text as="b">{data.artwork.name}</Text>?
        </DeleteBtn>
      </ArtworkForm>
    );
  } else {
    return <Progress size="md" isIndeterminate />;
  }
};
