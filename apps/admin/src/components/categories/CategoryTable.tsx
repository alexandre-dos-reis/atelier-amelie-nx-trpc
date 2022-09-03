import { Table, Tbody, Thead, TableContainer, Tr, Th } from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FC, useMemo, useState } from 'react';
import { CountCell, DraggableRow, LinkCell, SwitchCell, useReorderRow } from '../table';
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
  // const [dataTable, setData] = useState<categoryListItem[]>(data);
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

  const [dataTable, reorderRow] = useReorderRow(data, (newOrder) =>
    reorderMutation.mutate(newOrder)
  );

  const table = useReactTable({
    columns,
    data: dataTable as categoryListItem[],
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
  });

  const [animationParent] = useAutoAnimate<HTMLTableSectionElement>();

  return (
    <TableContainer overflowX="unset" overflowY="unset">
      <Table size="sm" variant="unstyled" position="relative">
        <Thead position="sticky" top="0" zIndex="sticky" bg="white">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              <Th>
                <IoHandRight />
              </Th>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody ref={animationParent} bg="whiteAlpha.300">
          {table.getRowModel().rows.map((row) => (
            <DraggableRow key={row.id} row={row} reorderRow={reorderRow} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
