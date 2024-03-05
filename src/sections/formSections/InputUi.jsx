import {
  FormControl,
  //   FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Textarea,
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
    & .thin_label {
      font-weight: 500;
    }
    & .chakra-input__group {
      & .chakra-input__left-element,
      & .chakra-input__right-element {
        height: 100%;
      }
      & .chakra-input__right-element {
        pointer-events: all;
        & button {
          padding: 5px;
          &:hover,
          &.show_eye {
            & svg {
              & path {
                fill: #235dff;
              }
            }
          }
        }
      }
      & .chakra-input,
      & .chakra-textarea,
      & .chakra-select {
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
      & .chakra-select {
        box-shadow: none !important;
      }
      & .chakra-textarea {
        height: none;
        min-height: 200px;
        box-shadow: none !important;
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
  name = "",
  value = "",
  onChange = () => {},
  is_error = false,
  thin_label = false,
}) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <InputUiStyle>
      <FormControl>
        {label ? (
          <FormLabel className={thin_label ? "thin_label" : ""}>
            {label}
          </FormLabel>
        ) : null}
        <InputGroup>
          {icon ? (
            <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
          ) : null}
          {mask ? (
            <Input
              isInvalid={is_error}
              value={value}
              onChange={(e) => {
                onChange(e);
              }}
              name={name}
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
              isInvalid={is_error}
              value={value}
              onChange={(e) => {
                onChange(e);
              }}
              name={name}
              type={showPass ? "text" : "password"}
              placeholder={placeholder}
              focusBorderColor="#235dff"
            />
          ) : type === "textarea" ? (
            <Textarea
              isInvalid={is_error}
              value={value}
              onChange={(e) => {
                onChange(e);
              }}
              name={name}
              type={type}
              placeholder={placeholder}
              focusBorderColor="#235dff"
            />
          ) : type === "select" ? (
            <Select
              isInvalid={is_error}
              value={value}
              onChange={(e) => {
                onChange(e);
              }}
              name={name}
              type={type}
              placeholder={placeholder}
              focusBorderColor="#235dff"
              style={icon ? { paddingLeft: 40 } : {}}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          ) : (
            <Input
              isInvalid={is_error}
              value={value}
              onChange={(e) => {
                onChange(e);
              }}
              name={name}
              type={type}
              placeholder={placeholder}
              focusBorderColor="#235dff"
            />
          )}
          {type === "password" ? (
            <InputRightElement pointerEvents="none">
              <button
                className={showPass ? "show_eye" : ""}
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
