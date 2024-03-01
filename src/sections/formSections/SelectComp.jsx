import React from "react";
import ReactSelect from "react-select";
import styled from "styled-components";
import ErrorShow from "./ErrorShow";

const SelectStyle = styled.div`
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
`;
const SelectComp = ({
  label = "",
  name = "name",
  value = "",
  onChange = () => {},
  className = "",
  is_error = false,
  is_disabled = false,
  options = [],
  placeholder = "",
  is_multi,
}) => {
  return (
    <SelectStyle>
      <label className="label">{label}</label>
      <ReactSelect
        name={name}
        value={value}
        onChange={onChange}
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
            borderColor: is_error ? "red !important" : "rgb(207, 219, 224)",
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
      <ErrorShow show_error={is_error} />
    </SelectStyle>
  );
};

export default SelectComp;
