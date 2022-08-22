import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

export const SearchBar = () => {
  return (
    <Box width="full">
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input type="text" placeholder="Rechercher..." onChange={(e) => console.log(e.target.value)} />
      </InputGroup>
    </Box>
  );
};
