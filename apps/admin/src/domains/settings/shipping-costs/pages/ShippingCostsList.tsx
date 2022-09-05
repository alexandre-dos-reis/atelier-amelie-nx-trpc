import { InferQueryOutput } from '@atelier-amelie-nx-trpc/trpc-routers';
import { Box, Progress } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { CreateBtn } from 'components/buttons';
import { CustomTable, LayoutHeaderList, LinkCell } from 'components/table';
import { findRoute, trpc } from 'utils';

export const ShippingCostsList = () => {
  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery(['shippingCost.getAll']);
  const memoedData = useMemo(() => data?.shippingCosts, [isSuccess]);

  type Query = InferQueryOutput<'shippingCost.getAll'>;
  type ShippingCostList = Query['shippingCosts'];
  type ShippingCostListItem = ShippingCostList[number];
  const columnHelper = createColumnHelper<ShippingCostListItem>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('max', {
        header: 'Palier',
        cell: (props) => (
          <LinkCell
            to={findRoute(`settings.shipping-cost.edit`, props.row.original.id)}
            fontSize="sm"
          >
            {props.getValue()}
          </LinkCell>
        ),
      }),
      columnHelper.accessor('insuranceCost', {
        header: "Frais d'assurance",
        cell: (props) => props.getValue(),
      }),
      columnHelper.accessor('weightCost', {
        header: 'Frais postaux',
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
      <LayoutHeaderList headingText="Frais de port">
        <CreateBtn label="Créer un frais de port" to={findRoute('shop.products.create')} />
      </LayoutHeaderList>
      {isLoading && <Progress size="md" isIndeterminate />}
      {isSuccess && data.shippingCosts.length === 0 && (
        <Box w="full" textAlign="center" m="7">
          Il n'y a aucune oeuvres pour l'instant.
        </Box>
      )}
      {isSuccess && data.shippingCosts.length !== 0 && <CustomTable table={table} />}
    </>
  );
};
