import { Link, Tag } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { CustomTable, SwitchCell } from '../table';
import { Link as L } from 'react-router-dom';
import { routes } from '../../utils/routes';

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
        cell: (props) => props.getValue(),
      }),
      columnHelper.accessor('name', {
        header: 'Nom',
        cell: (props) => (
          <Link
            as={L}
            to={`${routes['categories'].url}/${props.row.original.id}`}
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
          <SwitchCell
            initialIsChecked={props.row.original.showInGallery}
            onChangeCallback={(isChecked) => console.log(isChecked)}
          />
        ),
      }),

      columnHelper.accessor('artworksLength', {
        header: "Nombre d'oeuvres associées",
        cell: (props) => (
          <Tag bgColor={'gray.500'} color="white" >
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
