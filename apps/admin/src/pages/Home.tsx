import { trpc } from '../utils/trpc';

export const Home = () => {
  const { data, isLoading, isError, error } = trpc.useQuery(['artwork.getAll']);

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.artworks.map((a) => (
        <li key={a.id}>{a.id} - {a.name}</li>
      ))}
    </ul>
  );
};
