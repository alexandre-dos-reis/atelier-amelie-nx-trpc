import { trpc } from 'utils';

export const ShopCatsList = () => {
  const { data, isLoading, error } = trpc.useQuery(['shopCat.findAllParentCats']);

  return <div>{JSON.stringify(data?.shopCategories)}</div>;
};
