import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { flexRender, Table as ReactTable } from '@tanstack/react-table';
import { IoHandRight } from 'react-icons/io5';
import { DraggableRow } from './DraggableRow';

interface CustomDragTableProps<T> {
  table: ReactTable<T>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
}

export function CustomDragTable<T>({ table, reorderRow }: CustomDragTableProps<T>) {
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
}
