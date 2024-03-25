import { useState } from "react";
import UiModal from "../../utilsSections/UiModal";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "./SignIn";

const PaymentModal = ({ payObj = {} }) => {
  const { pay_modal } = useSelector((s) => s);
  const dispatch = useDispatch();
  return (
    <>
      <UiModal
        title={"Оплата"}
        isOpen={pay_modal}
        setIsOpen={(o) => {
          dispatch({ type: "SET_PAY_MODAL", payload: false });
        }}
      >
        <SignIn />
      </UiModal>
    </>
  );
};

export default PaymentModal;
