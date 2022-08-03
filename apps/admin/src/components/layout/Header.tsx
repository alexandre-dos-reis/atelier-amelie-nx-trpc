import { GridItem, Grid, Heading } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { headingHeaderAtom, showHeadingHeaderAtom, showSearchBarAtom } from '../../store';
import { ProfileStatus } from '../profile-status';
import { SearchBar } from '../search-bar';


export const Header = () => {
  const [showSearchBar] = useAtom(showSearchBarAtom);
  const [showHeadingHeader] = useAtom(showHeadingHeaderAtom);
  const [headingHeader] = useAtom(headingHeaderAtom);

  return (
    <GridItem area={'header'}>
      <Grid h={'full'} templateColumns="3fr 1fr">
        <GridItem
          w="100%"
          h="100px"
          display="flex"
          justifyContent={showHeadingHeader ? 'left' : 'center'}
          alignItems="center"
          p={5}
        >
          {showSearchBar && <SearchBar />}
          {showHeadingHeader && (
            <Heading as={'h1'} size="lg" >
              {headingHeader}
            </Heading>
          )}
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
