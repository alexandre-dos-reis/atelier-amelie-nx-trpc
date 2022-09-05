import { Box, Progress } from '@chakra-ui/react';
import { ProductTable } from '../components';
import { CreateBtn } from 'components/buttons';
import { LayoutHeaderList } from 'components/table';
import { findRoute, trpc } from 'utils';

export const ProductsList = () => {
  const { data, isLoading, isError, error, isSuccess } = trpc.useQuery([
    'product.getAll',
  ]);

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <LayoutHeaderList headingText="Liste des produits">
        <CreateBtn label="Créer un produit" to={findRoute('shop.products.create')} />
      </LayoutHeaderList>
      {isLoading && <Progress size="md" isIndeterminate />}
      {isSuccess && data.products.length === 0 && (
        <Box w="full" textAlign="center" m="7">
          Il n'y a aucune oeuvres pour l'instant.
        </Box>
      )}
      {isSuccess && data.products.length !== 0 && (
        <ProductTable data={data.products} isSuccess={isSuccess}/>
      )}
    </>
  );
};
