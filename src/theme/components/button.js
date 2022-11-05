import { defineStyle, defineStyleConfig, flexbox } from "@chakra-ui/react";

const primary = defineStyle({
  borderRadius: "2.813rem",
  bg: "#16ABF8",
  color: "#FFFFFF",
  w: "9.875rem",
  h: "3.375rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "semibold",
  fontSize: "18px",
});

const cancel = defineStyle({
  borderRadius: "2.813rem",
  w: "9.875rem",
  h: "3.375rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bg: "#F4F4F4",
  color: "#4A4A4A",
});

const warning = defineStyle({
  borderRadius: "2.813rem",
  w: "9.875rem",
  h: "3.375rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bg: "#ED4C5C",
  color: "#FFFFFF",
});

export const buttonTheme = defineStyleConfig({
  variants: { primary, cancel, warning },
});
