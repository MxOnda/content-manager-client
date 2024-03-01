import React, { Fragment } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ListItem,
  Text,
  useDisclosure,
  List,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios-instance";
import { isAxiosError } from "axios";
import { MySocialNetworkItem } from "./item";
import { UserPlus } from "react-feather";

async function retrieveMySocialNetworks() {
  const currentUser = JSON.parse(localStorage.getItem("current-user") || "{}");

  const { id } = currentUser;

  try {
    const response = await axiosInstance.get(`/users/${id}/social-networks`);

    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.response?.data;
    }
  }
}

export const MySocialNetworks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, refetch } = useQuery({
    queryKey: ["my-social-networks"],
    queryFn: retrieveMySocialNetworks,
  });

  return (
    <>
      <ListItem onClick={onOpen}>
        <Button colorScheme="green" w="full">
          <UserPlus size="1.25rem" />
          <Text ml="2">Gestión de cuentas</Text>
        </Button>
      </ListItem>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Gestión de cuentas ({data?.data?.length})</ModalHeader>
          <ModalBody>
            <Box>
              <List border="1px" borderColor="gray.200" rounded="sm">
                {data?.data.length === 0 && (
                  <ListItem p="3">
                    <Text textAlign="center" fontWeight="semibold">
                      No hay cuentas registradas
                    </Text>
                  </ListItem>
                )}
                {data?.data.map((socialNetwork: any, index: number) => (
                  <Fragment key={socialNetwork}>
                    {index !== 0 && <Box borderBottom="1px" borderColor="gray.200" />}
                    <MySocialNetworkItem
                      socialNetworkInfo={socialNetwork}
                      onSocialNetworkDeleted={() => {
                        refetch();
                      }}
                    />
                  </Fragment>
                ))}
              </List>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button w="full" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
