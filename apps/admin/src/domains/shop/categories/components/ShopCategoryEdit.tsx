import { Button } from '@chakra-ui/react';
import { ProgressBar } from 'components/progress-bar';
import { useNavigate, useParams } from 'react-router-dom';
import { trpc } from 'utils';

export const CatEdit = () => {
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const navigate = useNavigate();

  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery(['shopCat.findOne', { id }]);

  if (isError) return <div>{error.message}</div>;

  if (!isLoading && data) {
    return (
      <CategoryForm
        textSubmitButton="Mettre à jour"
        onSubmit={(data) => console.log(data)}
        category={data.category}
      >
        <Button colorScheme="red" onClick={() => console.log({ id })}>
          Supprimer
        </Button>
      </CategoryForm>
    );
  } else {
    return <ProgressBar />;
  }
};
