import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useTodos } from "../../hooks/useTodos";

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",
  position: "relative",

  ":before": {
    backgroundColor: color,
    borderRadius: "100%",
    content: '" "',
    display: "block",
    marginRight: 10,
    height: 14,
    width: 14,
  },
});

const options = [
  { color: "#ED4C5C", value: "very-high", label: "Very High" },
  { color: "#F8A541", value: "high", label: "High" },
  { color: "#00A790", value: "normal", label: "Medium" },
  { color: "#428BC1", value: "low", label: "Low" },
  { color: "#8942C1", value: "very-low", label: "Very Low" },
];

const selectStyles = {
  dropdownIndicator: (style, { isFocused }) => ({
    ...style,
    transition: "all .2s ease",
    transform: isFocused ? "rotate(180deg)" : null,
  }),
  container: (style) => ({ ...style, width: "25%" }),
  indicatorSeparator: (style) => ({ ...style, display: "none" }),
  control: (style) => ({
    ...style,
    border: "1px solid #E5E5E5",
    padding: "6px",
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...dot(data.color),
  }),
  option: (styles, { data }) => {
    return {
      ...styles,
      ...dot(data.color),
    };
  },
};

export default function ModalCreateTodo({ isOpen, onClose }) {
  const { id } = useParams();
  const [data, setData] = useState({
    activity_group_id: id,
    priority: "",
    title: "",
  });
  const { createTodo, isLoading } = useTodos();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target?.value });
  };

  const handleOnClick = () => {
    createTodo(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      <ModalOverlay />
      <ModalContent
        my={"auto"}
        boxShadow={"modal"}
        borderRadius={"12px"}
        fontFamily={"base"}
      >
        <ModalHeader
          display={"flex"}
          w={"full"}
          justifyContent={"space-between"}
          px={8}
          py={5}
          borderBottom={"1px solid #E5E5E5"}
        >
          <Text fontWeight={"semibold"} fontSize={"18px"}>
            Tambah List Item
          </Text>
        </ModalHeader>
        <ModalBody px={8} py={10} borderBottom={"1px solid #E5E5E5"} w={"full"}>
          <Flex flexDir={"column"} gap={6}>
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <Text
                textTransform={"uppercase"}
                fontSize={"12px"}
                fontWeight={"semibold"}
              >
                nama list item
              </Text>
              <Input
                placeholder="Tambahkan nama Activity"
                py={6}
                border={"1px solid #E5E5E5"}
                name="title"
                focusBorderColor={"#16ABF8"}
                onChange={handleOnChange}
              />
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <Text
                textTransform={"uppercase"}
                fontSize={"12px"}
                fontWeight={"semibold"}
              >
                priority
              </Text>
              <Select
                onChange={(e) => setData({ ...data, priority: e.value })}
                options={options}
                styles={selectStyles}
                placeholder={"Pilih priority"}
              />
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter alignItems={"flex-end"} w={"full"} py={6}>
          <Button
            isLoading={isLoading}
            variant={"primary"}
            disabled={data?.title?.length < 1}
            onClick={(e) => (handleOnClick(e), onClose(e))}
          >
            <Text>Simpan</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
