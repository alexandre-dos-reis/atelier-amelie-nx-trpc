import { Box, Button, Progress } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';
import { Link as L } from 'react-router-dom';
import { findRoute } from '../../utils/find-route';
import { CategoryTable } from '../../components/categories';
import { LayoutHeaderList } from '../../components/table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CreateBtn } from '../../components/buttons';

export const CategoriesList = () => {
  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery(['category.getAll'], {
    keepPreviousData: true,
  });

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <LayoutHeaderList headingText="Liste des catégories">
        <CreateBtn label="Créer une catégorie" to={findRoute('categories.create')} />
      </LayoutHeaderList>

      {isLoading && <Progress size="md" isIndeterminate />}
      {isSuccess && data.categories.length === 0 && (
        <Box w="full" textAlign="center" m="7">
          Il n'y a aucune catégories pour l'instant.
        </Box>
      )}
      {isSuccess && data.categories.length !== 0 && (
        <DndProvider backend={HTML5Backend}>
          <CategoryTable
            data={data.categories.map((c) => ({
              ...c,
              artworksLength: c.artworks.length,
            }))}
          />
        </DndProvider>
      )}
    </>
  );
};
