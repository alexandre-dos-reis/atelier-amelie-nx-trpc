import { findRoute, trpc } from 'utils';
import { useMemo } from 'react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { CustomDragTable, LayoutHeaderList, LinkCell, useReorderRow } from 'components/table';
import { ProgressBar } from 'components/progress-bar';
import { Box } from '@chakra-ui/react';

interface shopCategoryListProps {
  selectParent: boolean;
}

export const ShopCategoryList = ({ selectParent }: shopCategoryListProps) => {
  const { data, isLoading, isSuccess } = trpc.useQuery([
    'shopCat.findAllParentCats',
    { selectParent },
  ]);

  const memoedCategories = useMemo(() => data?.shopCategories ?? [], [isSuccess]);
  const columnHelper = createColumnHelper<NonNullable<typeof data>['shopCategories'][number]>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('disposition', {
        header: 'Disposition',
        cell: (props) => props.getValue(),
      }),
      columnHelper.accessor('name', {
        header: 'Nom',
        cell: (props) => {
          const category = props.row.original;
          return (
            <LinkCell to={findRoute('shop.categories.edit', category.id)}>{category.name}</LinkCell>
          );
        },
      }),
    ],
    []
  );

  const [controlledData, reorderRow] = useReorderRow(memoedCategories, (newOrder) => {
    console.log(newOrder);
  });

  const table = useReactTable({
    columns,
    data: controlledData,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
  });

  return (
    <>
      <LayoutHeaderList headingText="Liste des catégories de la boutique">{''}</LayoutHeaderList>
      {isLoading && <ProgressBar />}
      {isSuccess && data.shopCategories.length === 0 ? (
        <Box w="full" textAlign="center" m="7">
          Il n'y a aucune catégories pour l'instant.
        </Box>
      ) : (
        <CustomDragTable reorderRow={reorderRow} table={table} />
      )}
    </>
  );
};
