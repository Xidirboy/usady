import {
  FormControl,
  //   FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import styled from "styled-components";
import InputMask from "react-input-mask";
import { eyeIcon } from "../../assets/authIcons";
import { useState } from "react";

const InputUiStyle = styled.div`
  & .chakra-form-control {
    padding-bottom: 20px;
    & .chakra-form__label {
      font-size: 18px;
      font-weight: 600;
      line-height: 29px;
      letter-spacing: 0.2px;
      text-align: left;
    }
    & .chakra-input__group {
      & .chakra-input__left-element,
      & .chakra-input__right-element {
        height: 100%;
      }
      & .chakra-input {
        height: 60px;
        background: #fafafa;
        /* border: 1px solid #e0e0e0; */
        border-radius: 12px;
        font-size: 18px;
        font-weight: 400;
        line-height: 29px;
        letter-spacing: 0.2px;
        text-align: left;
      }
    }
  }
`;
const InputUi = ({
  label,
  mask,
  placeholder = "",
  type = "text",
  icon = null,
}) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <InputUiStyle>
      <FormControl>
        {label ? <FormLabel>{label}</FormLabel> : null}
        <InputGroup>
          {icon ? (
            <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
          ) : null}
          {mask ? (
            <Input
              as={InputMask}
              mask={mask}
              formatChars={{
                n: "[0-9]",
                a: "[A-Za-z]",
                "*": "[A-Za-z0-9]",
              }}
              placeholder={placeholder}
              focusBorderColor="#235dff"
            />
          ) : type === "password" ? (
            <Input
              type={showPass ? "text" : "password"}
              placeholder={placeholder}
              focusBorderColor="#235dff"
            />
          ) : (
            <Input
              type={type}
              placeholder={placeholder}
              focusBorderColor="#235dff"
            />
          )}
          {type === "password" ? (
            <InputRightElement pointerEvents="none">
              <button
                onClick={() => {
                  setShowPass(showPass ? false : true);
                }}
              >
                {eyeIcon}
              </button>
            </InputRightElement>
          ) : null}
        </InputGroup>
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
    </InputUiStyle>
  );
};

export default InputUi;
