import { trpc } from '../utils/trpc';
import { useParams } from 'react-router-dom';
import { routes } from '../utils/routes';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Switch,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Artwork } from '@prisma/client';
import slugify from 'slugify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';

export const ArtworkEdit = () => {
  // Params from router
  const params = useParams();

  // Fetching data...
  const { data, isLoading, isError, error } = trpc.useQuery([
    'artwork.getOne',
    parseInt(params[routes['artworks'].params?.['id'] as string] as string),
  ]);

  const { register, reset, handleSubmit } = useForm<Artwork>();

  useEffect(() => {
    reset({
      ...data?.artwork,
    });
  }, [data, reset]);

  if (isError) return <div>{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  const gap = 5;

  const onSubmit: SubmitHandler<Artwork> = (data) => console.log(data);

  return (
    <Box bg={'whiteAlpha.500'} rounded={'sm'} p={7}>
      <Heading as={'h1'} size="lg">
        Modifier une oeuvre
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack mt={gap}>
          <HStack w="full" mt={gap} gap={gap} justifyContent="center" alignItems="center">
            <FormControl>
              <FormLabel>Date de création</FormLabel>
              <Input type="date" {...register('madeAt.toDateString')} bg={'white'} />
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
              <Input type="text" {...register('name')} bg={'white'} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel mt={gap}>Slug</FormLabel>
              <Input type="text" {...register('slug')} bg={'white'} />
            </FormControl>
          </HStack>

          <FormControl isRequired>
            <FormLabel mt={gap}>Description</FormLabel>
            <Textarea {...register('description')} bg={'white'} />
          </FormControl>
        </VStack>
        <Button type='submit' colorScheme='blue' mt={gap}>Mettre à jour</Button>
      </form>
    </Box>
  );
};
