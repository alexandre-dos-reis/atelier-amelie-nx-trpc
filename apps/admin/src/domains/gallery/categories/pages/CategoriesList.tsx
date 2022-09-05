import { Box, Progress } from '@chakra-ui/react';
import { trpc, findRoute } from 'utils';
import { CategoryTable } from '../components/CategoryTable';
import { LayoutHeaderList } from 'components/table';
import { CreateBtn } from 'components/buttons';

export const CategoriesList = () => {
  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery(['category.getAll'], {
    keepPreviousData: true,
  });

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <LayoutHeaderList headingText="Liste des catégories">
        <CreateBtn label="Créer une catégorie" to={findRoute('gallery.categories.create')} />
      </LayoutHeaderList>

      {isLoading && <Progress size="md" isIndeterminate />}
      {isSuccess && data.categories.length === 0 && (
        <Box w="full" textAlign="center" m="7">
          Il n'y a aucune catégories pour l'instant.
        </Box>
      )}
      {isSuccess && data.categories.length !== 0 && (
          <CategoryTable
            data={data.categories.map((c) => ({
              ...c,
              artworksLength: c.artworks.length,
            }))}
          />
      )}
    </>
  );
};
