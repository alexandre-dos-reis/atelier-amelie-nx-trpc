import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { searchBarTextAtom } from '../../store';

export const SearchBar = () => {
  const [, setText] = useAtom(searchBarTextAtom);

  return (
    <Box width="full">
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input type="text" placeholder="Rechercher..." onChange={(e) => setText(e.target.value)} />
      </InputGroup>
    </Box>
  );
};
