import { GridItem, Grid } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { showSearchBarAtom } from '../../store';
import { ProfileStatus } from '../profile-status';
import { SearchBar } from '../search-bar';

export const Header = () => {
  const [showSearchBar] = useAtom(showSearchBarAtom);

  return (
    <GridItem area={'header'}>
      <Grid h={'full'} templateColumns="3fr 1fr">
        <GridItem
          w="100%"
          h="100px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={5}
        >
          {showSearchBar && <SearchBar />}
        </GridItem>
        <GridItem
          w="100%"
          h="100px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={5}
        >
          <ProfileStatus />
        </GridItem>
      </Grid>
    </GridItem>
  );
};
