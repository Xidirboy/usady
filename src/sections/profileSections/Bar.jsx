import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const BarStyle = styled.div`
  margin: 30px 0;
  & .p_bar {
    width: 350px;
    min-width: 350px;
    margin-right: 30px;
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
          <NavLink to="/sadsda" className={"b_link"}>
            asdfds
          </NavLink>
          <NavLink to="/sadsda" className={"b_link"}>
            asdfds
          </NavLink>
          <NavLink to="/sadsda" className={"b_link"}>
            asdfds
          </NavLink>
          <NavLink to="/sadsda" className={"b_link"}>
            asdfds
          </NavLink>
        </div>
      </div>
      <div className="p_content">{children}</div>
    </BarStyle>
  );
};

export default Bar;
