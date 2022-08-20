import { Grid } from '@chakra-ui/react';
import { Header } from './Header';
import { Main } from './Main';
import { Navbar } from './Navbar';

export const Layout = () => {
  return (
    <Grid
      maxW="full"
      h="100vh"
      templateAreas={`"nav header"
                      "nav main"`}
      gridTemplateRows={'1fr 9fr'}
      gridTemplateColumns={'1fr 5fr'}
      overflowY={'hidden'}
    >
      <Navbar />
      <Header />
      <Main />
    </Grid>
  );
};
