"use client";
import React, { FC } from "react";

import { Button, ListItem, Text, Box, Flex, HStack, Avatar, useToast } from "@chakra-ui/react";
import { axiosInstance } from "@/utils/axios-instance";
import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

interface MySocialNetworkItemProps {
  socialNetworkInfo: any;
  onSocialNetworkDeleted: () => void;
}

async function deleteSocialNetwork(socialNetworkId: string) {
  try {
    const response = await axiosInstance.delete(`/social-networks/${socialNetworkId}`);

    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.response?.data;
    }
  }
}

export const MySocialNetworkItem: FC<MySocialNetworkItemProps> = ({ socialNetworkInfo, onSocialNetworkDeleted }) => {
  const toast = useToast();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteSocialNetwork,
  });

  async function hanndleClick() {
    const response = await mutateAsync(socialNetworkInfo.id, {});

    toast({
      title: "Red social eliminada",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });

    onSocialNetworkDeleted();
  }

  return (
    <div>
      <ListItem p="3">
        <Flex justifyContent="space-between">
          <HStack>
            <Avatar src={socialNetworkInfo.profile.avatarUrl} />
            <Box>
              <Text fontWeight="semibold">{socialNetworkInfo.socialNetwork}</Text>
              <Text fontSize="sm" fontWeight="medium">
                {socialNetworkInfo.profile.fullname || "Nombre no registrado"}
              </Text>
            </Box>
          </HStack>
          <HStack>
            <Button size="sm" colorScheme="red" onClick={hanndleClick} isLoading={isPending}>
              Eliminar
            </Button>
          </HStack>
        </Flex>
      </ListItem>
    </div>
  );
};
