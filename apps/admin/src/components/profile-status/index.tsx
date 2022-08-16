import { ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

export const ProfileStatus = () => {
  return (
    <Box display="flex" w="full" justifyContent="space-evenly" alignItems="center" zIndex="overlay">
      <Menu>
        <MenuButton as={Button} bg="transparent" rightIcon={<ChevronDownIcon />}>
          amelie.gille@yahoo.fr
        </MenuButton>
        {/* <Avatar name="Amélie Gille" src="" /> */}
        <MenuList>
          <MenuItem>Réglages</MenuItem>
          <MenuItem>Se déconnecter</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
