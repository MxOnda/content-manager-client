import React from "react";

import { signoutAction } from "@/actions/signout";
import { Button, Text } from "@chakra-ui/react";
import { LogOut } from "react-feather";

export const Signout = () => {
  async function handleSubmit() {
    const response = await signoutAction();

    if (response) {
      window.location.href = "/signin";
    }
  }

  return (
    <Button colorScheme="red" onClick={handleSubmit}>
      <LogOut size="1.25rem" />
      <Text ml="2">Cerrar Sesión</Text>
    </Button>
  );
};
