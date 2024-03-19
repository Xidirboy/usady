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
import OfferShow from "./OfferShow";
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
      <div className="offer_items">
        <OfferShow />
      </div>

      
    </OfferInfoStyle>
  );
};

export default OfferInfo;
