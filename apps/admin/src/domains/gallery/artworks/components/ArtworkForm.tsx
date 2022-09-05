import { Box, Flex, VStack } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { trpc, findRoute } from 'utils';
import {
  CustomInput as Input,
  CustomSelect as Select,
  CustomSwitch as Switch,
  CustomDatePicker as DatePicker,
  CustomDropzone2 as Dropzone,
} from 'components/form';
import { artwork as schema } from '@atelier-amelie-nx-trpc/validation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import slugify from 'slugify';
import { BackBtn, SubmitBtn } from 'components/buttons';

interface ArtworkFormProps {
  children?: ReactNode;
  bottomChildren?: ReactNode;
  topChildren?: ReactNode;
  artwork: schema.updateOrCreateOneSchemaType;
  onSubmit: SubmitHandler<schema.updateOrCreateOneSchemaType>;
  textSubmitButton: string;
  isLoading: boolean;
}

export const ArtworkForm = ({
  artwork,
  onSubmit,
  textSubmitButton,
  isLoading,
  children,
  topChildren,
  bottomChildren,
}: ArtworkFormProps) => {
  // Form
  const {
    control: c,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, isDirty },
  } = useForm<schema.updateOrCreateOneSchemaType>({
    resolver: zodResolver(schema.updateOrCreateOneSchema),
    defaultValues: artwork,
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

  // Categories options
  const categories = trpc.useQuery(['artwork.getCategoriesForSelect']).data?.categories;

  return (
    <Box bg={'whiteAlpha.000'} rounded={'sm'} px={7} mt={gap}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <VStack spacing={gap}>
          <Flex w="full" gap={gap} justify="center">
            <DatePicker c={c} name="madeAt" label="Date de création" />
            <Switch c={c} name="showInGallery" label="Publier dans la galerie ?" />
            <Switch c={c} name="showInPortfolio" label="Publier dans le portfolio ?" />
          </Flex>
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
            <Input c={c} type="textarea" name="description" label="Description" />
          </Flex>
          <Flex w="full" gap={gap} justify="center">
            <Select
              c={c}
              isMulti
              label="Catégories"
              name="categories"
              options={categories}
              required
            />
          </Flex>
          <Flex w="full" gap={gap} justify="center">
            <Dropzone c={c} name="file" />
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
      <Flex mt={gap + 5} justify="space-between">
        {bottomChildren}
      </Flex>
    </Box>
  );
};
