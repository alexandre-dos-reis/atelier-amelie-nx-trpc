import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../../utils/routes';
import {
  Flex,
  Link as ChakraLink,
  useColorModeValue,
  Icon,
  FlexProps,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { AiFillStepBackward } from 'react-icons/ai';
import { FaChartLine, FaPalette, FaHome } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

import { IconType } from 'react-icons';

interface LinkItemProps {
  name: string;
  route: string;
  external: boolean;
  icon: IconType;
}

// interface LinkLabelProps {
//   label: string;
// }

const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Accueil',
    route: routes['home'].url,
    external: false,
    icon: FaHome,
  },
  {
    name: 'Retour vers le site',
    route: 'https://atelier-amelie.fr',
    external: true,
    icon: AiFillStepBackward,
  },
  {
    name: 'Statistiques',
    route: 'https://plausible.io/plausible.io',
    external: true,
    icon: FaChartLine,
  },
  // { label: 'Galerie' },
  {
    name: 'Oeuvres',
    route: routes['artworks'].url,
    external: false,
    icon: FaPalette,
  },
  { name: 'Catégories', route: routes['categories'].url, external: false, icon: MdCategory },
];

export const Navbar = () => {
  return (
    <GridItem
      area={'nav'}
      transition="3s ease"
      h={'100vh'}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Flex height="100" alignItems="center" mx="8" justifyContent="space-between">
        <ChakraLink
          as={Link}
          to={routes['home'].url}
          fontSize="2xl"
          fontFamily="cursive"
          textAlign="center"
          w="full"
          style={{ textDecoration: 'none' }}
        >
          AAA
        </ChakraLink>
      </Flex>
      {LinkItems.map((link, i) => (
        <NavItem key={i} {...link}>
          {link.name}
        </NavItem>
      ))}
    </GridItem>
  );
};

interface NavItemProps extends FlexProps {
  children: string;
  route: string;
  icon: IconType;
  external: boolean;
}
const NavItem = ({ children, route, icon, external, ...rest }: NavItemProps) => {
  const location = useLocation();

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
        p="2"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={location.pathname.endsWith(route) ? 'blue.400' : 'white'}
        // _hover={{
        //   bg: 'blue.400',
        //   color: 'white',
        // }}
        {...rest}
      >
        <Icon
          as={icon}
          boxSize="5"
          marginEnd="3"
          color={location.pathname.endsWith(route) ? 'white' : 'gray.600'}
        />
        <Text color={location.pathname.endsWith(route) ? 'white' : 'gray.600'}>{children}</Text>
      </Flex>
    </ChakraLink>
  );
};
