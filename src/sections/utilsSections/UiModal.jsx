import {
  Modal,
  ModalBody,
  ModalCloseButton,
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
        <ModalBody>
          <UiModalStyle>{children}</UiModalStyle>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UiModal;
