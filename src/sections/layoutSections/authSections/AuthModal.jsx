import React from "react";
import UiModal from "../../utilsSections/UiModal";
import { useDispatch, useSelector } from "react-redux";

const AuthModal = () => {
  const { auth_modal } = useSelector((s) => s);
  const dispatch = useDispatch();
  return (
    <>
      <UiModal
        title={"Зарегистрироваться"}
        isOpen={auth_modal}
        setIsOpen={(o) => {
          dispatch({ type: "SET_AUTH_MODAL", payload: o });
        }}
      >
        Auth modal
      </UiModal>
    </>
  );
};

export default AuthModal;
