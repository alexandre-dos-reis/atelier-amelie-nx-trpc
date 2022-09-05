import { ucFirst } from '@atelier-amelie-nx-trpc/helpers';
import { getStatus } from '@atelier-amelie-nx-trpc/purchase-service';
import { InferQueryOutput } from '@atelier-amelie-nx-trpc/trpc-routers';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Progress, Tag } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { CustomTable, LayoutHeaderList, LinkCell } from 'components/table';
import { findRoute, trpc } from 'utils';

export const PurchasesList = () => {
  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery(['purchase.findAll']);
  const memoedData = useMemo(() => data?.purchases, [isSuccess]);

  type ShippingCostListItem = InferQueryOutput<'purchase.findAll'>['purchases'][number];
  const columnHelper = createColumnHelper<ShippingCostListItem>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Détails',
        cell: (props) => (
          <LinkCell to={findRoute('purchases.edit', props.getValue())}>
            <ExternalLinkIcon />
          </LinkCell>
        ),
      }),
      columnHelper.accessor('purchaseAt', {
        header: 'Passé le',
        cell: (props) => props.getValue().toLocaleDateString(),
      }),
      columnHelper.accessor('email', {
        header: 'Courriel',
        cell: (props) => props.getValue(),
      }),
      columnHelper.accessor('status', {
        header: 'Statut',
        cell: (props) => {
          const statusItem = getStatus(props.getValue());
          return <Tag colorScheme={statusItem.color}>{ucFirst(statusItem.value)}</Tag>;
        },
      }),
      columnHelper.accessor('trackingNumber', {
        header: 'Numéro de suivi',
        cell: (props) => props.getValue(),
      }),
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: memoedData ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <LayoutHeaderList headingText="Commandes">{""}</LayoutHeaderList>
      {isLoading && <Progress size="md" isIndeterminate />}
      {isSuccess && data.purchases.length === 0 && (
        <Box w="full" textAlign="center" m="7">
          Il n'y a aucune oeuvres pour l'instant.
        </Box>
      )}
      {isSuccess && data.purchases.length !== 0 && <CustomTable table={table} />}
    </>
  );
};
