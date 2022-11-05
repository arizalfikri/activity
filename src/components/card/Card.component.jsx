import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import Trash from "../../assets/icon/Trash";
import { useNavigate } from "react-router-dom";

export default function Card({ data, onOpen, setOneData }) {
  const formatDate = (date) => {
    let newDate = new Intl.DateTimeFormat("ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
    return newDate.split("")[0] + newDate.split("")[1] < 10
      ? `0${newDate}`
      : newDate;
  };

  const navigate = useNavigate();

  return (
    <Box
      bg={"#FFFFFF"}
      borderRadius={"12px"}
      height={"14.625rem"}
      w={"full"}
      py={"1.375rem"}
      px={"1.688rem"}
      shadow={"card"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Box
        onClick={() => navigate(`detail/${data.id}`)}
        w={"full"}
        h={"full"}
        cursor={"pointer"}
      >
        <Text fontSize={"18px"} fontWeight={"bold"}>
          {data.title}
        </Text>
      </Box>
      <Flex
        justifyContent={"space-between"}
        w={"full"}
        alignItems={"center"}
        h={"fit-content"}
      >
        <Text color={"gray.500"}>{formatDate(new Date(data.created_at))}</Text>
        <Box onClick={onOpen} cursor={"pointer"}>
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setOneData(data)}
          >
            <path
              d="M1 5H17"
              stroke="#888888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 9V15"
              stroke="#888888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 9V15"
              stroke="#888888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 5L3 17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5"
              stroke="#888888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V5"
              stroke="#888888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      </Flex>
    </Box>
  );
}
