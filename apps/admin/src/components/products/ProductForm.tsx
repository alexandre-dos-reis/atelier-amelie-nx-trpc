import { Box, Flex, VStack } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { trpc } from '../../utils/trpc';
import { CustomInput as Input, CustomSelect as Select, CustomSwitch as Switch } from '../form';
import { product as schema } from '@atelier-amelie-nx-trpc/validation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import slugify from 'slugify';
import { BackBtn, SubmitBtn } from '../buttons';

interface ProductFormProps {
  children?: ReactNode;
  product: schema.updateOrCreateOneSchemaType;
  onSubmit: SubmitHandler<schema.updateOrCreateOneSchemaType>;
  textSubmitButton: string;
  isLoading?: boolean;
}

export const ProductForm = ({
  product,
  onSubmit,
  textSubmitButton,
  isLoading = false,
  children,
}: ProductFormProps) => {
  // Form
  const {
    control: c,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, isDirty },
  } = useForm<schema.updateOrCreateOneSchemaType>({
    resolver: zodResolver(schema.updateOrCreateOneSchema),
    defaultValues: product,
    mode: 'onChange',
  });

  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (isLocked && name === 'name') {
        setValue('slug', slugify(value.name as string, { lower: true }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, isLocked, setValue]);

  // UI
  const gap = 5;

  const shopCategories = trpc.useQuery(['product.getAllCategories']).data?.shopCategories;

  return (
    <Box bg={'whiteAlpha.000'} rounded={'sm'} px={7} mt={gap}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <VStack spacing={gap}>
          <Flex w="full" gap={gap} justify="center">
            <Input c={c} type="text" name="name" label="Nom de l'oeuvre" required />
            <Input
              c={c}
              type="text"
              name="slug"
              label="Lien dans l'url"
              required
              disabled
              setIsLocked={setIsLocked}
              isLocked={isLocked}
            />
          </Flex>
          <Flex w="full" gap={gap} justify="center">
            <Input c={c} type="textarea" name="description" label="Description" required />
          </Flex>
          <Flex w="full" gap={gap} justify="center">
            <Select c={c} label="Catégorie" name="shopCategory" options={shopCategories} required />
          </Flex>
          <Flex w="full" gap={gap} justify="center">
            <Input c={c} type="number" name="height" label="Hauteur en millimètres" />
            <Input c={c} type="number" name="width" label="Largeur en millimètres" />
          </Flex>
          <Flex w="full" gap={gap} justify="center">
            <Input c={c} type="number" name="price" label="Prix" required />
            <Input c={c} type="number" name="stock" label="Stock" required />
          </Flex>
          <Flex w="full" gap={gap} justify="center">
            <Switch c={c} name="forSale" label="En vente ?" />
          </Flex>
        </VStack>
        <Flex justifyContent="space-between" mt={gap + 5}>
          <BackBtn />
          <SubmitBtn
            label={textSubmitButton}
            isDisabled={!isValid || !isDirty}
            isLoading={isLoading}
          />
          {children}
        </Flex>
      </form>
    </Box>
  );
};
