import { trpc } from '../../utils/trpc';

export const ConfigurationsList = () => {
  const { data, isLoading, isError, error } = trpc.useQuery(['adminVar.getAll']);

  if (isError) return <div>{error.message}</div>;

  return <div>{JSON.stringify(data?.vars)}</div>;
};
