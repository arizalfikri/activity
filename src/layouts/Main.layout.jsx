import React from "react";
import { Box, Container, Flex, Text } from "@chakra-ui/react";

import Header from "../components/header/Header.component";

export default function MainLayout({ children }) {
  return (
    <Box
      bg={"wild-sand.DEFAULT"}
      color={"cod-gray.DEFAULT"}
      fontFamily={"base"}
    >
      <Header />
      <Box px={8}>
        <Container size={"base"}>{children}</Container>
      </Box>
    </Box>
  );
}
