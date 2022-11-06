import { Box } from "@chakra-ui/react";

export default function Plus() {
  return (
    <Box boxSize={["xxs", "iconXs"]} className={"icon-plus"}>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        <path
          d="M8 0.999878V14.9999"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M1 8H15"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
}
