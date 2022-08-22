import { useToast, Text, Progress } from '@chakra-ui/react';
import { DeleteBtn } from '../../../components/buttons';
import { ProductForm } from '../../../components/products';
import { useNavigate, useParams } from 'react-router-dom';
import { trpc } from '../../../utils/trpc';
import { useQueryClient } from 'react-query';

export const ProductEdit = () => {
  // Params from router
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const trpcContext = trpc.useContext();
  const navigate = useNavigate();

  // Trpc / React Query
  const { data, isLoading, isError, error } = trpc.useQuery(['product.getOne', { id }]);

  const mutation = trpc.useMutation(['product.updateOne'], {
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

      toast({
        title: 'Mise à jour réussie !',
        description: `Le produit ${data.product.id} - ${data.product.name} a été mise à jour.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
    onError: (data, variables) => {
      toast({
        title: 'Erreur !',
        description: `Le produit ${variables.id} - ${variables.name} n'a pas été mise à jour. Raison : ${data.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
  });

  // Toast
  const toast = useToast();

  // React Query handlers...
  if (isError) return <div>{error.message}</div>;

  if (!isLoading && data) {
    return (
      <ProductForm
        textSubmitButton="Mettre à jour"
        onSubmit={(data) => mutation.mutate(data)}
        product={{
          ...data.product,
          shopCategory: {
            value: data.product.shopCategory.id,
            label:
              data.product.shopCategory.parentCategory?.name +
              ' | ' +
              data.product.shopCategory.name,
          },
        }}
      >
        <DeleteBtn onConfirm={() => console.log(id)}>
          Etes-vous sûr de vouloir supprimer le produit <Text as="b">{data.product.name}</Text>?
        </DeleteBtn>
      </ProductForm>
    );
  } else {
    return <Progress size="md" isIndeterminate />;
  }
};
