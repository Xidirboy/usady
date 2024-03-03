import {
  FormControl,
  //   FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import styled from "styled-components";

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
      & .chakra-input__left-element {
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
const InputUi = ({ label, placeholder = "", type = "text" }) => {
  return (
    <InputUiStyle>
      <FormControl>
        {label ? <FormLabel>{label}</FormLabel> : null}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.2185 19.4999C6.86434 19.4999 4 18.978 4 16.8877C4 14.7973 6.84617 12.8677 10.2185 12.8677C13.5726 12.8677 16.4369 14.7786 16.4369 16.869C16.4369 18.9584 13.5908 19.4999 10.2185 19.4999Z"
                fill="#9E9E9E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.2125 9.9711C12.4137 9.9711 14.1977 8.18708 14.1977 5.98596C14.1977 3.78485 12.4137 2 10.2125 2C8.01143 2 6.22659 3.78485 6.22659 5.98596C6.21915 8.17965 7.99078 9.96367 10.1845 9.9711C10.1944 9.9711 10.2035 9.9711 10.2125 9.9711Z"
                fill="#9E9E9E"
              />
            </svg>
          </InputLeftElement>
          {type === "number" ? (
            <Input
              type={type}
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
        </InputGroup>
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
    </InputUiStyle>
  );
};

export default InputUi;
