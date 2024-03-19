import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  accountIcon,
  favoriteIcon,
  homeIcon,
  turIcon,
} from "../../../assets/headIcons";
const MobileTabStyle = styled.div`
  display: none;
  height: 60px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  border-top: 0.5px solid #235dff;
  justify-content: space-around;
  @media (max-width: 900px) {
    display: flex;
  }
  & .link {
    cursor: pointer;
    & .icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & .title {
      color: #9e9e9e;
      font-size: 10px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.2px;
      text-align: center;
    }
    &:hover,
    &.active {
      & .icon {
        & path {
          fill: #235dff;
        }
      }
      & .title {
        font-weight: 700;
        color: #235dff;
      }
    }
  }
`;
const MobileTab = () => {
  return (
    <MobileTabStyle className="ds_flex">
      <NavLink className="link" to="/">
        <div className="icon">{homeIcon}</div>
        <div className="title">Главная</div>
      </NavLink>
      {/* <NavLink className='link' to="#">
        <div className="icon">{favoriteIcon}</div>
        <div className="title">Избранные</div>
      </NavLink> */}
      {/* <NavLink className='link' to="#">
        <div className="icon">{turIcon}</div>
        <div className="title">Горящие туры</div>
      </NavLink> */}
      <NavLink className="link" to="/profile">
        <div className="icon">{accountIcon}</div>
        <div className="title">Аккаунт</div>
      </NavLink>
    </MobileTabStyle>
  );
};

export default MobileTab;
