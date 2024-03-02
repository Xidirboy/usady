import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import LanSelect from "./headerSections/LanSelect";
const HeaderStyle = styled.div`
  & .navs {
    border-bottom: 1px solid #235dff;
  }
  & .left_nav {
    padding: 20px 0;
    & .logo {
      & img {
      }
    }
  }
  & .right_nav {
    & .right_links {
      & .r_link {
        margin: 0 20px;
      }
    }
  }
`;
const Header = () => {
  return (
    <HeaderStyle className="container_main">
      <div className="ds_flex navs">
        <div className=" left_nav ">
          <Link to="/" className="logo">
            <img src="/images/logo.svg" />
          </Link>
        </div>
        <div className="ds_flex right_nav">
          <div className="right_links">
            <NavLink to={"/contacts"} className={"r_link"}>
              Контакты
            </NavLink>
            <NavLink to={"/abaut"} className={"r_link"}>
              О компании
            </NavLink>
          </div>
          <div className="lan">
            <LanSelect />
          </div>
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
