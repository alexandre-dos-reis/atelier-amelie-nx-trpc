import { Box, Button, Flex, Heading, Progress } from '@chakra-ui/react';
import { trpc } from '../../utils/trpc';
import { Link as L } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { CategoryTable } from '../../components/categories';
import { LayoutHeaderList } from '../../components/table';

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
      {isSuccess && data.categories.length !== 0 && <CategoryTable data={data.categories} />}
    </>
  );
};
