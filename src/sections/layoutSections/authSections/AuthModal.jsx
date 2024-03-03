import React, { useState } from "react";
import UiModal from "../../utilsSections/UiModal";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const AuthModal = () => {
  const { auth_modal } = useSelector((s) => s);
  const dispatch = useDispatch();
  const [action, setAction] = useState(1);
  return (
    <>
      <UiModal
        title={action === 2 ? "Зарегистрироваться" : "Войти"}
        isOpen={auth_modal}
        setIsOpen={(o) => {
          dispatch({ type: "SET_AUTH_MODAL", payload: o });
        }}
      >
        {action === 2 ? (
          <SignUp setAction={setAction} />
        ) : (
          <SignIn setAction={setAction} />
        )}
      </UiModal>
    </>
  );
};

export default AuthModal;
