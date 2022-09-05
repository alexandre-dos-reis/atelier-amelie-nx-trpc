import { Box, Flex, VStack } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { CustomInput as Input, CustomSwitch as Switch } from 'components/form';
import { category as schema } from '@atelier-amelie-nx-trpc/validation-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import slugify from 'slugify';
import { BackBtn, SubmitBtn } from 'components/buttons';

interface CategoryFormProps {
  children?: ReactNode;
  category: schema.updateOrCreateOneSchemaType;
  onSubmit: SubmitHandler<schema.updateOrCreateOneSchemaType>;
  textSubmitButton: string;
  isLoading?: boolean;
}

export const CategoryForm = ({
  category,
  onSubmit,
  textSubmitButton,
  isLoading = false,
  children,
}: CategoryFormProps) => {
  // Form
  const {
    control: c,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, isDirty },
  } = useForm<schema.updateOrCreateOneSchemaType>({
    resolver: zodResolver(schema.updateOrCreateOneSchema),
    defaultValues: category,
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

  return (
    <Box bg={'whiteAlpha.000'} rounded={'sm'} px={7} mt={gap}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <VStack spacing={gap}>
          <Flex w="full" gap={gap} justify="center">
            <Input c={c} type="text" name="name" label="Nom de la catégorie" required />
            <Input
              c={c}
              type="text"
              name="slug"
              label="Lien dans l'url"
              disabled
              required
              isLocked={isLocked}
              setIsLocked={setIsLocked}
            />
            <Switch c={c} name="showInGallery" label="Publier dans la galerie ?" />
          </Flex>
          <Flex w="full" gap={gap} justify="center">
            <Input c={c} type="textarea" name="description" label="Description" />
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
