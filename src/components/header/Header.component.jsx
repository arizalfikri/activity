import { Box, Container, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box w={"full"} bg={"dodger-blue.500"} px={8}>
      <Container size={"base"} py={8} mx={"auto"}>
        <Text
          textTransform={"uppercase"}
          variant={"heading"}
          fontWeight={"bold"}
        >
          To do list app
        </Text>
      </Container>
    </Box>
  );
}
