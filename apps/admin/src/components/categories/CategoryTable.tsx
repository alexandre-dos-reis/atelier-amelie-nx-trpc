import { Box, HStack, Tag } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { CustomTable, LinkCell, SwitchCell } from '../table';
import { routes } from '../../utils/routes';
import { DragHandleIcon } from '@chakra-ui/icons';

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
  const dataTable = useMemo(() => data, []);

  const columnHelper = createColumnHelper<categoryListItem>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('updatedAt', {
        header: 'Mise à jour',
        cell: (props) => props.getValue().toLocaleDateString(),
      }),
      columnHelper.accessor('disposition', {
        header: 'Disposition',
        cell: (props) => (
          <HStack>
            <DragHandleIcon cursor="grab" _active={{ cursor: 'grabbing' }} />
            <Box>{props.getValue()}</Box>
          </HStack>
        ),
      }),
      columnHelper.accessor('name', {
        header: 'Nom',
        cell: (props) => (
          <LinkCell
            to={`${routes['categories'].url}/${props.row.original.id}`}
            label={props.row.original.name}
          />
        ),
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
        cell: (props) => (
          <Tag bgColor={'gray.500'} color="white">
            {props.getValue()}
          </Tag>
        ),
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
