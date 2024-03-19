import React from "react";
import styled from "styled-components";
import {
  cashIcon,
  planIcon,
  starIcon,
  usersIcon,
} from "../../assets/homeS3Icon";
import { Link } from "react-router-dom";
import { Btn } from "../../styleComponents/GlobalStyle";
const OfferInfoStyle = styled.div`
  border: 1px solid #e0e0e0;
  background-color: #fff;
  box-shadow: 0px 22.7px 60.5px 0px #c7ceda40;
  width: 100%;
  border-radius: 15.13px;
  margin-bottom: 30px;
  @media (max-width: 900px) {
    border-radius: 10px;
    margin-bottom: 15px;
  }
  & .company {
    padding: 30px;
    & .comp {
      & .comp_logo {
        width: 100px;
        height: 100px;
      }
      & .com_name {
        padding-left: 20px;
        & .name {
          font-size: 26px;
          font-weight: 600;
          line-height: 41.6px;
          text-align: left;
        }
        & .star {
          font-size: 26px;
          font-weight: 600;
          line-height: 41.6px;
          text-align: left;
          justify-content: left;
        }
      }
    }
    & .links {
      & button {
        background: #46bb92;
        padding: 10px 50px;
      }
    }
  }
  & .i_title {
    font-size: 26px;
    font-weight: 600;
    line-height: 42px;
    letter-spacing: 0em;
    color: #2b3f5a;
    text-align: left;
    padding-bottom: 30px;
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
      }
    }
  }
`;
const OfferInfo = () => {
  return (
    <OfferInfoStyle>
      <div className="ds_flex company">
        <div className="dc_flex comp">
          <img
            className="comp_logo"
            src="/images/profile/com_logo.png"
            alt="com_logo"
          />
          <div className="com_name">
            <div className="name">Best Travel</div>
            <div className="ds_flex star">4 {starIcon}</div>
          </div>
        </div>
        <div className="links">
          <Link to="#">
            <Btn>Написать</Btn>
          </Link>
        </div>
      </div>

      
      <div className="i_title">Заявка № 1233</div>
      <div className="ds_flex route">
        <span>Узбекистан, ташкент</span>
        <span className="icon">{planIcon}</span>
        <span>Турция, стамбул</span>
      </div>
      <div className=" ds_flex items">
        <div className="dc_flex item star">{starIcon}3-5</div>
        <div className="dc_flex item">{usersIcon}2 взрослых</div>
        <div className="dc_flex item">{cashIcon}15 000 000 сумм</div>
      </div>
    </OfferInfoStyle>
  );
};

export default OfferInfo;
