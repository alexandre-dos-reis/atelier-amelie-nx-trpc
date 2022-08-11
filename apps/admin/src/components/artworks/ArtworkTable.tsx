import { Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Category } from '@prisma/client';
import { useCallback, useMemo } from 'react';
import {
  createColumnHelper,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  CellContext,
} from '@tanstack/react-table';
import { Link as L } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { SwitchCell, TagsCell, MemoedSwitchCell } from '../table';
import { trpc } from '../../utils/trpc';

type artworkItem = {
  id: number;
  updatedAt: Date;
  name: string;
  showInGallery: boolean;
  categories: { name: string; id: number }[];
};

interface ArtworkTableProps {
  data: artworkItem[];
}

export const ArtworkTable = ({ data }: ArtworkTableProps) => {
  const trpcContext = trpc.useContext();

  const mutation = trpc.useMutation(['artwork.updateShowInGallery'], {
    onSuccess: (data) => {
      trpcContext.invalidateQueries('artwork.getAll');
      trpcContext.invalidateQueries(['artwork.getOne', data.artwork.id]);
    },
  });

  const dataTable = useMemo(() => data, [data]);

  const columnHelper = createColumnHelper<artworkItem>();

  const columns = useMemo(
    () => [
      // columnHelper.accessor('id', {
      //   id: 'id',
      //   header: '#',
      //   cell: (info) => info.getValue(),
      // }),
      columnHelper.accessor('updatedAt', {
        header: 'Mise à jour',
        cell: (info) => info.getValue().toLocaleDateString(),
      }),
      columnHelper.accessor('name', {
        header: 'Nom',
        cell: (props) => (
          <Link
            as={L}
            to={`${routes['artworks'].url}/${props.row.original.id}`}
            color={'purple.800'}
          >
            {props.row.original.name}
          </Link>
        ),
      }),
      columnHelper.display({
        id: 'showInGallery',
        header: 'Publier ?',
        cell: (props) => (
          <MemoedSwitchCell
            initialIsChecked={props.row.original.showInGallery}
            onChangeCallback={(isChecked) =>
              mutation.mutate({
                id: props.row.original.id,
                isChecked,
              })
            }
          />
        ),
      }),
      columnHelper.display({
        id: 'categories',
        header: 'Catégories',
        cell: (props) => <TagsCell values={props.row.original.categories} />,
      }),
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: dataTable,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer overflowX="unset" overflowY="unset">
      <Table colorScheme="facebook" size="sm" variant="striped" position="relative">
        <Thead position="sticky" top="0" zIndex="docked" bg="white">
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
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
