import { useNavigate } from 'react-router-dom';
import { CategoryForm } from '../components/CategoryForm';
import { ErrorToast, SuccessToast } from 'components/toasts';
import { findRoute, trpc } from 'utils';

export const CategoryCreate = () => {
  const navigate = useNavigate();
  const trpcContext = trpc.useContext();

  const createMutation = trpc.useMutation(['category.createOne'], {
    onSuccess: async (data) => {
      SuccessToast({
        type: 'create',
        description: `La catégorie ${data.category.id} - ${data.category.name} a été créée.`,
      });
      navigate(findRoute('gallery.categories.list'), { replace: true });
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
