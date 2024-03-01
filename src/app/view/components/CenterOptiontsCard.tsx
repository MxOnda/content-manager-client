import React from "react";

import { Button, Card, CardBody, HStack, Input, Text } from "@chakra-ui/react";
import { NewSocialNetwork } from "./new-social-network";
import { NewContentComponent } from "./new-content";
export const CenterOptiontsCard = () => {
  return (
    <Card border="1px" borderColor="gray.200">
      <CardBody>
        <HStack>
          <NewContentComponent />
          <NewSocialNetwork />
        </HStack>
      </CardBody>
    </Card>
  );
};
