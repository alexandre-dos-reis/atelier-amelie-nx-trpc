import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { CountCell, CustomDragTable, LinkCell, SwitchCell, useReorderRow } from 'components/table';
import { findRoute, trpc } from 'utils';

type categoryListItem = {
  id: number;
  updatedAt: Date;
  name: string;
  disposition: number;
  showInGallery: boolean;
  artworksLength: number;
};

interface CategoryTableProps {
  data: categoryListItem[];
}

export const CategoryTable = ({ data }: CategoryTableProps) => {
  const columnHelper = createColumnHelper<categoryListItem>();

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
            <LinkCell to={findRoute('gallery.categories.edit', category.id)}>{category.name}</LinkCell>
          );
        },
      }),
      columnHelper.display({
        id: 'showInGallery',
        header: 'Publier ?',
        cell: (props) => (
          <SwitchCell
            initialIsChecked={props.row.original.showInGallery}
            onChangeCallback={(isChecked) => console.log(isChecked)}
          />
        ),
      }),
      columnHelper.accessor('artworksLength', {
        header: "Nombre d'oeuvres associées",
        cell: (props) => <CountCell value={props.getValue()} />,
      }),
    ],
    []
  );

  const reorderMutation = trpc.useMutation('category.reOrder');

  const [controlledData, reorderRow] = useReorderRow(data, (newOrder) => {
    reorderMutation.mutate(newOrder);
  });

  const table = useReactTable({
    columns,
    data: controlledData,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
  });

  return <CustomDragTable reorderRow={reorderRow} table={table} />;
};
