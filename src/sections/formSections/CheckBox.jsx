import { get } from "lodash";
import React from "react";
import styled from "styled-components";
import ErrorShow from "./ErrorShow";

const CheckBoxStyle = styled.div`
  display: block;
  width: 100%;
  padding: 16px 0;
  & > .label {
    color: #181818;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 18.2px;
    letter-spacing: 0.9px;
    padding-bottom: 5px;
    display: block;
  }
  & > .items {
    display: block;
    &.is_error {
      color: red !important;
      & > .item {
        & > span {
          color: red !important;
        }
      }
    }
    & > .item {
      color: #5b5a5a;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      display: inline-flex;
      padding: 10px 0;
      margin-right: 30px;
      cursor: pointer;
      & > span {
        display: inline-block;
        &.icon {
          padding-right: 9px;
        }
      }
    }
  }
`;
const CheckIcon = ({ is_check = false }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="19"
        rx="9.5"
        fill="white"
        stroke="#CFDBE0"
      />
      {is_check ? (
        <rect x="6" y="6" width="8" height="8" rx="4" fill="#2F43BB" />
      ) : null}
    </svg>
  );
};
const CheckBox = ({
  label = "",
  name = "",
  value = null,
  onChange,
  is_disabled = false,
  is_error = false,
  items = [],
  key_value = "id",
  key_name = "name",
}) => {
  return (
    <CheckBoxStyle>
      <label className="label">{label}</label>
      <div className={is_error ? "items is_error" : "items"}>
        {items.map((item, index) => (
          <div
            className="item"
            key={index}
            onClick={() => {
              if (!is_disabled) {
                onChange({ name: name, value: get(item, key_value, null) });
              }
            }}
          >
            <span className="icon">
              <CheckIcon
                is_check={value ? value === get(item, key_value, null) : false}
              />
            </span>
            <span>{get(item, key_name, "")}</span>
          </div>
        ))}
      </div>
      <div>
        <ErrorShow show_error={is_error} />
      </div>
    </CheckBoxStyle>
  );
};

export default CheckBox;
