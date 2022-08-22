import { useToast, Text, Progress } from '@chakra-ui/react';
import { DeleteBtn } from '../../../components/buttons';
import { ProductForm } from '../../../components/products';
import { useNavigate, useParams } from 'react-router-dom';
import { trpc } from '../../../utils/trpc';
import { findRoute } from '../../../utils/find-route';
import { ErrorToast, SuccessToast } from '../../../components/toasts';

export const ProductEdit = () => {
  // Params from router
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const trpcContext = trpc.useContext();
  const navigate = useNavigate();
  const toast = useToast();

  // Trpc / React Query
  const { data, isLoading, isError, error } = trpc.useQuery(['product.getOne', { id }]);

  const updateMutation = trpc.useMutation(['product.updateOne'], {
    onSuccess: async (data) => {
      trpcContext.setQueryData(['product.getOne', { id: data.product.id }], {
        product: data.product,
      });

      await trpcContext.cancelQuery(['product.getAll']);

      const previousData = trpcContext.getQueryData(['product.getAll']);
      if (previousData) {
        trpcContext.setQueryData(['product.getAll'], {
          products: previousData.products.map((p) =>
            p.id === data.product.id
              ? {
                  ...p,
                  ...data.product,
                }
              : p
          ),
        });
      }

      SuccessToast({
        type: 'update',
        description: `Le produit ${data.product.id} - ${data.product.name} a été mise à jour.`,
      });
    },
    onError: (data, variables) => {
      ErrorToast({
        description: `Le produit ${variables.id} - ${variables.name} n'a pas été mise à jour. Raison : ${data.message}`,
      });
    },
  });

  const deleteMutation = trpc.useMutation(['product.deleteOne'], {
    onSuccess: async (data) => {
      await trpcContext.cancelQuery(['product.getAll']);

      const previousData = trpcContext.getQueryData(['product.getAll']);
      if (previousData) {
        trpcContext.setQueryData(['product.getAll'], {
          products: previousData.products.filter((p) => p.id !== data.product.id),
        });
      }

      SuccessToast({
        type: 'delete',
        description: `Le produit ${data.product.id} - ${data.product.name} a été supprimé.`,
      });

      navigate(findRoute('shop.products'), { replace: true });
    },

    onError: (data) => {
      ErrorToast({
        description: `Le produit n'a pas été supprimé. Raison: ${data.message}`,
      });
    },
  });

  // React Query handlers...
  if (isError) return <div>{error.message}</div>;

  if (!isLoading && data) {
    return (
      <ProductForm
        textSubmitButton="Mettre à jour"
        isLoading={updateMutation.isLoading}
        onSubmit={(data) => updateMutation.mutate(data)}
        product={{
          ...data.product,
          shopCategory: {
            value: data.product.shopCategory.id,
            label:
              data.product.shopCategory.parentCategory?.name +
              ' | ' +
              data.product.shopCategory.name,
          },
          artwork: {
            label: data.product.artwork.name,
            value: data.product.artwork.id,
          },
        }}
      >
        <DeleteBtn onConfirm={() => deleteMutation.mutate({ id })}>
          Etes-vous sûr de vouloir supprimer le produit <Text as="b">{data.product.name}</Text>?
        </DeleteBtn>
      </ProductForm>
    );
  } else {
    return <Progress size="md" isIndeterminate />;
  }
};
