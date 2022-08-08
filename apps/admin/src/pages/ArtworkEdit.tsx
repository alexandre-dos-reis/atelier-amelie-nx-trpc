import { trpc } from '../utils/trpc';
import { useParams } from 'react-router-dom';
import { routes } from '../utils/routes';
import { Box, Button, HStack, Progress, Skeleton, Spinner, Stack, useToast, VStack } from '@chakra-ui/react';
import slugify from 'slugify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateOrCreateOneSchema } from '@atelier-amelie-nx-trpc/validation-schema';
import { z } from 'zod';
import {
  CustomInput as Input,
  CustomSelect as Select,
  CustomSwitch as Switch,
  CustomDatePicker as DatePicker,
} from '../components/form';

export const ArtworkEdit = () => {
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
  type FormSchema = z.infer<typeof updateOrCreateOneSchema>;

  const {
    reset,
    control: c,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(updateOrCreateOneSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (data) {
      reset({
        ...data.artwork,
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
  if (isLoading) return <Progress size="md" isIndeterminate />;

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
        <Button
          type="submit"
          colorScheme="blue"
          mt={gap}
          isDisabled={!isValid}
          isLoading={mutation.isLoading}
        >
          Mettre à jour
        </Button>
      </form>
    </Box>
  );
};
