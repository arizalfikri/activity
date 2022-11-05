import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  Image,
  useDisclosure,
  VStack,
  Text,
  Checkbox,
  Modal,
  ModalContent,
  ModalBody,
  Container,
} from "@chakra-ui/react";
import { useLoaderData, useParams } from "react-router-dom";
import { useUpdateActivity } from "../hooks/useActivity";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { actionAPI } from "../services";
import { useTodos } from "../hooks/useTodos";

import Edit from "../assets/icon/Edit";
import LeftArrow from "../assets/icon/LeftArrow";
import Plus from "../assets/icon/Plus";
import woman from "../assets/img/woman.png";
import ModalCreateTodo from "../components/modal/ModalCreateTodo.component";
import Trash from "../assets/icon/Trash";
import Circle from "../assets/icon/Circle";
import MyModal from "../components/modal/Modal.component";
import Filter from "../assets/icon/Filter";
import Header from "../components/header/Header.component";
import satu from "../assets/iconDropdown/1.png";
import dua from "../assets/iconDropdown/2.png";
import tiga from "../assets/iconDropdown/3.png";
import empat from "../assets/iconDropdown/4.png";
import lima from "../assets/iconDropdown/5.png";

const detailActivity = (id) => ({
  queryKey: ["activity", "detail", id],
  queryFn: () => actionAPI("get", `activity-groups/${id}`),
});

export const loader =
  (queryClient) =>
  ({ params }) => {
    const query = detailActivity(params.id);
    return (
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    );
  };

let optionDropdown = [
  { img: satu, title: "Terbaru" },
  { img: dua, title: "Terlama" },
  { img: tiga, title: "A-Z" },
  { img: empat, title: "Z-A" },
  { img: lima, title: "Belum Selesai" },
];

