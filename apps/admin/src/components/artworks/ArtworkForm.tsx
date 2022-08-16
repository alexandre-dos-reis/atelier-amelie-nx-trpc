import { Box, Button, Flex, HStack, VStack } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { trpc } from '../../utils/trpc';
import {
  CustomInput as Input,
  CustomSelect as Select,
  CustomSwitch as Switch,
  CustomDatePicker as DatePicker,
} from '../form';
import { artwork as schema } from '@atelier-amelie-nx-trpc/validation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import slugify from 'slugify';

interface ArtworkFormProps {
  children?: ReactNode;
  artwork: schema.updateOrCreateOneSchemaType;
  onSubmit: SubmitHandler<schema.updateOrCreateOneSchemaType>;
  textSubmitButton: string;
  isLoading?: boolean;
}

export const ArtworkForm = ({
  artwork,
  onSubmit,
  textSubmitButton,
  isLoading = false,
  children,
}: ArtworkFormProps) => {
  // Form
  const {
    control: c,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<schema.updateOrCreateOneSchemaType>({
    resolver: zodResolver(schema.updateOrCreateOneSchema),
    defaultValues: artwork,
    mode: 'onChange',
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'name') {
        setValue('slug', slugify(value.name as string, { lower: true }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // UI
  const gap = 5;

  // Categories options
  const categories = trpc.useQuery(['artwork.getCategoriesForSelect']).data?.categories;

  return (
    <Box bg={'whiteAlpha.000'} rounded={'sm'} px={7} mt={gap}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <VStack spacing={gap}>
          <HStack w="full" spacing={gap} justifyContent="center" alignItems="center">
            <DatePicker c={c} name="madeAt" label="Date de création" />
            <Switch c={c} name="showInGallery" label="Publier dans la galerie ?" />
            <Switch c={c} name="showInPortfolio" label="Publier dans le portfolio ?" />
          </HStack>
          <HStack w="full" spacing={gap} justifyContent="center" alignItems="center">
            <Input c={c} type="text" name="name" label="Nom de l'oeuvre" required />
            <Input c={c} type="text" name="slug" label="Lien dans l'url" disabled required />
          </HStack>
          <HStack w="full" spacing={gap} justifyContent="center" alignItems="center">
            <Input c={c} type="textarea" name="description" label="Description" />
          </HStack>
          <HStack w="full" spacing={gap} justifyContent="center" alignItems="center">
            <Select c={c} isMulti label="Catégories" name="categories" options={categories} required/>
          </HStack>
        </VStack>
        <Flex justifyContent="space-between" mt={gap}>
          <Button type="submit" colorScheme="blue" isDisabled={!isValid} isLoading={isLoading}>
            {textSubmitButton}
          </Button>
          {children}
        </Flex>
      </form>
    </Box>
  );
};
