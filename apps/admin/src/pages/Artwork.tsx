import { trpc } from '../utils/trpc';
import { useParams } from 'react-router-dom';
import { routes } from '../utils/routes';
import Select from 'react-select';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Switch,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import slugify from 'slugify';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { LockIcon } from '@chakra-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateOneSchema } from '@atelier-amelie-nx-trpc/validation-schema';
import { z } from 'zod';
import { DropzoneComponent } from '../components/form/CustomDropzone';

export const ArtworkEdit = () => {
  // Params from router
  const params = useParams();

  // Toast
  const toast = useToast();

  // Trpc / React Query
  const { data, isLoading, isError, error } = trpc.useQuery([
    'artwork.getOne',
    parseInt(params[routes['artworks'].params?.['id'] as string] as string),
  ]);

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
    register,
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(updateOneSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    mutation.mutate(data);
  };

  // Dropzone

  // UI
  const gap = 5;

  // React Query handlers...
  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Box bg={'whiteAlpha.000'} rounded={'sm'} px={7}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack mt={gap}>
          {/* 1st row */}
          <HStack w="full" mt={gap} gap={gap} justifyContent="center" alignItems="center">
            <FormControl isInvalid={!!errors.madeAt}>
              <FormLabel>Date de création</FormLabel>
              <Input type="date" {...register('madeAt')} bg={'white'} />
              <FormErrorMessage>{errors.madeAt && errors?.madeAt.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.showInGallery}>
              <FormLabel htmlFor="publish-gallery">Publier dans la galerie ?</FormLabel>
              <Switch id="publish-gallery" {...register('showInGallery')} />
              <FormErrorMessage>
                {errors.showInGallery && errors?.showInGallery.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.showInPortfolio}>
              <FormLabel htmlFor="publish-portfolio">Publier dans le portfolio ?</FormLabel>
              <Switch id="publish-portfolio" {...register('showInPortfolio')} />
              <FormErrorMessage>
                {errors.showInPortfolio && errors?.showInPortfolio.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>
          {/* 2nd row */}
          <HStack w="full" gap={gap}>
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel mt={gap}>Nom</FormLabel>
              <Input
                type="text"
                {...register('name')}
                bg={'white'}
                onChange={(e) => setValue('slug', slugify(e.target.value, { lower: true }))}
              />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.slug}>
              <FormLabel mt={gap}>Slug</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.300" />} />
                <Input type="text" disabled {...register('slug')} bg={'white'} />
              </InputGroup>
              <FormErrorMessage>{errors.slug && errors?.slug.message}</FormErrorMessage>
            </FormControl>
          </HStack>
          {/* 3rd row */}
          <HStack w="full" mt={gap} gap={gap} justifyContent="center" alignItems="center">
            <FormControl isInvalid={!!errors.description}>
              <FormLabel mt={gap}>Description</FormLabel>
              <Textarea {...register('description')} bg={'white'} size="sm" />
              <FormErrorMessage>
                {errors.description && errors?.description.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.categories}>
              <FormLabel mt={gap}>Catégories</FormLabel>
              <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={trpc.useQuery(['category.getAll']).data?.categories.map((c) => ({
                      value: c.id,
                      label: c.name,
                    }))}
                  />
                )}
              />
              <FormErrorMessage>{errors.categories && errors.categories?.message}</FormErrorMessage>
            </FormControl>
          </HStack>
          {/* <HStack w="full" mt={gap} gap={gap} justifyContent="center" alignItems="center"> */}
          {/* 4th row start */}
          {/* <DropzoneComponent /> */}
          {/* </HStack> */}
        </VStack>
        <Button type="submit" colorScheme="blue" mt={gap}>
          Mettre à jour
        </Button>
      </form>
    </Box>
  );
};
