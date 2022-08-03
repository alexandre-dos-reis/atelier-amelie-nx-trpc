import { trpc } from '../utils/trpc';
import { useParams } from 'react-router-dom';
import { routes } from '../utils/routes';
import Select from 'react-select';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Switch,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import slugify from 'slugify';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { LockIcon } from '@chakra-ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { updateOneSchema } from '@atelier-amelie-nx-trpc/validation-schema';
import { z } from 'zod';

export const ArtworkEdit = () => {
  // Params from router
  const params = useParams();

  // Fetching data...
  const { data, isLoading, isError, error } = trpc.useQuery([
    'artwork.getOne',
    parseInt(params[routes['artworks'].params?.['id'] as string] as string),
  ]);

  const mutation = trpc.useMutation('artwork.updateOne');

  type FormSchema = z.infer<typeof updateOneSchema>;

  const { register, reset, control, handleSubmit, setValue } = useForm<FormSchema>({
    resolver: zodResolver(updateOneSchema),
  });

  useEffect(() => {
    reset({
      ...data?.artwork,
      categories: data?.artwork.categories.map((c) => ({
        value: c.id,
        label: c.name,
      })),
    });
  }, [data, reset]);

  // const onDrop = useCallback((acceptedFiles: any) => {
  //   console.log(acceptedFiles);
  // }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const gap = 5;

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    mutation.mutate(data);
  };

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Box bg={'whiteAlpha.000'} rounded={'sm'} px={7}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack mt={gap}>
          <HStack w="full" mt={gap} gap={gap} justifyContent="center" alignItems="center">
            <FormControl>
              <FormLabel>Date de création</FormLabel>
              <Input type="date" {...register('madeAt')} bg={'white'} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="publish-gallery">Publier dans la galerie ?</FormLabel>
              <Switch id="publish-gallery" {...register('showInGallery')} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="publish-portfolio">Publier dans le portfolio ?</FormLabel>
              <Switch id="publish-portfolio" {...register('showInPortfolio')} />
            </FormControl>
          </HStack>

          <HStack w="full" gap={gap}>
            <FormControl isRequired>
              <FormLabel mt={gap}>Nom</FormLabel>
              <Input
                type="text"
                {...register('name')}
                bg={'white'}
                onChange={(e) => setValue('slug', slugify(e.target.value, { lower: true }))}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel mt={gap}>Slug</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.300" />} />
                <Input type="text" disabled {...register('slug')} bg={'white'} />
              </InputGroup>
            </FormControl>
          </HStack>

          <HStack w="full" mt={gap} gap={gap} justifyContent="center" alignItems="center">
            <FormControl isRequired>
              <FormLabel mt={gap}>Description</FormLabel>
              <Textarea {...register('description')} bg={'white'} size="sm" />
            </FormControl>

            <FormControl isRequired>
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
            </FormControl>
          </HStack>
        </VStack>
        {/* <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div> */}
        <Button type="submit" colorScheme="blue" mt={gap}>
          Mettre à jour
        </Button>
      </form>
    </Box>
  );
};
