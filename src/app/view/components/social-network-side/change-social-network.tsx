import React from "react";

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { axiosInstance } from "@/utils/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { ChangeSocialNetworkItem } from "./change-social-network-item";

async function getSocialNetworks() {
  const response = await axiosInstance.get("/social-networks/users/bf44194d-309b-4b04-ad60-2c63fa295fae");

  return response.data?.data;
}

export const ChangeSocialNetwork = () => {
  const { data } = useQuery({ queryKey: ["socialNetworks"], queryFn: getSocialNetworks });

  return (
    <Menu>
      <MenuButton as={Button}>Cambiar de Cuenta</MenuButton>
      <MenuList>
        {data?.socialNetworks.map((socialNetwork: any, index: number) => (
          <ChangeSocialNetworkItem socialNetwork={socialNetwork} key={index} />
        ))}
      </MenuList>
    </Menu>
  );
};
