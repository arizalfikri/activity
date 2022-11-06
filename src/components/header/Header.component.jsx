import { Box, Container, Image, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

import backBottom from "../../assets/icon/back-bottom.png";

export default function Header({ title }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box w={"full"} bg={"dodger-blue.500"} px={[5, 8]} className={"header"}>
      <Container
        size={"base"}
        py={8}
        mx={"auto"}
        display={"flex"}
        gap={3}
        alignItems={"center"}
        data-cy={"header-background"}
      >
        {pathname.includes("detail") && (
          <Image
            src={backBottom}
            w={"1.313rem"}
            h={"1.313rem"}
            display={["flex", "none"]}
            cursor={"pointer"}
            onClick={() => navigate("/")}
          />
        )}
        <Text
          data-cy={"header-title"}
          textTransform={"uppercase"}
          variant={["xsHeading", "heading"]}
          fontWeight={"bold"}
        >
          {title ? title : "To do list app"}
        </Text>
      </Container>
    </Box>
  );
}
