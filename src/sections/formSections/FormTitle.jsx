import React from "react";
import styled from "styled-components";
const FormTitleStyle = styled.div`
  width: 100%;
  display: block;
  /* color: #181818; */
  color: #103186;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 1.5px;
  padding: 12px 0;
  @media (max-width: 576px) {
    font-size: 24px;
    line-height: 25px;
  }
`;
const FormTitle = ({ word = "", className = "" }) => {
  return (
    <FormTitleStyle
      dangerouslySetInnerHTML={{ __html: word }}
      className={className}
    />
  );
};

export default FormTitle;
