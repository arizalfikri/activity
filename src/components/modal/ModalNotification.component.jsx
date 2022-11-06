import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

export default function ModalNotification({ isOpen, onClose }) {
  return (
    <Modal
      size={"lg"}
      isOpen={isOpen}
      onClose={onClose}
      data-cy={"modal-information"}
    >
      <ModalOverlay />
      <ModalContent
        my={"auto"}
        borderRadius={"12px"}
        boxShadow={"modal"}
        mx={4}
      >
        <ModalHeader
          display={"flex"}
          alignItems={"center"}
          gap={4}
          py={5}
          px={8}
        >
          <svg
            data-cy="modal-information-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
              stroke="#00A790"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 6V10"
              stroke="#00A790"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 14H10.01"
              stroke="#00A790"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Text
            fontWeight={"semibold"}
            fontSize={"14px"}
            data-cy={"modal-information-title"}
          >
            Activity berhasil dihapus
          </Text>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
}
