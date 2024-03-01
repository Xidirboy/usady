import React from "react";
import styled from "styled-components";
const CardStyle = styled.div`
  display: block;
  width: 100%;
  border-radius: 20px;
  background: #fff;
  padding: 20px;
  box-shadow: rgba(0, 34, 125, 0.1) 0px 0px 20px 0px;
  min-height: 100px;
  margin-bottom: 20px;
`;
const Card = ({ children, className = "" }) => {
  return <CardStyle className={className}>{children}</CardStyle>;
};

export default Card;
