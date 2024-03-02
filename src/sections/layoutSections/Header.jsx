import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
const HeaderStyle = styled.div``;
const Header = () => {
  return (
    <HeaderStyle className="container_main">
      <div className="ds_flex navs">
        <div className=" left_nav ">
          <Link to="/">
            <img src="/images/logo.svg" />
          </Link>
        </div>
        <div className="ds_flex right_nav">
          <div className="right_links">
            <NavLink to={"/"}>Контакты</NavLink>
            <NavLink to={"/"}>О компании</NavLink>
          </div>
          <div className="lan">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
