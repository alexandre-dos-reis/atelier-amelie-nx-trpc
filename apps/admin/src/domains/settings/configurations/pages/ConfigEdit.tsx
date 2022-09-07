import { VAR_KEY } from '@prisma/client';
import { useNavigate, useParams } from 'react-router-dom';
import { trpc } from 'utils';

export const ConfigEdit = () => {
  const params = useParams();
  const id = parseInt(params['id'] as string);
  const navigate = useNavigate();

  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery(['adminVar.getOne', { id }]);
  
  return <div>
    {data?.config.key === 'CGV' ? 'CGV' : 'ANOTHER KEY'}
  </div>;
};
