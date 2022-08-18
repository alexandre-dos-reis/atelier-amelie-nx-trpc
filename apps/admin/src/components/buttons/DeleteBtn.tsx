import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  ModalFooter,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface DeleteBtnProps {
  label?: string;
  onConfirm: () => void;
  children: ReactNode;
}

export const DeleteBtn = ({ label = 'Supprimer', onConfirm, children }: DeleteBtnProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="red">
        {label}
        <DeleteIcon marginStart="3" />
      </Button>

      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer la suppression</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1rem">{children}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button variant="solid" colorScheme="red" onClick={onConfirm}>
              Confirmer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
