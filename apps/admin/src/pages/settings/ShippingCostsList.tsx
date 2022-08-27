import { trpc } from '../../utils/trpc';

export const ShippingCostsList = () => {
  const { data, isLoading, isError, error } = trpc.useQuery(['shippingCost.getAll']);

  return <div>{JSON.stringify(data?.shippingCosts)}</div>;
};
