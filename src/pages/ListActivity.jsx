import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useGetAllActivity, usePostActivity } from "../hooks/useActivity";

import Plus from "../assets/icon/Plus";
import man from "../assets/img/man.png";
import Card from "../components/card/Card.component";
import MyModal from "../components/modal/Modal.component";
import Header from "../components/header/Header.component";

export default function ListActivity() {
  const [oneData, setOneData] = useState(undefined);
  const { data, isFetching, isError } = useGetAllActivity();
  const { postActivity, isLoading } = usePostActivity();
  const { onClose, onOpen, isOpen } = useDisclosure();

  return (
    <>
      <Header />
      <Box px={[5, 8]}>
        <Container size={"base"}>
          <Flex
            justifyContent={"space-between"}
            mt={["1rem", "2.688rem"]}
            mb={["2rem", "3.438rem"]}
            alignItems={"center"}
          >
            <Text variant={["xsBaseHeading", "baseHeading"]}>Activity</Text>
            <Button
              isLoading={isLoading}
              onClick={() => postActivity()}
              size={["xs", "lg"]}
              variant={"primary"}
              leftIcon={<Plus />}
            >
              Tambah
            </Button>
          </Flex>
          {!data ||
            (data?.data?.length < 1 ? (
              <Image
                src={man}
                w={750}
                mx={"auto"}
                objectFit={"contain"}
                onClick={() => postActivity()}
              />
            ) : (
              <Grid
                templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)"]}
                gap={[3, 5]}
                mx={"auto"}
              >
                {data?.data?.map((el) => (
                  <GridItem key={el.id}>
                    <Card data={el} onOpen={onOpen} setOneData={setOneData} />
                  </GridItem>
                ))}
              </Grid>
            ))}

          <MyModal
            isOpen={isOpen}
            onClose={onClose}
            data={oneData}
            type={"activity"}
          />
        </Container>
      </Box>
    </>
  );
}
