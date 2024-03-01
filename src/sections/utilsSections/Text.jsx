import React from "react";
import styled from "styled-components";

const TextStyle = styled.p`
  margin: 0;
  padding: 0;
  background: transparent;
  color: #353434;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px; /* 135% */
  letter-spacing: 1px;
  @media (max-width: 576px) {
    font-size: 18px;
  }
`;
const Text = ({ word = "", className = "" }) => {
  return (
    <TextStyle
      className={className}
      dangerouslySetInnerHTML={{ __html: word }}
    />
  );
};

export default Text;
