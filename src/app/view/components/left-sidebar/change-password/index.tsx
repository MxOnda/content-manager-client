"use client";
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
  ListItem,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import { ChangePasswordForm } from "./form";
import { ChangePasswordFormValues } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios-instance";
import { AxiosError } from "axios";
import { Key } from "react-feather";

async function changePassword(data: ChangePasswordFormValues) {
  const token = localStorage.getItem("access-token");

  try {
    const response = await axiosInstance.post("/auth/change-password", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response.data);
  } catch (err) {
    if (err instanceof AxiosError) {
      return { error: err.response?.data, status: err.response?.status };
    }
  }
}

export const ChangePassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useMutation({ mutationFn: changePassword });

  const toast = useToast();

  async function handleSubmit(data: ChangePasswordFormValues) {
    const response = await mutation.mutateAsync(data);

    if (response?.status && ![200, 201].includes(response?.status || 0)) {
      toast({
        title: "Error",
        description: response?.error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      return;
    }

    toast({
      title: "Contraseña Cambiada",
      description: "Tu contraseña ha sido cambiada con éxito",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    onClose();
  }

  return (
    <>
      <ListItem onClick={onOpen}>
        <Button w="full" colorScheme="blue">
          <Key size="1.25rem" />
          <Text ml="2">Cambiar Contraseña</Text>
        </Button>
      </ListItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cambia tu contraseña</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChangePasswordForm onSubmit={handleSubmit} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancealr
            </Button>
            <Button type="submit" form="change-password-form" variant="ghost">
              Guardar Cambios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
