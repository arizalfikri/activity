import { defineStyleConfig } from "@chakra-ui/react";

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: "2.813rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sizes: {
    xs: {
      w: "6.25rem",
      h: "2.313rem",
      fontSize: "0.75rem",
    },
    lg: {
      w: "9.875rem",
      h: "3.375rem",
      fontSize: "1.125rem",
    },
  },
  variants: {
    primary: {
      bg: "#16ABF8",
      color: "#FFFFFF",
      fontWeight: "semibold",
    },
    cancel: {
      bg: "#F4F4F4",
      color: "#4A4A4A",
    },
    warning: {
      bg: "#ED4C5C",
      color: "#FFFFFF",
    },
  },
});
