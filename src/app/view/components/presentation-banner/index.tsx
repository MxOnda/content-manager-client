import React from "react";
import { Box, Card, CardBody, HStack, Skeleton, Text } from "@chakra-ui/react";
import { useAuthentication } from "@/hooks/use-authentication";
import { ChangeProfilePicture } from "./change-profile-picture";
import { ChangeName } from "./change-name";

export const PresentationBanner = () => {
  const [isAuth, currentUser] = useAuthentication();

  return (
    <Card border="1px" borderColor="gray.200">
      <CardBody>
        <HStack spacing="4">
          <ChangeProfilePicture />
          <Box>
            <HStack>
              <Text fontWeight="medium" fontSize="lg">
                Bienvenido a la aplicación,
              </Text>
              {isAuth === "loading" ? (
                <Skeleton w="48" height="18px" />
              ) : (
                <ChangeName currentName={currentUser?.fullname || ""} />
              )}
            </HStack>
            <Text fontSize="sm">Conecta tus redes sociales para compartir contenido.</Text>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};
