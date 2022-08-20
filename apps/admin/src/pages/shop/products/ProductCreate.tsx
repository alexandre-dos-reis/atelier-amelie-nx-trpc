import { useToast } from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../../../utils/trpc';
import { product as schema } from '@atelier-amelie-nx-trpc/validation-schema';
import { findRoute } from '../../../utils/find-route';
import { ProductForm } from '../../../components/products';

export const ProductCreate = () => {
  const trpcContext = trpc.useContext();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<schema.updateOrCreateOneSchemaType> = (data) => console.log(data);

  return (
    <ProductForm
      textSubmitButton="Créer"
      onSubmit={onSubmit}
      product={{
        id: 0,
        name: '',
        slug: '',
        description: '',
        forSale: false,
        price: 0,
        shopCategory: {
          label: '',
          value: 0,
        },
        stock: 0,
        height: null,
        width: null,
      }}
    />
  );
};
