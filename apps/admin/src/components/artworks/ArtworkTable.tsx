import { Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Link as L } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { SwitchCell, TagsCell } from '../table';
import { trpc } from '../../utils/trpc';

type artworkItem = {
  id: number;
  updatedAt: Date;
  name: string;
  showInGallery: boolean;
  categories: { label: string; value: number }[];
};

interface ArtworkTableProps {
  data: artworkItem[];
}

export const ArtworkTable = ({ data }: ArtworkTableProps) => {
  const dataTable = useMemo(() => data, []);

  const columnHelper = createColumnHelper<artworkItem>();

  const columns = useMemo(
    () => [
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
        cell: memo((props) => {
          const trpcContext = trpc.useContext();

          const mutation = trpc.useMutation(['artwork.updateShowInGallery'], {
            onMutate: async (variables) => {
              await trpcContext.cancelQuery(['artwork.getAll']);
              const previousData = trpcContext.getQueryData(['artwork.getAll']);

              if (previousData) {
                trpcContext.setQueryData(['artwork.getAll'], {
                  ...previousData,
                  artworks: previousData.artworks.map((a) =>
                    a.id === variables.id ? { ...a, showInGallery: variables.isChecked } : a
                  ),
                });
              }

              await trpcContext.cancelQuery(['artwork.getOne', variables.id]);
              const previousArtwork = trpcContext.getQueryData(['artwork.getOne', variables.id]);

              if (previousArtwork) {
                trpcContext.setQueryData(['artwork.getOne', variables.id], {
                  ...previousArtwork,
                  showInGallery: variables.isChecked,
                });
              }

              return { previousData };
            },
            onError: (err, variables, context) => {
              if (context?.previousData) {
                trpcContext.setQueryData(['artwork.getAll'], context.previousData);
              }
            },
          });

          const onChangeCallback = useCallback((isChecked: boolean) => {
            mutation.mutateAsync({
              id: props.row.original.id,
              isChecked,
            });
          }, []);

          return (
            <SwitchCell
              initialIsChecked={props.row.original.showInGallery}
              onChangeCallback={onChangeCallback}
            />
          );
        }),
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
