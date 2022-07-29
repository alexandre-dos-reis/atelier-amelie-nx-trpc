import { trpc } from '../utils/trpc';
import { useParams } from 'react-router-dom';
import { routes } from '../utils/routes';

export const Artwork = () => {
  const params = useParams();

  const { data, isLoading, isError, error } = trpc.useQuery([
    'artwork.getOne',
    parseInt(params[routes['artworks'].params?.['id'] as string] as string),
  ]);

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <article>
      <h1>{data?.artwork.name}</h1>
      <p>{data?.artwork.createdAt.toString()}</p>
      <p>{data?.artwork.description}</p>
      <p>{data?.artwork.filename}</p>
      <p>{data?.artwork.watermarkedFilename}</p>
      <p>{data?.artwork.showInGallery}</p>
    </article>
  );
};
