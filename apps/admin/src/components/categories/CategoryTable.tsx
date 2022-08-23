import { Table, Tag, Tbody, Thead, TableContainer, Td, Tr, Th } from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import { FC, useMemo, useState } from 'react';
import { CountCell, CustomTable, LinkCell, SwitchCell } from '../table';
import { findRoute } from '../../utils/find-route';
import { DragHandleIcon } from '@chakra-ui/icons';
import { useDrag, useDrop } from 'react-dnd';
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

const DraggableRow: FC<{
  row: Row<categoryListItem>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
}> = ({ row, reorderRow }) => {
  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<categoryListItem>) => reorderRow(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });

  return (
    <Tr
      ref={previewRef} //previewRef could go here
      borderBottom="1px solid #dcdcdc"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Td ref={dropRef}>
        <button ref={dragRef}>
          <DragHandleIcon cursor="grab" _active={{ cursor: 'grabbing' }} />
        </button>
      </Td>
      {row.getVisibleCells().map((cell) => (
        <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
      ))}
    </Tr>
  );
};

export const CategoryTable = ({ data }: CategoryTableProps) => {
  const [dataTable, setData] = useState<categoryListItem[]>(data);
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

  const table = useReactTable({
    columns,
    data: dataTable,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
  });

  const reorderMutation = trpc.useMutation('category.reOrder');
  const trpcContext = trpc.useContext();

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0] as categoryListItem);

    const newDisposition = data.map((c, i) => ({
      id: c.id,
      disposition: i + 1,
    }));

    setData([
      ...data.map((c, i) => ({
        ...c,
        disposition: i + 1,
      })),
    ]);

    reorderMutation.mutate(newDisposition, {
      onSuccess: () => {
        trpcContext.invalidateQueries(['category.getAll']);
      },
    });
  };

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
