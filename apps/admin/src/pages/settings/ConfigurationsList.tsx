import { trpc } from '../../utils/trpc';

export const ConfigurationsList = () => {
  const { data, isLoading, isError, error } = trpc.useQuery(['adminVar.getAll']);

  return <div>{JSON.stringify(data?.vars)}</div>;
};
