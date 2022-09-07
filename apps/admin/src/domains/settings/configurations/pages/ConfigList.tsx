import { trpc } from 'utils';

export const ConfigList = () => {
  const { data, isLoading, isError, error } = trpc.useQuery(['adminVar.getAll']);

  if (isError) return <div>{error.message}</div>;

  return <div>{JSON.stringify(data?.vars)}</div>;
};
