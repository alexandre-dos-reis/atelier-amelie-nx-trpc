import { Button, Progress } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryForm } from '../../components/categories/CategoryForm';
import { ErrorToast, SuccessToast } from '../../components/toasts';
import { findRoute } from '../../utils/find-route';
import { trpc } from '../../utils/trpc';

export const CategoryEdit = () => {
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = trpc.useQuery(['category.getOne', id]);

  const updateMutation = trpc.useMutation('category.updateOne', {
    onSuccess: async (data) => {
      SuccessToast({
        type: 'update',
        description: `La catégorie ${data.category.id} - ${data.category.name} a été mise à jour.`,
      });
    },
    onError: (data) => {
      ErrorToast({
        description: `La catégorie n'a pas été mise à jour. Raison : ${data.message}`,
      });
    },
  });

  const deleteMutation = trpc.useMutation('category.deleteOne', {
    onSuccess: async (data) => {
      SuccessToast({
        type: 'delete',
        description: `L'oeuvre ${data.category.id} - ${data.category.name} a été supprimée.`,
      });
      navigate(findRoute('categories'), { replace: true });
    },
    onError: (data) => {
      ErrorToast({
        description: `La catégorie n'a pas été supprimée. Raison : ${data.message}`,
      });
    },
  });

  if (isError) return <div>{error.message}</div>;

  if (!isLoading && data) {
    return (
      <CategoryForm
        textSubmitButton="Mettre à jour"
        onSubmit={(data) => updateMutation.mutate(data)}
        category={data.category}
      >
        <Button colorScheme="red" onClick={() => deleteMutation.mutate({ id })}>
          Supprimer
        </Button>
      </CategoryForm>
    );
  } else {
    return <Progress size="md" isIndeterminate />;
  }
};
