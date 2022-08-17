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

interface DeleteBtnProps {
  label?: string;
  onConfirm: () => void;
}

export const DeleteBtn = ({ label = 'Supprimer', onConfirm }: DeleteBtnProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>{label}</Button>

      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              You can scroll the content behind the modal
            </Text>
            blabla...
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button variant="ghost" onClick={onConfirm}>
              Confirmer la suppresion
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
