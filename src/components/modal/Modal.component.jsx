import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import Warning from "../../assets/icon/Warning";
import { useDeleteActivity } from "../../hooks/useActivity";
import { useTodos } from "../../hooks/useTodos";
import ModalNotification from "./ModalNotification.component";

export default function MyModal({ isOpen, onClose, type, data }) {
  const { deleteActivity } = useDeleteActivity(data?.id);
  const { deleteTodo } = useTodos();
  const {
    isOpen: openNotification,
    onClose: closeNotification,
    onOpen,
  } = useDisclosure();

  const handleClick = (e) => {
    type !== "item" ? deleteActivity() : deleteTodo(data?.id);
    onClose(e);
    onOpen(e);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={["sm", "lg"]}
        data-cy={"modal-delete"}
      >
        <ModalOverlay />
        <ModalContent
          my={"auto"}
          display={"flex"}
          flexDirection={"column"}
          gap={[3, 6]}
          pt={[4, 8]}
          pb={[1, 2]}
          mx={4}
          borderRadius={"12px"}
          boxShadow={"modal"}
        >
          <ModalHeader mx={"auto"}>
            <Warning />
          </ModalHeader>
          <ModalBody textAlign={"center"}>
            <Text color={"#111111"} fontSize={["xs", "base"]}>
              Apakah anda yakin menghapus&nbsp;{type}&nbsp;
              <span style={{ fontWeight: 700 }} data-cy={"modal-delete-title"}>
                "{data?.title}"
              </span>
            </Text>
          </ModalBody>
          <ModalFooter display={"flex"} mx={"auto"} gap={4}>
            <Button
              variant={"cancel"}
              onClick={onClose}
              size={["xs", "lg"]}
              data-cy={"modal-delete-cancel-button"}
            >
              Batal
            </Button>
            <Button
              variant={"warning"}
              size={["xs", "lg"]}
              onClick={(e) => handleClick(e)}
              data-cy={"modal-delete-confirm-button"}
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {type !== "item" && (
        <ModalNotification
          onClose={closeNotification}
          isOpen={openNotification}
        />
      )}
    </>
  );
}
