import { trpc } from '../../../../src/utils/trpc';

export const ShopCatsList = () => {
  const { data, isLoading, error } = trpc.useQuery(['shopCat.findAllParentCats']);

  return <div>{JSON.stringify(data?.shopCategories)}</div>;
};
