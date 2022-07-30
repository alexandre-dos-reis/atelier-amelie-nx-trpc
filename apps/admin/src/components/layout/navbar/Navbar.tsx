import { Link, To } from 'react-router-dom';
import { routes } from '../../../utils/routes';
import {
  Box,
  Flex,
  Link as ChakraLink,
  Text,
  CloseButton,
  useColorModeValue,
  Icon,
  FlexProps,
  GridItem,
} from '@chakra-ui/react';

interface LinkItemProps {
  name: string;
  route: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Accueil', route: routes['home'].url },
  { name: 'Oeuvres', route: routes['artworks'].url },
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
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Admin
        </Text>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} route={link.route}>
          {link.name}
        </NavItem>
      ))}
    </GridItem>
  );
};

interface NavItemProps extends FlexProps {
  children: string;
  route: string;
}
const NavItem = ({ children, route, ...rest }: NavItemProps) => {
  return (
    <ChakraLink
      to={route}
      as={Link}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {children}
      </Flex>
    </ChakraLink>
  );
};
