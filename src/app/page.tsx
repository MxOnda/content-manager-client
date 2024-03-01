import React from "react";

import { HomeView } from "./view";
import { Box, Heading, Image, Stack, VStack } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Stack>
      <Box px="8" backgroundColor="#1b232e">
        <Image w="40" py="4" src="/logo.png" alt="logo" />
      </Box>
      <HomeView />
    </Stack>
  );
};

export default HomePage;
