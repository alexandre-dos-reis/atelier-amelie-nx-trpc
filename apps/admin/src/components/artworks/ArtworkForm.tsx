import { Box, Button, Flex, HStack, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { trpc } from '../../utils/trpc';
import {
  CustomInput as Input,
  CustomSelect as Select,
  CustomSwitch as Switch,
  CustomDatePicker as DatePicker,
} from '../form';
import {
  updateOrCreateOneSchema,
  updateOrCreateOneSchemaType,
} from '@atelier-amelie-nx-trpc/validation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ArtworkFormProps {
  children?: ReactNode;
  artwork: updateOrCreateOneSchemaType;
  onSubmit: SubmitHandler<updateOrCreateOneSchemaType>;
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
    formState: { isValid },
  } = useForm<updateOrCreateOneSchemaType>({
    resolver: zodResolver(updateOrCreateOneSchema),
    defaultValues: artwork,
    mode: 'onChange',
  });

  // UI
  const gap = 5;

  // Categories options
  const categories = trpc.useQuery(['category.getAll']).data?.categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <Box bg={'whiteAlpha.000'} rounded={'sm'} px={7} mt={gap}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={gap}>
          <HStack w="full" spacing={gap} justifyContent="center" alignItems="center">
            <DatePicker c={c} name="madeAt" label="Date de création" />
            <Switch c={c} name="showInGallery" label="Publier dans la galerie ?" />
            <Switch c={c} name="showInPortfolio" label="Publier dans le portfolio ?" />
          </HStack>
          <HStack w="full" spacing={gap} justifyContent="center" alignItems="center">
            <Input c={c} type="text" name="name" label="Nom de l'oeuvre" />
            <Input c={c} type="text" name="slug" label="Lien dans l'url" />
          </HStack>
          <HStack w="full" spacing={gap} justifyContent="center" alignItems="center">
            <Input c={c} type="textarea" name="description" label="Description" />
            <Select c={c} isMulti label="Catégories" name="categories" options={categories} />
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
