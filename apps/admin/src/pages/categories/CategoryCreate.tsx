import { useNavigate } from 'react-router-dom';
import { CategoryForm } from '../../components/categories/CategoryForm';
import { ErrorToast, SuccessToast } from '../../components/toasts';
import { findRoute } from '../../utils/find-route';
import { trpc } from '../../utils/trpc';

export const CategoryCreate = () => {
  const navigate = useNavigate();
  const trpcContext = trpc.useContext();

  const createMutation = trpc.useMutation(['category.createOne'], {
    onSuccess: async (data) => {
      await trpcContext.cancelQuery(['category.getAll']);
      trpcContext.invalidateQueries(['artwork.getCategoriesForSelect']);
      
      const previousData = trpcContext.getQueryData(['category.getAll']);
      if (previousData) {
        trpcContext.setQueryData(['category.getAll'], {
          ...previousData,
          categories: [data.category, ...previousData.categories],
        });
      }

      SuccessToast({
        type: 'create',
        description: `La catégorie ${data.category.id} - ${data.category.name} a été créée.`,
      });
      navigate(findRoute('categories'), { replace: true });
    },
    onError: (data, variables) => {
      ErrorToast({
        description: `La catégorie ${variables.id} - ${variables.name} n'a pas été créée. Raison : ${data.message}`,
      });
    },
  });

  return (
    <CategoryForm
      textSubmitButton="Créer une catégorie"
      onSubmit={(data) => createMutation.mutate(data)}
      category={{
        id: 0,
        name: '',
        showInGallery: false,
        slug: '',
        description: '',
      }}
    ></CategoryForm>
  );
};
