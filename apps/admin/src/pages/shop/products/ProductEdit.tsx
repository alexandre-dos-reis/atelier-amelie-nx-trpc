import { useToast, Text, Progress } from '@chakra-ui/react';
import { DeleteBtn } from '../../../components/buttons';
import { ProductForm } from '../../../components/products';
import { useNavigate, useParams } from 'react-router-dom';
import { trpc } from '../../../utils/trpc';

export const ProductEdit = () => {
  // Params from router
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const trpcContext = trpc.useContext();
  const navigate = useNavigate();

  // Trpc / React Query
  const { data, isLoading, isError, error } = trpc.useQuery(['product.getOne', id]);

  // Toast
  const toast = useToast();

  // React Query handlers...
  if (isError) return <div>{error.message}</div>;

  if (!isLoading && data) {
    return (
      <ProductForm
        textSubmitButton="Mettre à jour"
        onSubmit={(data) => console.log(data)}
        product={data.product}
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
