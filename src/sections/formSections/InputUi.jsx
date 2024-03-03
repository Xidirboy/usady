import { PhoneIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import styled from "styled-components";

const InputUiStyle = styled.div``;
const InputUi = () => {
  return (
    <InputUiStyle>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <PhoneIcon color="gray.300" />
        </InputLeftElement>
        <Input type="tel" placeholder="Phone number" />
      </InputGroup>
    </InputUiStyle>
  );
};

export default InputUi;
