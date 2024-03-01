import React, { FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Avatar,
  Image,
} from "@chakra-ui/react";

interface ContentPreviewProps {
  multimediaUrl: string;
}

export const ContentPreview: FC<ContentPreviewProps> = ({ multimediaUrl }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Avatar cursor="pointer" src={multimediaUrl} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vista Previa</ModalHeader>
          <ModalBody>
            <Image alt="" src={multimediaUrl} />
          </ModalBody>

          <ModalFooter>
            <Button _focus={{}} flex="1" onClick={onClose}>
              Cerrar Vista Previa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
