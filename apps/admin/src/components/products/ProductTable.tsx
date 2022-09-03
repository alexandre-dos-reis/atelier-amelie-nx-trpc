import { memo, useCallback, useMemo } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { findRoute } from '../../utils/find-route';
import { CustomTable, LinkCell, SwitchCell, TagsCell, CountCell } from '../table';
import { trpc } from '../../utils/trpc';
import { Tag } from '@chakra-ui/react';
import {
  productsListItemSchema,
  productsListSchema,
} from '@atelier-amelie-nx-trpc/validation-schema';
import { z } from 'zod';

interface ProductTableProps {
  data: z.infer<typeof productsListSchema>;
  isSuccess: boolean;
}

export const ProductTable = ({ data, isSuccess }: ProductTableProps) => {
  const dataTable = useMemo(() => data, []);

  const columnHelper = createColumnHelper<z.infer<typeof productsListItemSchema>>();

  const columns = useMemo(
    () => [
      // columnHelper.accessor('updatedAt', {
      //   header: 'Mise à jour',
      //   cell: (info) => info.getValue().toLocaleDateString(),
      // }),
      columnHelper.accessor('stock', {
        header: '# Stock',
        cell: (props) => <CountCell value={props.getValue()} redAtZero />,
      }),

      columnHelper.accessor('name', {
        header: 'Nom',
        cell: (props) => {
          const product = props.row.original;
          return (
            <LinkCell to={findRoute(`shop.products.edit`, product.id)} fontSize="sm">
              {product.name}
            </LinkCell>
          );
        },
      }),

      columnHelper.accessor('shopCategory', {
        header: 'Catégories',
        cell: (props) => (
          <TagsCell
            values={[
              {
                label: props.getValue().parentCategory?.name as string,
                value: props.getValue().parentCategory?.id as number,
              },
              { label: props.getValue().name, value: props.getValue().id },
            ]}
          />
        ),
      }),

      columnHelper.display({
        id: 'forSale',
        header: 'En vente ?',
        cell: memo((props) => {
          const mutation = trpc.useMutation(['product.updateForSale']);

          const onChangeCallback = useCallback((isChecked: boolean) => {
            mutation.mutateAsync({
              id: props.row.original.id,
              isChecked,
            });
          }, []);

          return (
            <SwitchCell
              initialIsChecked={props.row.original.forSale}
              onChangeCallback={onChangeCallback}
            />
          );
        }),
      }),

      columnHelper.accessor('artwork.name', {
        header: 'Oeuvre associée',
        size: 20,
        cell: (props) => {
          const artwork = props.row.original.artwork;
          return (
            <LinkCell to={findRoute(`artworks.edit`, artwork.id)} fontSize="sm">
              {artwork.name}
            </LinkCell>
            // <LinkCell to={findRoute(`artworks.edit`, artwork.id)} fontSize="sm" centered>
            //   <FaPalette />
            // </LinkCell>
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: dataTable,
    getCoreRowModel: getCoreRowModel(),
  });

  return <CustomTable table={table} />;
};
