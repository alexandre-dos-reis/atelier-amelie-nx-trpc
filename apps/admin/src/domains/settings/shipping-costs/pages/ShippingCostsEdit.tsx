import { useNavigate, useParams } from 'react-router-dom';
import { DeleteBtn } from 'components/buttons';
import { ShippingCostForm } from '../components';
import { trpc } from 'utils';
import { Progress, Text } from '@chakra-ui/react';

export const ShippingCostsEdit = () => {
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = trpc.useQuery(['shippingCost.getOne', { id }]);

  if (isError) return <div>{error.message}</div>;

  if (!isLoading && data) {
    return (
      <ShippingCostForm
        onSubmit={(data) => console.log(data)}
        shippingCost={data.shippingCost}
        textSubmitButton="Mettre à jour"
      >
        <DeleteBtn onConfirm={() => console.log('deleted...')}>
          Etes-vous sûr de vouloir supprimer le palier <Text as="b">{data.shippingCost.max}</Text>?
        </DeleteBtn>
      </ShippingCostForm>
    );
  } else {
    return <Progress size="md" isIndeterminate />;
  }
};
