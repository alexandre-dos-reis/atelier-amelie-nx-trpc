import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CategoryForm } from '../../components/categories/CategoryForm';

export const CategoryCreate = () => {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <CategoryForm
      textSubmitButton="Créer une catégorie"
      onSubmit={(data) => console.log(data)}
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
