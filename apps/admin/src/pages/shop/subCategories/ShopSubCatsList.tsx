import { trpc } from "../../../../src/utils/trpc";

export const ShopSubCatsList = () => {
  const { data, isLoading, error } = trpc.useQuery(['shopCat.findAllChildrenCats']);

  return <div>{JSON.stringify(data?.shopCategories)}</div>;
};
