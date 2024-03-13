import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { lockIcon, notifiIcon, userIcon } from "../../assets/authIcons";
const BarStyle = styled.div`
  margin: 30px 0;
  align-items: flex-start;
  & .p_bar {
    border-radius: 5px;
    width: 350px;
    min-height: 300px;
    min-width: 350px;
    margin-right: 30px;
    box-shadow: 0px 22.7px 60.5px 0px #c7ceda40;
    & .bar_links {
      & .b_link {
        padding: 10px 20px 10px 10px;
        justify-content: left;
        width: 100%;
        font-size: 26px;
        font-weight: 400;
        line-height: 29px;
        letter-spacing: 0em;
        text-align: left;
        color: #60636c !important;
        margin-bottom: 10px;
        & .p_icon {
          padding: 0 10px;
          & svg {
            width: 30px;
            height: 30px;
            & path {
              fill: #cacad2;
            }
          }
        }
        &:hover,
        &.active {
          background: #235dff80;
          color: #fff !important;
          border-radius: 5px;
          & .p_icon {
            & svg {
              & path {
                fill: rgb(35, 93, 255);
              }
            }
          }
        }
      }
    }
  }
  & .p_content {
    width: 100%;
  }
`;
const Bar = ({ children }) => {
  return (
    <BarStyle className="container_main ds_flex">
      <div className="p_bar">
        <div className="bar_links">
          <NavLink to="/profile" className={"ds_flex b_link"}>
            <span className="p_icon">{userIcon}</span> Профиль
          </NavLink>
          <NavLink to="/sadsda" className={"ds_flex b_link"}>
            <span className="p_icon">{notifiIcon}</span> Уведомления
          </NavLink>
          <NavLink to="/sadsda" className={"ds_flex b_link"}>
            <span className="p_icon">{lockIcon}</span> Безопасность
          </NavLink>
          <NavLink to="/sadsda" className={"ds_flex b_link"}>
            <span className="p_icon">{userIcon}</span> Выйти
          </NavLink>
        </div>
      </div>
      <div className="p_content">{children}</div>
    </BarStyle>
  );
};

export default Bar;
