import { findRoute, trpc } from 'utils';
import { useEffect, useMemo, useState } from 'react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { CustomDragTable, LayoutHeaderList, LinkCell, useReorderRow } from 'components/table';
import { ProgressBar } from 'components/progress-bar';
import { Box } from '@chakra-ui/react';
import Select, { SingleValue } from 'react-select';
import { CreateBtn } from 'components/buttons';

type SelectItem = { label: string; value: number };

export const ChildrenCategoriesList = () => {
  const [choosenCategory, setChoosenCategory] = useState<SingleValue<SelectItem> | undefined>(
    undefined
  );

  const parentCats = trpc.useQuery(['shopCat.findAllParentCategories']);

  // Essayer d'encapsuler dans des composants...

  const { data, isLoading, isSuccess } = trpc.useQuery(
    [
      'shopCat.findChildrenCategoriesByParentId',
      {
        parentId:
          (choosenCategory?.value as number) || (parentCats.data?.shopCategories[0].id as number),
      },
    ],
  );

  const handleSelectChange = (value: SingleValue<SelectItem>) => {
    setChoosenCategory(value);
  };

  // useEffect(() => {
  //   const cat = parentCats.data?.shopCategories[0];
  //   setChoosenCategory({
  //     label: cat?.name as string,
  //     value: cat?.id as number,
  //   });
  // }, []);

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
      <LayoutHeaderList headingText="Liste des catégories de la boutique">
        <div style={{ width: 300, zIndex: 1250 }}>
          <Select
            options={parentCats.data?.shopCategories.map((sc) => ({
              label: sc.name,
              value: sc.id,
            }))}
            defaultValue={choosenCategory}
            onChange={handleSelectChange}
          />
        </div>
      </LayoutHeaderList>
      {isLoading && <ProgressBar />}
      {isSuccess && data.shopCategories.length === 0 && (
        <Box w="full" textAlign="center" m="7">
          Il n'y a aucune catégories pour l'instant.
        </Box>
      )}
      {isSuccess && data.shopCategories.length !== 0 && (
        <CustomDragTable reorderRow={reorderRow} table={table} />
      )}
    </>
  );
};
