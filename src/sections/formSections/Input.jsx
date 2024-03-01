import React, { useState } from "react";
import InputMask from "react-input-mask";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ReactSelect from "react-select";
import ErrorShow from "./ErrorShow";

const InputStyle = styled.label`
  display: block;
  width: 100%;
  padding: 14px 0;
  & > .label {
    color: #181818;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 18.2px; /* 101.111% */
    letter-spacing: 0.9px;
    padding-bottom: 15px;
    display: block;
    padding-bottom: 14px;
  }
  & > .i_target {
    display: flex;
    width: 100%;
    align-items: center;
    & > .input_body {
      border-radius: 10px;
      border: 1px solid #cfdbe0;
      padding: 16px 18px;
      width: 100%;
      display: flex;
      align-items: center;
      @media (max-width: 576px) {
        padding: 10px;
      }
      & > .show_icon {
        font-size: 24px;
        cursor: pointer;
      }
      & > input,
      & > select,
      textarea {
        color: #000;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 27px; /* 135% */
        letter-spacing: 1px;
        width: 100%;
        border: none;
        &:focus {
          border: none !important;
          outline: 0 !important;
        }
        &:disabled {
          background: #f7f9fd;
          color: #c5cacf;
        }
      }
      & > textarea {
        height: 200px;
      }
      &.disabled {
        background: #f7f9fd;
        & > input,
        & > select {
          background: #f7f9fd;
          color: #c5cacf;
        }
      }
      &.is_error {
        border-color: red;
      }
    }
    & > .input_icon {
      padding: 0 20px;
      &.has_value {
        & circle {
          stroke: #00aa58;
        }
        & path {
          fill: #00aa58;
        }
      }
    }
  }
`;
const iconHas = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="15" cy="15" r="14.5" fill="white" stroke="#cfdbe0" />
    <path
      d="M23.605 9.38738C23.079 8.87071 22.2249 8.87104 21.6982 9.38738L13.1164 17.8063L9.30212 14.0646C8.77544 13.548 7.9217 13.548 7.39501 14.0646C6.86833 14.5813 6.86833 15.4188 7.39501 15.9355L12.1626 20.6124C12.4258 20.8706 12.7709 21 13.116 21C13.4611 21 13.8066 20.8709 14.0697 20.6124L23.605 11.2582C24.1317 10.7419 24.1317 9.90401 23.605 9.38738Z"
      fill="#cfdbe0"
    />
  </svg>
);
const Input = ({
  label = "",
  name = "name",
  type = "text",
  value = "",
  onChange = () => {},
  className = "",
  is_icon = true,
  is_icon_comp = false,
  is_disabled = false,
  is_error = false,
  mask = "",
  options = [],
  placeholder = "",
  is_multi = false,
}) => {
  const [show, setShow] = useState(false);
  const showSelectValue = (v) => {
    let s_value = {};
    options.forEach((item) => {
      if (v === item?.value) {
        s_value = item;
      }
    });
    return s_value;
  };
  const onSelectChange = (v) => {
    onChange({ target: { value: v?.value, name: name }, select_value: v });
  };
  return (
    <InputStyle className={className} htmlFor={name}>
      {label && <div className="label">{label}</div>}
      {options?.length ? (
        <ReactSelect
          name={name}
          value={showSelectValue(value)}
          onChange={onSelectChange}
          options={options}
          className={className}
          placeholder={placeholder}
          isDisabled={is_disabled}
          isMulti={is_multi}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: 10,
              border: "1px solid rgb(207, 219, 224)",
              borderColor: is_error
                ? "red !important"
                : "rgb(207, 219, 224) !important",
              boxShadow: "none",
            }),
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              padding: "14px 18px",
              "@media (max-width: 576px)": {
                padding: "8px 10px",
              },
            }),
          }}
        />
      ) : (
        <div className="i_target">
          <div
            className={
              is_disabled
                ? `input_body disabled`
                : is_error
                ? "input_body is_error"
                : "input_body"
            }
          >
            {
              // options?.length ? (
              //   <select
              //     placeholder={placeholder}
              //     name={name}
              //     disabled={is_disabled}
              //     onChange={(e) => onChange(e)}
              //     value={value ?? null}
              //   >
              //     <option hidden selected value={null} key="-1">
              //       {placeholder}
              //     </option>
              //     {options?.map((item, index) => (
              //       <option
              //         value={item?.value}
              //         key={index}
              //         disabled={item?.disabled}
              //       >
              //         {item?.label}
              //       </option>
              //     ))}
              //   </select>
              // ) :
              mask ? (
                <InputMask
                  mask={mask}
                  placeholder={placeholder}
                  name={name}
                  disabled={is_disabled}
                  onChange={(e) => onChange(e)}
                  value={value}
                  maskChar="_"
                  alwaysShowMask={false}
                  formatChars={{
                    n: "[0-9]",
                    a: "[A-Za-z]",
                    "*": "[A-Za-z0-9]",
                  }}
                />
              ) : type === "textarea" ? (
                <textarea
                  name={name}
                  placeholder={placeholder}
                  disabled={is_disabled}
                  onChange={(e) => onChange(e)}
                  value={value}
                ></textarea>
              ) : (
                <>
                  <input
                    type={
                      type === "password" ? (show ? "text" : "password") : type
                    }
                    name={name}
                    // onfocus="this.showPicker()"
                    placeholder={placeholder}
                    disabled={is_disabled}
                    onChange={(e) => onChange(e)}
                    value={value}
                  />
                  {type === "password" && (
                    <span className="show_icon" onClick={() => setShow(!show)}>
                      {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                  )}
                </>
              )
            }
          </div>
          {is_icon && (
            <div
              className={is_icon_comp ? "input_icon has_value" : "input_icon"}
            >
              {iconHas}
            </div>
          )}
        </div>
      )}
      <div className="input_error_target">
        <ErrorShow show_error={is_error} />
      </div>
    </InputStyle>
  );
};

export default Input;
