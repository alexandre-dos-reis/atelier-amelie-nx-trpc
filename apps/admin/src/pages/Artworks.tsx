import { trpc } from '../utils/trpc';
import { Link, Outlet } from 'react-router-dom';
import { routes } from '../utils/routes';

export const Artworks = () => {
  const { data, isLoading, isError, error } = trpc.useQuery(['artwork.getAll']);

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.artworks.map((a) => (
        <li key={a.id}>
          <Link to={`${routes['artworks'].url}/${a.id}`} key={a.id}>
            {a.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
