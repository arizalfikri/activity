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
      height={["9.375rem", "14.625rem"]}
      w={"full"}
      py={"1.375rem"}
      px={"1.688rem"}
      shadow={"card"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      data-cy={"activity-item"}
    >
      <Box
        onClick={() => navigate(`detail/${data.id}`)}
        w={"full"}
        h={"full"}
        cursor={"pointer"}
      >
        <Text
          fontSize={["xs", "base"]}
          fontWeight={"bold"}
          data-cy={"activity-item-title"}
        >
          {data.title}
        </Text>
      </Box>
      <Flex
        justifyContent={"space-between"}
        w={"full"}
        alignItems={"center"}
        h={"fit-content"}
        gap={2}
      >
        <Text
          color={"gray.500"}
          fontSize={["xxs", "xs"]}
          data-cy={"activity-item-date"}
        >
          {formatDate(new Date(data.created_at))}
        </Text>
        <Box
          onClick={(e) => (onOpen(e), setOneData(data))}
          cursor={"pointer"}
          boxSize={["xxs", "xs"]}
          data-cy={"activity-item-delete-button"}
        >
          <Trash />
        </Box>
      </Flex>
    </Box>
  );
}
