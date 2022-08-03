import { useLocation } from 'react-router-dom';
import { Grid } from '@chakra-ui/react';
import { headingHeaderAtom, showHeadingHeaderAtom, showSearchBarAtom } from '../../store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Navbar } from './navbar/index';
import { routes } from '../../utils/routes';

export const Layout = () => {
  const location = useLocation();
  const [, setShowSearchBar] = useAtom(showSearchBarAtom);
  const [, setShowHeadingHeader] = useAtom(showHeadingHeaderAtom);
  const [, setHeadingHeader] = useAtom(headingHeaderAtom);

  useEffect(() => {
    if (location.pathname === routes['artworks'].url) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }

    if (location.pathname.includes(`${routes['artworks'].url}/`)) {
      setHeadingHeader('Modifier une oeuvre');
      setShowHeadingHeader(true);
    } else {
      setShowHeadingHeader(false);
      setHeadingHeader('');
    }
  }, [location]);

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
