import { axiosInstance } from "@/utils/axios-instance";
import { MenuItem } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";

interface ChangeSocialNetworkItemProps {
  socialNetwork: any;
}

async function retrieveSocialNetwork() {}

export const ChangeSocialNetworkItem: FC<ChangeSocialNetworkItemProps> = ({ socialNetwork }) => {
  const { data } = useQuery({
    queryKey: ["socialNetwork", socialNetwork.identifier],
    enabled: false,
  });

  async function handleClick() {
    console.log(socialNetwork);
  }

  return (
    <MenuItem onClick={handleClick}>
      {socialNetwork.socialNetwork} - {socialNetwork.identifier}
    </MenuItem>
  );
};
