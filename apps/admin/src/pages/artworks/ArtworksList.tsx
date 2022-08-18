import { trpc } from '../../utils/trpc';
import { findRoute } from '../../utils/find-route';
import { Progress, Box } from '@chakra-ui/react';
import { ArtworkTable } from '../../components/artworks/ArtworkTable';
import { LayoutHeaderList } from '../../components/table';
import { CreateBtn } from '../../components/buttons';

export const ArtworksList = () => {
  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery(['artwork.getAll'], {
    keepPreviousData: true,
  });

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <LayoutHeaderList headingText="Liste des oeuvres">
        <CreateBtn label="Créer une oeuvre" to={findRoute('artworks.create')} />
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
