import { trpc } from '../../utils/trpc';
import { routes } from '../../utils/routes';
import { Link as L } from 'react-router-dom';
import { Progress, Button, Flex, Heading, Box } from '@chakra-ui/react';
import { ArtworkTable } from '../../components/artworks/ArtworkTable';
import { LayoutHeaderList } from '../../components/table';

export const ArtworksList = () => {
  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery(['artwork.getAll'], {
    keepPreviousData: true,
  });

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <LayoutHeaderList headingText="Liste des oeuvres">
        <Button
          as={L}
          to={routes['artworks'].children?.['create'].url as string}
          colorScheme="blue"
        >
          Créer une oeuvre
        </Button>
      </LayoutHeaderList>

      {isLoading && <Progress size="md" isIndeterminate />}
      {isSuccess && data.artworks.length === 0 && (
        <Box w="full" textAlign="center" m="7">
          Il n'y a aucune oeuvres pour l'instant.
        </Box>
      )}
      {isSuccess && data.artworks.length !== 0 && <ArtworkTable data={data.artworks} />}
    </>
  );
};
