import { trpc, findRoute } from 'utils';
import { Progress, Box } from '@chakra-ui/react';
import { ArtworkTable } from '../components/ArtworkTable';
import { LayoutHeaderList } from 'components/table';
import { CreateBtn } from 'components/buttons';
import { InferQueryOutput } from '@atelier-amelie-nx-trpc/trpc-routers';
import { createColumnHelper } from '@tanstack/react-table';

export const ArtworksList = () => {
  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery(['artwork.getAll'], {
    keepPreviousData: true,
  });

  type Query = InferQueryOutput<'artwork.getAll'>;
  type ArtworkList = Query['artworks'];
  type ArtworkListItem = ArtworkList[number];

  const columnHelper = createColumnHelper<ArtworkListItem>();

  

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <LayoutHeaderList headingText="Liste des oeuvres">
        <CreateBtn label="Créer une oeuvre" to={findRoute('gallery.artworks.create')} />
      </LayoutHeaderList>
      {isLoading && <Progress size="md" isIndeterminate />}
      {isSuccess && data.artworks.length === 0 && (
        <Box w="full" textAlign="center" m="7">
          Il n'y a aucune oeuvres pour l'instant.
        </Box>
      )}
      {isSuccess && data.artworks.length !== 0 && (
        <ArtworkTable
          isSuccess={isSuccess}
          data={data.artworks.map((a) => ({
            ...a,
            totalProducts: a.totalProducts,
            categories: a.categories.map((c) => ({
              label: c.name,
              value: c.id,
            })),
          }))}
        />
      )}
    </>
  );
};
