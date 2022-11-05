import { defineStyleConfig } from "@chakra-ui/react";

export const Box = defineStyleConfig({
  baseStyle: {
    p: 6,
  },
  sizes: {
    xs: {
      w: "9.875rem",
      h: "9.875rem",
    },
  },
  variants: {
    card: {
      bg: "#FFFFFF",
      borderRadius: "0.75rem",
    },
  },
});
