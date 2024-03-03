import React from "react";
import styled from "styled-components";
import InputUi from "../../formSections/InputUi";
import { Btn } from "../../../styleComponents/GlobalStyle";
const AuthStyle = styled.div``;
const SignUp = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <AuthStyle>
      <form onSubmit={onSubmit}>
        <InputUi />
        <InputUi />
        <Btn>Login</Btn>
      </form>
    </AuthStyle>
  );
};

export default SignUp;
