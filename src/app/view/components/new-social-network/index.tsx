import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import { NewRedSocialForm } from "./form";
import { useMutation } from "@tanstack/react-query";
import { NewSocialNetworkFormValues } from "./schema";
import { axiosInstance } from "@/utils/axios-instance";
import { PlusCircle } from "react-feather";

async function registerSocialNetwork(values: NewSocialNetworkFormValues) {
  const token = localStorage.getItem("access-token");

  const response = await axiosInstance.post("/social-networks", values, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
}

export const NewSocialNetwork = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const mutation = useMutation({ mutationKey: ["registerSocialNetwork"], mutationFn: registerSocialNetwork });

  async function handleSubmit(values: NewSocialNetworkFormValues) {
    const { data } = await mutation.mutateAsync(values);

    if (data.status === 400)
      return toast({ title: data.message, status: "error", duration: 3000, isClosable: true, position: "top-right" });

    toast({ title: "Red social creada", status: "success", duration: 3000, isClosable: true, position: "top-right" });

    onClose();
  }

  return (
    <>
      <Button variant="outline" colorScheme="blue" onClick={onOpen}>
        <PlusCircle size="1.25rem" />
        <Text ml="2"> Conectar Cuenta</Text>
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Conectar Cuenta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewRedSocialForm onSubmit={handleSubmit} />
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={mutation.isPending}
              type="submit"
              form="new-social-network-form"
              colorScheme="blue"
              mr={3}
            >
              Guardar
            </Button>
            <Button isLoading={mutation.isPending} variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
