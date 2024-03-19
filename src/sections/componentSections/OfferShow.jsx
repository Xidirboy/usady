import React from "react";
import styled from "styled-components";
import { dateIcon, planIcon, usersIcon } from "../../assets/homeS3Icon";
const OfferShowStyle = styled.div`
  padding: 30px;
  border-top: 2px dashed #235dff4d;
  & .i_title {
    font-size: 26px;
    font-weight: 600;
    line-height: 42px;
    letter-spacing: 0em;
    color: #2b3f5a;
    text-align: left;
    padding-bottom: 20px;
    @media (max-width: 900px) {
      padding-bottom: 10px;
      font-size: 20px;
      font-weight: 400;
      line-height: 26px;
    }
  }
  & .route {
    justify-content: left;
    flex-wrap: wrap;
    padding-bottom: 24px;
    @media (max-width: 900px) {
      padding-bottom: 10px;
    }
    & span {
      font-size: 24px;
      font-weight: 500;
      line-height: 34px;
      letter-spacing: -0.52px;
      text-align: left;
      @media (max-width: 900px) {
        font-size: 20px;
      }
    }
    & .icon {
      padding: 0 30px;
      @media (max-width: 900px) {
        padding: 0 15px;
      }
    }
  }
  & .items {
    justify-content: left;
    flex-wrap: wrap;
    margin: -5px;
    padding-right: 150px;
    @media (max-width: 900px) {
      padding-right: 0px;
    }
    & .item {
      background: #ebf7ff;
      padding: 20px;
      border-radius: 10px;
      font-size: 24px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.2px;
      margin: 5px;
      @media (max-width: 900px) {
        font-size: 15px;
        line-height: 12px;
        letter-spacing: 0.12px;
        padding: 10px;
        border-radius: 6px;
      }
      & svg {
        width: 25px;
        height: 25px;
        margin-right: 10px;
        @media (max-width: 900px) {
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
        /* & path {
          fill: #235dff;
        } */
      }
    }
  }
  & .atributes{

  }
`;
const OfferShow = () => {
  return (
    <OfferShowStyle>
      <div className="i_title">Предложение № 1</div>
      <div className="ds_flex route">
        <span>Узбекистан, ташкент</span>
        <span className="icon">{planIcon}</span>
        <span>Турция, стамбул</span>
      </div>
      <div className=" ds_flex items">
        <div className="dc_flex item">
          {dateIcon} 29.01.2024 - 30.01.2024, 7 дней
        </div>
      </div>
      <div className="ds_flex atributes">
        <div className="params"></div>
        <div className="dc_flex"></div>
      </div>
    </OfferShowStyle>
  );
};

export default OfferShow;
