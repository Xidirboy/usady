import React from "react";
import styled from "styled-components";
const AuthStyle = styled.div``;
const SignUp = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <AuthStyle>
      <form onSubmit={onSubmit}>
        
      </form>
    </AuthStyle>
  );
};

export default SignUp;
