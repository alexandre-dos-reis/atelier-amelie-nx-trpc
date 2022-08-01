import { useAtom } from 'jotai';
import { showSearchBarAtom } from '../store';
import { Box, Text } from '@chakra-ui/react';

export const Home = () => {
  const [, setShowSearchBar] = useAtom(showSearchBarAtom);
  setShowSearchBar(false);

  return (
    <Box p="2" mt='2'>
      <Text textAlign='center'>Bienvenue dans l'espace d'administration de l'Atelier d'Amélie.</Text>
    </Box>
  );
};
