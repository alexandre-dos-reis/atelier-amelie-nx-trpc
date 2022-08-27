import { trpc } from '../../../../src/utils/trpc';

export const ProductsImagesList = () => {
  const { data, isLoading, isError, error } = trpc.useQuery(['productImage.getProductImages']);

  return <div>{JSON.stringify(data?.images)}</div>;
};
