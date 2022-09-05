import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { trpc, findRoute } from 'utils';
import { product as schema } from '@atelier-amelie-nx-trpc/validation-schema';
import { ProductForm } from '../components';
import { ErrorToast, SuccessToast } from 'components/toasts';

export const ProductCreate = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const createMutation = trpc.useMutation('product.createOne', {
    onSuccess: async (data) => {
      SuccessToast({
        type: 'create',
        description: `Le produit ${data.product.id} - ${data.product.name} a été créée.`,
      });
      navigate(findRoute('shop.products'), { replace: true });
    },
    onError: (data, variables) => {
      ErrorToast({
        description: `Le produit ${variables.id} - ${variables.name} n'a pas été créée. Raison : ${data.message}`,
      });
    },
  });

  const onSubmit: SubmitHandler<schema.updateOrCreateOneSchemaType> = (data) => {
    createMutation.mutate(data);
  };

  const queryArtworkId = parseInt(params.get('artworkId') ?? '', 10) ?? 0;
  const queryArtworkName = params.get('artworkName') ?? '';

  return (
    <ProductForm
      textSubmitButton="Créer"
      isLoading={false}
      onSubmit={onSubmit}
      product={{
        id: 0,
        name: '',
        slug: '',
        description: '',
        forSale: false,
        price: 0,
        stock: 0,
        width: 0,
        height: 0,
        shopCategory: {
          label: '',
          value: 0,
        },
        artwork: {
          label: queryArtworkName,
          value: queryArtworkId,
        },
      }}
    />
  );
};
