import { defineStyleConfig } from "@chakra-ui/react";

export const textTheme = defineStyleConfig({
  variants: {
    heading: {
      fontSize: "1.5rem",
      lineHeight: "2.25rem",
      color: "#FFFFFF",
    },
    xsHeading: {
      fontSize: "1.125rem",
      lineHeight: "2.25rem",
      color: "#FFFFFF",
    },
    baseHeading: {
      fontStyle: "normal",
      fontSize: "2.25rem",
      lineHeight: "3.375rem",
      fontWeight: "bold",
    },
    xsBaseHeading: {
      fontStyle: "normal",
      fontSize: "1rem",
      lineHeight: "3.375rem",
      fontWeight: "bold",
    },
  },
});
