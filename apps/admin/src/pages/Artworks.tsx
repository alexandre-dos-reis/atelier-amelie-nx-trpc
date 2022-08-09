import { trpc } from '../utils/trpc';
import { Link as L } from 'react-router-dom';
import { routes } from '../utils/routes';
import {
  Switch,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Link,
} from '@chakra-ui/react';
import { ArtworkListItem } from '../components/artworks';
import { useAtom } from 'jotai';
import { searchBarTextAtom, showSearchBarAtom } from '../store';
import { useMemo } from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Category } from '@prisma/client';
import { TagsCell, SwitchCell } from '../components/table';

export const Artworks = () => {
  const [searchBarText] = useAtom(searchBarTextAtom);
  const [, setShowSearchBar] = useAtom(showSearchBarAtom);
  setShowSearchBar(true);

  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery(['artwork.getAll']);

  type Cols = {
    id: number;
    updatedAt: string;
    name: string;
    showInGallery: boolean;
    categories: Category[];
  };

  const dataTable = useMemo(
    (): Cols[] =>
      !isSuccess
        ? []
        : (data?.artworks.map((a) => ({
            id: a.id,
            name: a.name,
            categories: a.categories,
            showInGallery: a.showInGallery,
            updatedAt: a.updatedAt.toLocaleDateString(),
          })) as Cols[]),
    [data, isSuccess]
  );

  const columns: Column<Cols>[] = useMemo(
    () => [
      {
        Header: 'Modifié le ',
        accessor: 'updatedAt',
      },
      {
        Header: 'Nom',
        accessor: 'name',
        Cell: ({ cell }) => {
          return (
            <Link
              as={L}
              to={`${routes['artworks'].url}/${cell.row.original.id}`}
              color={'purple.800'}
            >
              {cell.value}
            </Link>
          );
        },
      },
      {
        Header: 'Publier ?',
        accessor: 'showInGallery',
        Cell: ({ cell: { value } }) => <SwitchCell isChecked={value} />,
      },
      {
        Header: 'Catégories',
        accessor: 'categories',
        Cell: ({ cell: { value } }) => <TagsCell values={value} />,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: dataTable },
    useSortBy
  );

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <Progress size="md" isIndeterminate />;

  return (
    <TableContainer>
      <Table colorScheme="facebook" size="sm" variant="striped" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
