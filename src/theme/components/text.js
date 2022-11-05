import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const heading = defineStyle({
  fontSize: "24px",
  lineHeight: "36px",
  color: "#FFFFFF",
});

const baseHeading = defineStyle({
  fontStyle: "normal",
  fontSize: "36px",
  lineHeight: "54px",
  color: "#111111",
});

export const textTheme = defineStyleConfig({
  variants: { heading, baseHeading },
});
