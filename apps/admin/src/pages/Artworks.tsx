import { trpc } from '../utils/trpc';
import { VStack } from '@chakra-ui/react';
import { ArtworkListItem } from '../components/artworks';
import { useAtom } from 'jotai';
import { searchBarTextAtom, showSearchBarAtom } from '../store';

export const Artworks = () => {
  const [searchBarText] = useAtom(searchBarTextAtom);
  const { data, isLoading, isError, error } = trpc.useQuery(['artwork.getAll']);

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <VStack spacing="24px" m={2}>
      {data?.artworks.map((a) => (
        <ArtworkListItem key={a.id} a={a} />
      ))}
    </VStack>
  );
};
