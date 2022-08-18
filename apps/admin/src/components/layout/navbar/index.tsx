import { Link, useLocation } from 'react-router-dom';
import { findRoute } from '../../../utils/find-route';
import {
  Flex,
  Link as ChakraLink,
  useColorModeValue,
  Icon,
  FlexProps,
  GridItem,
  Text,
  HeadingProps,
  Heading,
} from '@chakra-ui/react';
import { AiFillStepBackward } from 'react-icons/ai';
import {
  FaChartLine,
  FaPalette,
  FaHome,
  FaGift,
  FaRegImage,
  FaTags,
  FaTag,
  FaShoppingCart,
  FaTruck,
  FaCog,
  FaEuroSign,
} from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { IconType } from 'react-icons';

export const Navbar = () => {
  return (
    <GridItem
      area={'nav'}
      transition="3s ease"
      h={'100vh'}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      overflowY="auto"
    >
      <Flex height="100" alignItems="center" mx="8" justifyContent="space-between">
        <ChakraLink
          as={Link}
          to={findRoute('home')}
          fontSize="2xl"
          fontFamily="cursive"
          textAlign="center"
          w="full"
          style={{ textDecoration: 'none' }}
        >
          A.A.A.
        </ChakraLink>
      </Flex>

      <NavItem label="Accueil" icon={FaHome} route={findRoute('home')} />
      <NavItem
        label="Retour vers le site"
        icon={AiFillStepBackward}
        route="https://atelier-amelie.fr"
        external
      />

      <NavItem
        label="Statistiques"
        icon={FaChartLine}
        route="https://plausible.io/plausible.io"
        external
      />

      <NavLabel label="GALERIE" />
      <NavItem label="Oeuvres" icon={FaPalette} route={findRoute('artworks')} />
      <NavItem label="Catégories" icon={MdCategory} route={findRoute('categories')} />

      <NavLabel label="BOUTIQUE" />
      <NavItem label="Produits" icon={FaGift} route={findRoute('shop.products')} />
      <NavItem label="Images" icon={FaRegImage} route={findRoute('shop.products.images')} />
      <NavItem label="Sous-catégories" icon={FaTags} route={findRoute('shop.sub-categories')} />
      <NavItem label="Catégories" icon={FaTag} route={findRoute('shop.categories')} />

      <NavLabel label="VENTES" />
      <NavItem label="Commandes" icon={FaShoppingCart} route={findRoute('purchases')} />
      <NavItem
        label="Paiments Stripe"
        icon={FaEuroSign}
        route="https://dashboard.stripe.com/test/payments?status%5B%5D=successful"
        external
      />

      <NavLabel label="PARAMÈTRES" />
      <NavItem label="Frais de port" icon={FaTruck} route={findRoute('settings.shipping-cost')} />
      <NavItem label="Configuration" icon={FaCog} route={findRoute('settings.config')} />
    </GridItem>
  );
};

interface NavItemProps extends FlexProps {
  label: string;
  route: string;
  icon: IconType;
  external?: boolean;
}
const NavItem = ({ label, route, icon, external = false, ...rest }: NavItemProps) => {
  const { pathname } = useLocation();

  return (
    <ChakraLink
      to={external ? '' : route}
      as={external ? undefined : Link}
      href={external ? route : ''}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="1.5"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontSize="sm"
        // bg={location.pathname.endsWith(route) ? 'blue.400' : 'white'}
        {...rest}
      >
        <Icon
          as={icon}
          boxSize="5"
          marginEnd="3"
          color={pathname === route ? 'blue.400' : 'gray.600'}
        />
        <Text color={pathname === route ? 'blue.400' : 'gray.600'}>{label}</Text>
      </Flex>
    </ChakraLink>
  );
};

interface NavLabelProps extends HeadingProps {
  label: string;
}
const NavLabel = ({ label }: NavLabelProps) => (
  <Heading as="h2" size="xs" color="gray.400" p="1.5" mx="4" marginTop="4">
    {label}
  </Heading>
);
