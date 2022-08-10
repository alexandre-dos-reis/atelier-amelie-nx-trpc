import { trpc } from '../../utils/trpc';
import { routes } from '../../utils/routes';
import { Link as L } from 'react-router-dom';
import {
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { searchBarTextAtom, showSearchBarAtom } from '../../store';
import { useMemo } from 'react';
import { useTable, useSortBy, Column } from 'react-table';
// import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Category } from '@prisma/client';
import { TagsCell, SwitchCell } from '../../components/table';

export const ArtworksList = () => {
  const [searchBarText] = useAtom(searchBarTextAtom);
  // const [, setShowSearchBar] = useAtom(showSearchBarAtom);
  // setShowSearchBar(true);

  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery(['artwork.getAll']);
  const m = trpc.useMutation(['artwork.updateShowInGallery']);
  const trpcContext = trpc.useContext();

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
        Header: 'Modifié le',
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
        Cell: ({ cell }) => (
          <SwitchCell
            isChecked={cell.value}
            onChangeCallback={(isChecked) => {
              m.mutateAsync(
                {
                  id: cell.row.original.id,
                  isChecked,
                },
                {
                  onSuccess(input) {
                    trpcContext.invalidateQueries(['artwork.getAll']);
                  },
                }
              );
            }}
          />
        ),
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
    <>
      <Flex
        justifyContent="space-between"
        bg="white"
        position="sticky"
        top="0"
        zIndex="banner"
        p="2"
        px="4"
      >
        <Heading>Liste des oeuvres</Heading>
        <Button
          as={L}
          to={routes['artworks'].children?.['create'].url as string}
          colorScheme="blue"
        >
          Créer une oeuvre
        </Button>
      </Flex>
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
    </>
  );
};
