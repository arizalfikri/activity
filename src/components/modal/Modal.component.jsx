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
import ModalNotification from "./ModalNotification.component";

export default function MyModal({ isOpen, onClose, type, data }) {
  const { deleteActivity } = useDeleteActivity(data?.id);
  const {
    isOpen: openNotification,
    onClose: closeNotification,
    onOpen,
  } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent
          my={"auto"}
          display={"flex"}
          flexDirection={"column"}
          gap={6}
          pt={8}
          pb={2}
          borderRadius={"12px"}
          boxShadow={"modal"}
        >
          <ModalHeader mx={"auto"}>
            <Warning />
          </ModalHeader>
          <ModalBody textAlign={"center"}>
            <Text color={"#111111"} fontSize={"18px"}>
              Apakah anda yakin menghapus&nbsp;{type}&nbsp;
              <span style={{ fontWeight: 700 }}>"{data?.title}"</span>
            </Text>
          </ModalBody>
          <ModalFooter display={"flex"} mx={"auto"} gap={4}>
            <Button variant={"cancel"} onClick={onClose}>
              Batal
            </Button>
            <Button
              variant={"warning"}
              onClick={(e) => (deleteActivity(), onClose(e), onOpen(e))}
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ModalNotification
        onClose={closeNotification}
        isOpen={openNotification}
      />
    </>
  );
}
