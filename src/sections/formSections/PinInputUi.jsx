import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
const PinInputUiStyle = styled.div`
  /* padding-bottom: 20px; */
  & .pin_row {
    justify-content: space-between;
    & .chakra-pin-input {
      width: 25%;
      background: #fafafa;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      height: 70px;
      font-size: 24px;
      font-weight: 700;
      line-height: 38px;
      letter-spacing: 0em;
    }
  }
`;
const PinInputUi = () => {
  return (
    <PinInputUiStyle>
      <HStack className="pin_row">
        <PinInput>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
    </PinInputUiStyle>
  );
};

export default PinInputUi;
