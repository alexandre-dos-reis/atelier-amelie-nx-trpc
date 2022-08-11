import { trpc } from '../../utils/trpc';
import { routes } from '../../utils/routes';
import { Link as L } from 'react-router-dom';
import {
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
  Button,
  Flex,
  Heading,
  Box,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { searchBarTextAtom, showSearchBarAtom } from '../../store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Category } from '@prisma/client';
import { TagsCell, SwitchCell } from '../../components/table';
import { ArtworkTable } from '../../components/artworks/ArtworkTable';

export const ArtworksList = () => {
  const [searchBarText] = useAtom(searchBarTextAtom);

  const { data, isLoading, isError, error, isSuccess, isStale } = trpc.useQuery(['artwork.getAll']);

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <Flex justifyContent="space-between" bg="white" zIndex="banner" p="2" px="4">
        <Heading>Liste des oeuvres</Heading>
        <Button
          as={L}
          to={routes['artworks'].children?.['create'].url as string}
          colorScheme="blue"
        >
          Créer une oeuvre
        </Button>
      </Flex>
      {isLoading && <Progress size="md" isIndeterminate />}
      {isSuccess && data.artworks.length === 0 && <Box w='full' textAlign="center" m='7'>Il n'y a aucune oeuvres pour l'instant.</Box>}
      {isSuccess && data.artworks.length !== 0 && <ArtworkTable data={data.artworks} />}
    </>
  );
};
