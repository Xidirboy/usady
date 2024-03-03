import React from "react";
import styled from "styled-components";
import InputUi from "../../formSections/InputUi";
const AuthStyle = styled.div``;
const SignUp = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <AuthStyle>
      <form onSubmit={onSubmit}>
        <InputUi />
      </form>
    </AuthStyle>
  );
};

export default SignUp;
