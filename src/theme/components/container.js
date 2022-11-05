import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const base = defineStyle({
  maxW: "62rem",
  padding: 0,
});

export const containerTheme = defineStyleConfig({
  sizes: { base },
});
