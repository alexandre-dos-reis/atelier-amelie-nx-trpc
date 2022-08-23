import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../../../utils/trpc';
import { product as schema } from '@atelier-amelie-nx-trpc/validation-schema';
import { findRoute } from '../../../utils/find-route';
import { ProductForm } from '../../../components/products';
import { ErrorToast, SuccessToast } from '../../..//components/toasts';

export const ProductCreate = () => {
  const trpcContext = trpc.useContext();
  const navigate = useNavigate();

  const createMutation = trpc.useMutation('product.createOne', {
    onSuccess: async (data) => {
      await trpcContext.cancelQuery(['product.getAll']);
      trpcContext.invalidateQueries(['artwork.getAll'])
      const previousData = trpcContext.getQueryData(['product.getAll']);
      if (previousData) {
        trpcContext.setQueryData(['product.getAll'], {
          ...previousData,
          products: [data.product, ...previousData.products],
        });
      }

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

  const onSubmit: SubmitHandler<schema.updateOrCreateOneSchemaType> = (data) => createMutation.mutate(data);

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
        width: null,
        height: null,
        shopCategory: {
          label: '',
          value: 0,
        },
        artwork: {
          label: '',
          value: 0,
        },
      }}
    />
  );
};
