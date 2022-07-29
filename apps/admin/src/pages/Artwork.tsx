import { trpc } from '../utils/trpc';

interface ArtworkProps {
  id: number;
}

export const Artwork = ({ id }: ArtworkProps) => {
  const { data, isLoading, isError, error } = trpc.useQuery(['artwork.getOne', id]);

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return <article>{data?.artwork.name}</article>;
};
