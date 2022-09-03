import { Table, Tbody, Thead, TableContainer, Tr, Th } from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  CountCell,
  CustomDragTable,
  DraggableRow,
  LinkCell,
  SwitchCell,
  useReorderRow,
} from '../table';
import { findRoute } from '../../utils/find-route';
import { trpc } from '../../utils/trpc';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { IoHandRight } from 'react-icons/io5';

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
            <LinkCell to={findRoute('categories.edit', category.id)}>{category.name}</LinkCell>
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
