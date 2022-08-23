import { Button, Progress } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryForm } from '../../components/categories/CategoryForm';
import { ErrorToast, SuccessToast } from '../../components/toasts';
import { findRoute } from '../../utils/find-route';
import { trpc } from '../../utils/trpc';

export const CategoryEdit = () => {
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const trpcContext = trpc.useContext();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = trpc.useQuery(['category.getOne', id]);

  const updateMutation = trpc.useMutation('category.updateOne', {
    onSuccess: async (data) => {
      trpcContext.setQueryData(['category.getOne', data.category.id], {
        category: data.category,
      });

      trpcContext.invalidateQueries(['artwork.getAll']);
      trpcContext.invalidateQueries(['artwork.getCategoriesForSelect']);

      await trpcContext.cancelQuery(['category.getAll']);
      const previousData = trpcContext.getQueryData(['category.getAll']);
      if (previousData) {
        trpcContext.setQueryData(['category.getAll'], {
          ...previousData,
          categories: previousData.categories.map((c) =>
            c.id === data.category.id
              ? {
                  ...c,
                  ...data.category,
                }
              : c
          ),
        });
      }

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
      await trpcContext.cancelQuery(['category.getAll']);
      const previousData = trpcContext.getQueryData(['category.getAll']);
      if (previousData) {
        trpcContext.setQueryData(['category.getAll'], {
          ...previousData,
          categories: previousData.categories.filter((c) => c.id !== data.category.id),
        });
      }

      navigate(findRoute('categories'), { replace: true });

      trpcContext.queryClient.removeQueries(['category.getOne', data.category.id]);
      trpcContext.invalidateQueries(['artwork.getOne']);
      trpcContext.invalidateQueries(['artwork.getAll']);
      trpcContext.invalidateQueries(['artwork.getCategoriesForSelect']);

      SuccessToast({
        type: 'delete',
        description: `L'oeuvre ${data.category.id} - ${data.category.name} a été supprimée.`,
      });
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
