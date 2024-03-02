import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
const UiModalStyle = styled.div``;
const UiModal = ({ children, isOpen = false, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <UiModalStyle>{children}</UiModalStyle>
      </ModalContent>
    </Modal>
  );
};

export default UiModal;
