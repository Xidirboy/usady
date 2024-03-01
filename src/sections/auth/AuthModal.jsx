import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import SignIn from "./SignIn";
import { useDispatch } from "react-redux";
import SignUp from "./SignUp";
import Forget from "./Forget";
import AcceptSms from "./AcceptSms";
import SetPassword from "./SetPassword";
const AuthModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const setLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      size={"xl"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent style={{ maxWidth: "95%", width: 650, borderRadius: 20 }}>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isOpen === 2 ? (
            <SignUp setIsOpen={setIsOpen} setLoading={setLoading} />
          ) : isOpen === 3 ? (
            <Forget setIsOpen={setIsOpen} setLoading={setLoading} />
          ) : isOpen === 4 ? (
            <AcceptSms setIsOpen={setIsOpen} setLoading={setLoading} />
          ) : isOpen === 5 ? (
            <SetPassword setIsOpen={setIsOpen} setLoading={setLoading} />
          ) : (
            <SignIn setIsOpen={setIsOpen} setLoading={setLoading} />
          )}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
