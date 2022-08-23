import { artwork as schema } from '@atelier-amelie-nx-trpc/validation-schema';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArtworkForm } from '../../components/artworks';
import { ErrorToast, SuccessToast } from '../../components/toasts';
import { findRoute } from '../../utils/find-route';
import { trpc } from '../../utils/trpc';

export const ArtworkCreate = () => {
  const trpcContext = trpc.useContext();
  const navigate = useNavigate();

  const createMutation = trpc.useMutation('artwork.createOne', {
    onSuccess: async (data) => {
      await trpcContext.cancelQuery(['artwork.getAll']);
      trpcContext.invalidateQueries(['product.getAllArtworks']);
      const previousData = trpcContext.getQueryData(['artwork.getAll']);
      if (previousData) {
        trpcContext.setQueryData(['artwork.getAll'], {
          ...previousData,
          artworks: [data.artwork, ...previousData.artworks],
        });
      }

      SuccessToast({
        type: 'create',
        description: `L'oeuvre ${data.artwork.id} - ${data.artwork.name} a été créée.`,
      });
      navigate(findRoute('artworks'), { replace: true });
    },
    onError: (data, variables) => {
      ErrorToast({
        description: `L'oeuvre ${variables.id} - ${variables.name} n'a pas été créée. Raison : ${data.message}`,
      });
    },
  });

  const onSubmit: SubmitHandler<schema.updateOrCreateOneSchemaType> = (data) => {
    createMutation.mutate(data);
  };

  return (
    <ArtworkForm
      textSubmitButton="Créer"
      isLoading={createMutation.isLoading}
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
