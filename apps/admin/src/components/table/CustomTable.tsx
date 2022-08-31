import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { flexRender, Table as ReactTable } from '@tanstack/react-table';

interface CustomTableProps<T> {
  table: ReactTable<T>;
}

export function CustomTable<T>({ table }: CustomTableProps<T>) {
  return (
    <TableContainer overflowX="unset" overflowY="unset">
      <Table size="sm" variant="unstyled" position="relative">
        <Thead position="sticky" top="0" zIndex="sticky" bg="white">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
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
        <Tbody bg="whiteAlpha.300">
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id} borderBottom="1px solid #dcdcdc">
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
