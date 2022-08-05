import { trpc } from '../utils/trpc';
import { useParams } from 'react-router-dom';
import { routes } from '../utils/routes';
import { Box, Button, HStack, useToast, VStack } from '@chakra-ui/react';
import slugify from 'slugify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateOneSchema } from '@atelier-amelie-nx-trpc/validation-schema';
import { z } from 'zod';
import {
  CustomInput as Input,
  CustomSelect as Select,
  CustomSwitch as Switch,
} from '../components/form';

export const ArtworkEdit2 = () => {
  // Params from router
  const params = useParams();

  // Trpc / React Query
  const { data, isLoading, isError, error } = trpc.useQuery([
    'artwork.getOne',
    parseInt(params[routes['artworks'].params?.['id'] as string] as string),
  ]);

  const categories = trpc.useQuery(['category.getAll']).data?.categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  // Toast
  const toast = useToast();

  const mutation = trpc.useMutation('artwork.updateOne', {
    onSuccess: (data) => {
      toast({
        title: 'Mise à jour réussie !',
        description: `L'oeuvre ${data.artwork.id} - ${data.artwork.name} a été mise à jour.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
    onError: (data, variables) => {
      toast({
        title: 'Erreur !',
        description: `L'oeuvre ${variables.id} - ${variables.name} n'a pas été mise à jour. Raison : ${data.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
  });

  // Form
  type FormSchema = z.infer<typeof updateOneSchema>;

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(updateOneSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (data) {
      reset({
        id: data.artwork.id,
        name: data.artwork.name,
        slug: data.artwork.slug,
        description: data.artwork.description,
        madeAt: data.artwork.madeAt,
        showInGallery: data.artwork.showInGallery,
        showInPortfolio: data.artwork.showInPortfolio,
        categories: data?.artwork.categories.map((c) => ({
          value: c.id,
          label: c.name,
        })),
      });
    }
  }, [data]);

  // Dropzone

  // UI
  const gap = 5;

  // React Query handlers...
  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log(errors);

  return (
    <Box bg={'whiteAlpha.000'} rounded={'sm'} px={7} mt={gap}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={gap}>
          <HStack w="full" spacing={gap} justifyContent="center" alignItems="center">
            <Input control={control} type="date" name="madeAt" label="Date de création" />
            <Switch control={control} name="showInGallery" label="Publier dans la galerie ?" />
            <Switch control={control} name="showInPortfolio" label="Publier dans le portfolio ?" />
          </HStack>
          <HStack w="full" spacing={gap} justifyContent="center" alignItems="center">
            <Input control={control} type="text" name="name" label="Nom de l'oeuvre" isRequired />
            <Input
              control={control}
              type="text"
              name="slug"
              label="Slug : lien dans l'url"
              isRequired
            />
          </HStack>
          <HStack w="full" spacing={gap} justifyContent="center" alignItems="center">
            <Input
              control={control}
              type="textarea"
              name="description"
              label="Description"
              isRequired
            />
            <Select
              control={control}
              isMulti
              label="Catégories"
              name="categories"
              options={categories}
            />
          </HStack>
        </VStack>
        <Button type="submit" colorScheme="blue" mt={gap} disabled={!isValid}>
          Mettre à jour
        </Button>
      </form>
    </Box>
  );
};
