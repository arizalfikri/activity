import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
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
    display: "none",
    transform: isFocused ? "rotate(180deg)" : null,
  }),
  container: (style) => ({ ...style, width: "100%" }),
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

export default function ModalCreateTodo({ isOpen, onClose, prevData, type }) {
  const { id } = useParams();
  const [data, setData] = useState({
    activity_group_id: id,
    priority: "",
    title: "",
    id: 0,
    is_active: 1,
  });
  const [focus, setFocus] = useState(false);
  const { createTodo, updateTodo, isLoading } = useTodos();
  const selectRef = useRef();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target?.value });
  };

  const handleOnClick = (e) => {
    type === "edit"
      ? (updateTodo({ idTodo: data?.id, data }),
        onClose(e),
        setData({
          activity_group_id: id,
          priority: "",
          title: "",
          id: 0,
          is_active: 1,
        }))
      : data?.priority
      ? (createTodo(data), onClose(e))
      : selectRef.current.focus();
  };

  useEffect(() => {
    prevData && setData(prevData);
  }, [prevData]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={["sm", "4xl"]}
      data-cy={"modal-add"}
    >
      <ModalOverlay />
      <ModalContent
        my={"auto"}
        boxShadow={"modal"}
        borderRadius={"12px"}
        fontFamily={"base"}
        mx={[3, 0]}
        zIndex={90}
      >
        <ModalHeader
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={8}
          py={5}
          borderBottom={"1px solid #E5E5E5"}
        >
          <Text
            fontWeight={"semibold"}
            fontSize={["1rem", "base"]}
            data-cy={"modal-add-title"}
          >
            Tambah List Item
          </Text>
          <Box
            boxSize={["1.125rem", "1.5rem"]}
            onClick={onClose}
            cursor={"pointer"}
            data-cy={"modal-add-close-button"}
          >
            <svg
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={"100%"}
              height={"100%"}
            >
              <path
                d="M13.5 4.5L4.5 13.5"
                stroke="#A4A4A4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 4.5L13.5 13.5"
                stroke="#A4A4A4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        </ModalHeader>
        <ModalBody px={8} py={10} borderBottom={"1px solid #E5E5E5"}>
          <Flex flexDir={"column"} gap={6}>
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <Text
                textTransform={"uppercase"}
                fontSize={("xxs", "0.75rem")}
                fontWeight={"semibold"}
                data-cy={"modal-add-name-title"}
              >
                nama list item
              </Text>
              <Box w={"full"} data-cy={"modal-add-name-input"}>
                <Input
                  value={data?.title}
                  placeholder="Tambahkan nama Activity"
                  py={6}
                  fontSize={["xs", "1rem"]}
                  border={"1px solid #E5E5E5"}
                  name="title"
                  focusBorderColor={"#16ABF8"}
                  onChange={handleOnChange}
                />
              </Box>
            </Box>
            <Box display={"flex"} h={"4rem"} flexDirection={"column"} gap={3}>
              <Text
                textTransform={"uppercase"}
                fontSize={("xxs", "0.75rem")}
                fontWeight={"semibold"}
                data-cy={"modal-add-name-input"}
              >
                priority
              </Text>
              <Box boxSize={["full", "12.813rem"]} position={"relative"}>
                <Select
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                  data-cy={"modal-add-priority-item"}
                  defaultValue={
                    type === "edit"
                      ? options.filter((el) => el.value === prevData?.priority)
                      : options.filter((el) => el.value === data?.priority)
                  }
                  onChange={(e) => setData({ ...data, priority: e.value })}
                  options={options}
                  styles={selectStyles}
                  ref={selectRef}
                  placeholder={"Pilih priority"}
                />
                <Box
                  boxSize={"1.5rem"}
                  position={"absolute"}
                  top={3}
                  right={3}
                  data-cy={"modal-add-priority-dropdown"}
                  onClick={() => selectRef.current.focus()}
                  transition={"all 0.5s ease-in-out"}
                  transform={focus ? "rotate(-180deg)" : "none"}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#111111"
                      strokeLinecap="square"
                    />
                  </svg>
                </Box>
              </Box>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter alignItems={"flex-end"} w={"full"} py={6}>
          <Button
            isLoading={isLoading}
            data-cy={"modal-add-save-button"}
            variant={"primary"}
            size={["xs", "lg"]}
            disabled={data?.title?.length < 1}
            onClick={(e) => handleOnClick(e)}
          >
            <Text>Simpan</Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
