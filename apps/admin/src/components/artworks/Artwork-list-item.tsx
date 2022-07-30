import { Artwork } from '@prisma/client';
import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { Link as L } from 'react-router-dom';
import { routes } from '../../utils/routes';

interface IListItemArtwork {
  a: Artwork;
}

export const ArtworkListItem = ({ a }: IListItemArtwork) => {
  return (
    <Link
      style={{ textDecoration: 'none' }}
      as={L}
      to={`${routes['artworks'].url}/${a.id}`}
      key={a.id}
      bg={'white'}
    >
      <Box
        _hover={{
          color: 'teal.500',
        }}
        p={5}
        shadow="md"
        borderWidth="1px"
      >
        <Heading fontSize="xl">{a.name}</Heading>
        <Text mt={4}>{a.description}</Text>
      </Box>
    </Link>
  );
};
