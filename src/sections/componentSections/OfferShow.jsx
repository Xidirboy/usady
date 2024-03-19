import React from "react";
import styled from "styled-components";
const OfferShowStyle = styled.div`
  padding: 30px;
  border-top: 2px dashed #235dff4d;
  & .o_title {
    font-size: 26px;
    font-weight: 600;
    line-height: 41.6px;
    text-align: left;
  }
`;
const OfferShow = () => {
  return (
    <OfferShowStyle>
      <div className="o_title">Предложение № 1</div>
    </OfferShowStyle>
  );
};

export default OfferShow;
