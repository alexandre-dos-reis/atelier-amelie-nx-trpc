import { useLocation } from 'react-router-dom';
import { Grid } from '@chakra-ui/react';
import { headingHeaderAtom, showHeadingHeaderAtom, showSearchBarAtom } from '../../store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Navbar } from './navbar/index';
import { findRoute } from '../../utils/find-route';

export const Layout = () => {
  const location = useLocation();
  const [, setShowSearchBar] = useAtom(showSearchBarAtom);
  const [, setShowHeadingHeader] = useAtom(showHeadingHeaderAtom);
  const [, setHeadingHeader] = useAtom(headingHeaderAtom);

  useEffect(() => {
    if (location.pathname === findRoute('artworks')) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }

    if (location.pathname.includes(`${findRoute('artworks')}/`)) {
      setHeadingHeader('Modifier une oeuvre');
      setShowHeadingHeader(true);
    } else if (location.pathname === findRoute('artworks.create')) {
      setHeadingHeader('Créer une oeuvre');
      setShowHeadingHeader(true);
    } else {
      setHeadingHeader('');
      setShowHeadingHeader(false);
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
