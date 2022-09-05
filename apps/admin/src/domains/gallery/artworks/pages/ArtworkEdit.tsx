import { useNavigate, useParams } from 'react-router-dom';
import { Progress, Text } from '@chakra-ui/react';
import { ArtworkForm } from '../components/ArtworkForm';
import { findRoute, trpc } from 'utils';
import { CreateBtn, DeleteBtn } from 'components/buttons';
import { ErrorToast, SuccessToast } from 'components/toasts';

export const ArtworkEdit = () => {
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = trpc.useQuery(['artwork.getOne', id]);

  const updateMutation = trpc.useMutation('artwork.updateOne', {
    onSuccess: async (data) => {
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
      SuccessToast({
        type: 'delete',
        description: `L'oeuvre ${data.artwork.id} - ${data.artwork.name} a été supprimée.`,
      });
      navigate(findRoute('shop.artworks'), { replace: true });
    },
    onError: (data, variables) => {
      ErrorToast({
        description: `L'oeuvre ${variables.id} n'a pas été supprimée. Raison : ${data.message}`,
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
          file: '',
          categories: data.artwork.categories.map((c) => ({
            label: c.name,
            value: c.id,
          })),
        }}
        isLoading={updateMutation.isLoading}
        bottomChildren={
          <CreateBtn
            label="Créer un produit à partir de cette oeuvre"
            to={
              findRoute('shop.products.create') +
              `?artworkId=${data.artwork.id}` +
              `&artworkName=${data.artwork.name}`
            }
          />
        }
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
