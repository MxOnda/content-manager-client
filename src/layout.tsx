"use client";
import React from "react";

import { Container, GridItem, Heading, SimpleGrid, Stack, VStack } from "@chakra-ui/react";
import { LeftSidebar } from "./app/view/components/left-sidebar";
import { PresentationBanner } from "./app/view/components/presentation-banner";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack mt="12">
      <Heading fontWeight="semibold" fontSize="2xl">
        Manejador de Contenidos Para Redes Sociales
      </Heading>
      <Container p="0" py="6" maxW="8xl">
        <SimpleGrid columns={12} gap={4}>
          <GridItem colSpan={2}>
            <LeftSidebar />
          </GridItem>
          <GridItem colSpan={8}>
            <Stack spacing="4">
              <PresentationBanner />
              {children}
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Container>
    </VStack>
  );
};
