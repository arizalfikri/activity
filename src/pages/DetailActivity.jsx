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
} from "@chakra-ui/react";
import { useLoaderData, useParams } from "react-router-dom";
import { useUpdateActivity } from "../hooks/useActivity";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { actionAPI } from "../services";

import Edit from "../assets/icon/Edit";
import LeftArrow from "../assets/icon/LeftArrow";
import Plus from "../assets/icon/Plus";
import woman from "../assets/img/woman.png";
import ModalCreateTodo from "../components/modal/ModalCreateTodo.component";
import Trash from "../assets/icon/Trash";
import Circle from "../assets/icon/Circle";

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

export default function DetailActivity() {
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [isfocus, setFocus] = useState(false);
  const { updateActivity } = useUpdateActivity();
  const inputRef = useRef();
  const initialData = useLoaderData();
  const { onClose, onOpen, isOpen } = useDisclosure();

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

  const handleChecked = (e, data) => {
    console.log(data, "data");
    console.log(e.target.checked);
  };

  useEffect(() => {
    setInput(data?.title);
  }, []);

  useEffect(() => {
    input !== data.title && isfocus && updateActivity({ title: input });
  }, [isfocus]);

  return (
    <>
      <Flex justifyContent={"space-between"} mt={"43px"} mb={"55px"}>
        <HStack spacing={6}>
          <LeftArrow />
          <InputGroup
            alignItems={"center"}
            className={"group"}
            w={"fit-content"}
            position={"relative"}
          >
            <Input
              onBlur={() => setFocus(true)}
              onClick={handleFocus}
              ref={inputRef}
              variant="unstyled"
              value={input}
              fontStyle={"normal"}
              fontSize={"36px"}
              fontWeight={"bold"}
              lineHeight={"54px"}
              w={"50%"}
              borderRadius={"none"}
              onChange={handleChangeInput}
              _focus={{
                borderBottom: "2px",
                w: "full",
              }}
            />
            <Box
              cursor={"pointer"}
              onClick={handleFocus}
              position={focus ? "relative" : "absolute"}
            >
              <Edit head={true} />
            </Box>
          </InputGroup>
        </HStack>
        <Button variant={"primary"} leftIcon={<Plus />} onClick={onOpen}>
          Tambah
        </Button>
      </Flex>
      {data?.todo_items?.length < 1 ? (
        <Image
          src={woman}
          w={550}
          mx={"auto"}
          objectFit={"contain"}
          onClick={onOpen}
        />
      ) : (
        <VStack spacing={3}>
          {data?.todo_items?.map((todo, i) => (
            <Flex
              key={i}
              justifyContent={"space-between"}
              w={"full"}
              bg={"wild-sand.50"}
              shadow={"card"}
              borderRadius={"12px"}
              p={7}
              fontWeight={"medium"}
              fontSize={"18px"}
            >
              <HStack spacing={6}>
                <Checkbox
                  size={"lg"}
                  colorScheme={"linkedin"}
                  onChange={(e) => handleChecked(e, todo)}
                />
                <Circle priority={todo.priority} />
                <Text>{todo.title}</Text>
                <Edit head={false} />
              </HStack>
              <Box>
                <Trash />
              </Box>
            </Flex>
          ))}
        </VStack>
      )}
      <ModalCreateTodo isOpen={isOpen} onClose={onClose} />
    </>
  );
}
