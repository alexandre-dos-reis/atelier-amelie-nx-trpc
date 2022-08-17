import { Box, Button, Flex, Heading, HStack, Progress } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';
import { Link as L } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { CategoryTable } from '../../components/categories';
import { LayoutHeaderList } from '../../components/table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AddIcon } from '@chakra-ui/icons';

export const CategoriesList = () => {
  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery(['category.getAll'], {
    keepPreviousData: true,
  });

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <LayoutHeaderList headingText="Liste des catégories">
        <Button
          as={L}
          to={routes['categories'].children?.['create'].url as string}
          colorScheme="blue"
        >
          Créer une catégorie
        </Button>
      </LayoutHeaderList>

      {isLoading && <Progress size="md" isIndeterminate />}
      {isSuccess && data.categories.length === 0 && (
        <Box w="full" textAlign="center" m="7">
          Il n'y a aucune catégories pour l'instant.
        </Box>
      )}
      {isSuccess && data.categories.length !== 0 && (
        <DndProvider backend={HTML5Backend}>
          <CategoryTable data={data.categories} />
        </DndProvider>
      )}
    </>
  );
};
