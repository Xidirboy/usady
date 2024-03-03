import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
const UiModalStyle = styled.div`
  padding: 30px;
  & .m_head {
    font-size: 24px;
    font-weight: 600;
    line-height: 38px;
    letter-spacing: 0.26px;
    text-align: center;
    padding-bottom: 20px;
    @media (max-width: 900px) {
      font-size: 22px;
      font-weight: 600;
      line-height: 36px;
      letter-spacing: 0em;
    }
  }
`;
const UiModal = ({ children, title = "", isOpen = false, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent className="ui_modal_content">
        <ModalCloseButton />
        <UiModalStyle>
          <div className="m_head">{title}</div>
          <div className="m_body">{children}</div>
        </UiModalStyle>
      </ModalContent>
    </Modal>
  );
};

export default UiModal;