export default function DetailActivity() {
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [isfocus, setFocus] = useState(false);
  const { updateActivity } = useUpdateActivity();
  const { updateTodo, filterTodos } = useTodos();
  const inputRef = useRef();
  const initialData = useLoaderData();
  const {
    onClose: onCloseFormTod,
    onOpen: onOpenFormTodo,
    isOpen: isOpenFormTodo,
  } = useDisclosure();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const {
    onClose: onCloseDropdown,
    onOpen: onOpenDropdown,
    isOpen: isOpenDropdown,
  } = useDisclosure();
  const [prevData, setPrevData] = useState(undefined);
  const [type, setType] = useState("");
  const [oneData, setOneData] = useState(undefined);
  const [display, setDisplay] = useState(true);
  const [checked, setChecked] = useState("");

  const { data } = useQuery({
    ...detailActivity(id),
    initialData,
    staleTime: Infinity,
  });

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  const handleFocus = (e) => {
    e.preventDefault();
    inputRef.current.focus();
    setFocus(false);
  };

  const handleChecked = (e, dataUpdate) => {
    const { priority, title, id: idTodo } = dataUpdate;
    const dataSend = {
      is_active: e.target.checked ? 0 : 1,
      priority,
      title,
    };
    updateTodo({ idTodo, data: dataSend });
  };

  const handleClick = (e, thisType) => {
    setType(thisType);
    onOpenFormTodo(e);
  };

  const handleDelete = (e, todo) => {
    localStorage.setItem("idTodo", todo.id);
    onOpen(e);
    setOneData(todo);
  };

  const handleFilter = (item) => {
    setChecked(item);
    filterTodos(item);
    onCloseDropdown();
  };

  useEffect(() => {
    setInput(data?.title);
  }, []);

  useEffect(() => {
    input !== data.title && isfocus && updateActivity({ title: input });
  }, [isfocus]);

  return (
    <>
      <Header title={input} />
      <Box px={[5, 8]}>
        <Container size={"base"}>
          <Flex
            flexDirection={["column", "row"]}
            justifyContent={"space-between"}
            position={"relative"}
            gap={6}
            mt={["1rem", "2.688rem"]}
            mb={["2rem", "3.438rem"]}
          >
            <HStack spacing={[3, 7]} position={"relative"} w={"full"}>
              <Box display={["none", "block"]} boxSize={["iconXs", "icon"]}>
                <LeftArrow />
              </Box>
              <Box
                position={"absolute"}
                w={["100%", "fit-content"]}
                display={display ? "flex" : "none"}
                alignItems={"center"}
                left={[0, 7]}
                gap={[0, 7]}
                pr={[3, 0]}
                zIndex={10}
              >
                <Text
                  variant={["xsBaseHeading", "baseHeading"]}
                  w={["full", "fit-content"]}
                  onClick={(e) => (handleFocus(e), setDisplay(false))}
                >
                  {input}
                </Text>
                <Box
                  cursor={"pointer"}
                  boxSize={["xs", "1.6rem"]}
                  onClick={(e) => (handleFocus(e), setDisplay(false))}
                >
                  <Edit head={true} />
                </Box>
              </Box>
              <InputGroup
                alignItems={"center"}
                className={"group"}
                position={"relative"}
              >
                <Input
                  onBlur={() => (setFocus(true), setDisplay(true))}
                  onFocus={() => setDisplay(false)}
                  onClick={handleFocus}
                  ref={inputRef}
                  variant="unstyled"
                  value={input}
                  fontStyle={"normal"}
                  fontSize={["1rem", "md"]}
                  fontWeight={"bold"}
                  lineHeight={"54px"}
                  w={0}
                  opacity={0}
                  borderRadius={"none"}
                  onChange={handleChangeInput}
                  _focus={{
                    borderBottom: "1px solid #D8D8D8",
                    opacity: 100,
                    width: ["100%", "80%"],
                  }}
                />
                <Box
                  cursor={"pointer"}
                  onClick={handleFocus}
                  boxSize={["xs", "1.6rem"]}
                  display={display ? "none" : "block"}
                >
                  <Edit head={true} />
                </Box>
              </InputGroup>
            </HStack>
            <Flex gap={[2, 4]} justifyContent={"flex-end"}>
              <Box onClick={onOpenDropdown} boxSize={["2.375rem", "3.375rem"]}>
                <Filter />
              </Box>
              <Button
                variant={"primary"}
                leftIcon={<Plus />}
                size={["xs", "lg"]}
                onClick={(e) => handleClick(e, "create")}
              >
                Tambah
              </Button>
            </Flex>
          </Flex>
          {data?.todo_items?.length < 1 ? (
            <Image
              src={woman}
              w={550}
              mx={"auto"}
              objectFit={"contain"}
              onClick={(e) => handleClick(e, "create")}
            />
          ) : (
            <VStack spacing={3}>
              {data?.todo_items?.map((todo, i) => (
                <Flex
                  key={i}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w={"full"}
                  bg={"wild-sand.50"}
                  shadow={"card"}
                  borderRadius={"12px"}
                  gap={2}
                  p={[4, 7]}
                  fontWeight={"medium"}
                  fontSize={["xs", "base"]}
                >
                  <HStack spacing={6}>
                    <Checkbox
                      size={["sm", "lg"]}
                      colorScheme={"linkedin"}
                      onChange={(e) => handleChecked(e, todo)}
                      isChecked={todo.is_active === 0}
                    />
                    <Circle priority={todo.priority} />
                    <Text as={todo.is_active === 0 ? "del" : ""}>
                      {todo.title}
                    </Text>
                    <Box
                      boxSize={["1.25rem", "xs"]}
                      onClick={(e) => (
                        setPrevData(todo), handleClick(e, "edit")
                      )}
                    >
                      <Edit head={false} />
                    </Box>
                  </HStack>
                  <Box
                    onClick={(e) => handleDelete(e, todo)}
                    boxSize={["xxs", "xs"]}
                  >
                    <Trash />
                  </Box>
                </Flex>
              ))}
            </VStack>
          )}
          <Modal
            isOpen={isOpenDropdown}
            onClose={onCloseDropdown}
            motionPreset={"slideInRight"}
            autoFocus={false}
            isCentered={false}
            blockScrollOnMount={false}
          >
            <ModalContent
              marginLeft={["10rem", "40rem"]}
              marginTop={["15rem", "13rem"]}
              borderRadius={"0.75rem"}
              overflow={"hidden"}
              shadow={"modal"}
              maxW={["11.691rem", "14.688rem"]}
            >
              {optionDropdown.map((item, i) => (
                <ModalBody
                  w={["20rem"]}
                  bg={"#FFFFFF"}
                  key={i}
                  px={[3, 6]}
                  display={"flex"}
                  position={"relative"}
                  gap={[1.5, 0]}
                  py={[2, 4]}
                  alignItems={"center"}
                  cursor={"pointer"}
                  _hover={{
                    bg: "wild-sand.500",
                  }}
                  borderBottom={
                    optionDropdown.length - 1 === i ? "" : "1px solid #E5E5E5"
                  }
                  onClick={() => handleFilter(item.title)}
                >
                  <HStack>
                    <Image src={item.img} w={[4, 8]} h={[4, 8]} />
                    <Text fontSize={"xs"} fontWeight={"normal"}>
                      {item.title}
                    </Text>
                  </HStack>
                  {checked === item.title && (
                    <Box
                      boxSize={["0.896rem", "1.125rem"]}
                      position={"absolute"}
                      right={["36", "28"]}
                    >
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.75 9L7.5 12.75L15 5.25"
                          stroke="#4A4A4A"
                          strokeLinecap="square"
                        />
                      </svg>
                    </Box>
                  )}
                </ModalBody>
              ))}
            </ModalContent>
          </Modal>
          <MyModal
            isOpen={isOpen}
            onClose={onClose}
            data={oneData}
            type={"item"}
          />
          <ModalCreateTodo
            type={type}
            isOpen={isOpenFormTodo}
            onClose={onCloseFormTod}
            prevData={prevData}
          />
        </Container>
      </Box>
    </>
  );
}
