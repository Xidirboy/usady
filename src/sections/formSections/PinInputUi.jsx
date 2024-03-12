import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
const PinInputUiStyle = styled.div`
  & .pin_row {
    justify-content: space-between;
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
