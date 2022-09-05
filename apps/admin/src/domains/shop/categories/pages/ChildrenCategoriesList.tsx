import { trpc } from "utils";

export const ChildrenCategoriesList = () => {
  const { data, isLoading, error } = trpc.useQuery(['shopCat.findAllChildrenCats']);

  return <div>{JSON.stringify(data?.shopCategories)}</div>;
};
