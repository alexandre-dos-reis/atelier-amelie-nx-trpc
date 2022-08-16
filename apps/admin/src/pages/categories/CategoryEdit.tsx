import { Button, Progress, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryForm } from '../../components/categories/CategoryForm';
import { trpc } from '../../utils/trpc';

export const CategoryEdit = () => {
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const trpcContext = trpc.useContext();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = trpc.useQuery(['category.getOne', id]);

  const toast = useToast();

  if (isError) return <div>{error.message}</div>;

  if (!isLoading && data) {
    return (
      <CategoryForm
        textSubmitButton="Mettre à jour"
        onSubmit={(data) => console.log(data)}
        category={data.category}
      >
        <Button colorScheme="red" onClick={() => console.log(data)}>
          Supprimer
        </Button>
      </CategoryForm>
    );
  } else {
    return <Progress size="md" isIndeterminate />;
  }
};
