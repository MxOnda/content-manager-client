import React from "react";

import { Card, CardBody, List } from "@chakra-ui/react";
import { ChangePassword } from "./change-password";
import { Signout } from "./signout";
import { MySocialNetworks } from "./my-social-networks";
export const LeftSidebar = () => {
  return (
    <Card h="full">
      <CardBody p="4">
        <List spacing="4" flexDirection="column" display="flex" h="full">
          <MySocialNetworks />
          <ChangePassword />
          <Signout />
        </List>
      </CardBody>
    </Card>
  );
};
