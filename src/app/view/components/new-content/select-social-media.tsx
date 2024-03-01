import React from "react";

import { Tag, Menu, MenuButton, MenuList, MenuItem, Button, Stack } from "@chakra-ui/react";
import { axiosInstance } from "@/utils/axios-instance";
import { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useController } from "react-hook-form";

export async function retrieveSocialNetworks() {
  const userInfo = JSON.parse(localStorage.getItem("current-user") || "{}");

  try {
    const response = await axiosInstance.get(`/users/${userInfo.id}/social-networks`);

    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.response?.data;
    }
  }
}

export const SelectSocialMedia = () => {
  const { data, isPending } = useQuery({ queryKey: ["social-networks"], queryFn: retrieveSocialNetworks });

  const { field } = useController({ name: "socialNetworkId" });

  const socialNetwork = data?.data.find((socialNetwork: any) => socialNetwork.id === field.value);

  return (
    <Stack>
      <Menu>
        <MenuButton w="full" as={Button} isLoading={isPending}>
          Selecciona una red social
        </MenuButton>
        <MenuList>
          {data?.data.map((socialNetwork: any) => (
            <MenuItem
              key={socialNetwork.id}
              minH="48px"
              onClick={() => {
                field.onChange(socialNetwork.id);
              }}
            >
              <span>
                {socialNetwork.socialNetwork} - {socialNetwork.profile.fullname || "Sin nombre"}
              </span>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Tag
        variant="solid"
        colorScheme={socialNetwork?.socialNetwork === "Instagram" ? "green" : "red"}
        justifyContent="center"
      >
        {socialNetwork?.socialNetwork} - {socialNetwork?.profile.fullname}
      </Tag>
    </Stack>
  );
};
