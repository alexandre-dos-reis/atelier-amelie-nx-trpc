import { trpc } from '../utils/trpc';
import { VStack } from '@chakra-ui/react';
import { ArtworkListItem } from '../components/artworks';

export const Artworks = () => {
  const { data, isLoading, isError, error } = trpc.useQuery(['artwork.getAll']);

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <VStack spacing="24px">
      {data?.artworks.map((a) => (
        <ArtworkListItem a={a} />
      ))}
    </VStack>
  );
};
