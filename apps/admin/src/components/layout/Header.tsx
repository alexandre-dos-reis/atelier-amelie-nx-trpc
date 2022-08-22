import { GridItem, Grid, Heading } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ProfileStatus } from '../profile-status';
import { SearchBar } from '../search-bar';

export const Header = () => {

  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <GridItem area={'header'} ref={animationParent}>
      <Grid h={'full'} templateColumns="3fr 1fr">
        <GridItem
          w="100%"
          h="100px"
          display="flex"
          justifyContent={'center'}
          alignItems="center"
          p={5}
        >
          {/* {showSearchBar && <SearchBar />}
          {showHeadingHeader && (
            <Heading as={'h1'} size="lg">
              {headingHeader}
            </Heading>
          )} */}
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
