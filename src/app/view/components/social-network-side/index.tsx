import React from "react";

import { Avatar, Box, Card, CardBody, Stack, Text, VStack } from "@chakra-ui/react";

export const SocialNetworkSide = () => {
  return (
    <Stack>
      <Card display="none" h="full" border="1px" borderColor="gray.200">
        <CardBody p="4">
          <VStack spacing="4">
            <Avatar
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              size="xl"
            />
            <VStack textAlign="center">
              <Box>
                <Text color="gray.500">Nombre de Usuario</Text>
                <Text fontSize="lg" fontWeight="semibold">
                  @erickson01d
                </Text>
              </Box>
              <Box>
                <Text color="gray.500">Dirección de Correo Electrónico</Text>
                <Text fontSize="lg" fontWeight="semibold">
                  erickson01d@gmail.com
                </Text>
              </Box>
              <Box>
                <Text color="gray.500">Red Social</Text>
                <Text fontSize="lg" fontWeight="semibold">
                  Instagram
                </Text>
              </Box>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </Stack>
  );
};
