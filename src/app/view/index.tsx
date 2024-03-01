"use client";
import React from "react";

import { Box, Container, GridItem, SimpleGrid, Stack } from "@chakra-ui/react";
import { ContentTable } from "./components/content-table";
import { PresentationBanner } from "./components/presentation-banner";
import { CenterOptiontsCard } from "./components/CenterOptiontsCard";
import { LeftSidebar } from "./components/left-sidebar";
import { SocialNetworkSide } from "./components/social-network-side";

export const HomeView = () => {
  return (
    <Box p="6">
      <SimpleGrid columns={12} gap={4}>
        <GridItem colSpan={[12, null, null, 2]}>
          <LeftSidebar />
        </GridItem>
        <GridItem colSpan={[12, null, null, 10]}>
          <Stack spacing="4">
            <PresentationBanner />
            <CenterOptiontsCard />
            <ContentTable />
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
