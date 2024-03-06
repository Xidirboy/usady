import React from "react";
import styled from "styled-components";
import {
  cashIcon,
  planIcon,
  starIcon,
  usersIcon,
} from "../../assets/homeS3Icon";
const AppInfoStyle = styled.div`
  & .i_title {
    font-size: 26px;
    font-weight: 600;
    line-height: 42px;
    letter-spacing: 0em;
    color: #2b3f5a;
    text-align: left;
  }
  & .route {
    justify-content: left;
    flex-wrap: wrap;
    & span {
      font-size: 24px;
      font-weight: 500;
      line-height: 34px;
      letter-spacing: -0.52px;
      text-align: left;
    }
    & .icon {
      padding: 0 30px;
    }
  }
  & .items {
    justify-content: left;
    flex-wrap: wrap;
    margin: -5px;
    & .item {
      background: #ebf7ff;
      padding: 20px;
      border-radius: 10px;
      font-size: 24px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.2px;
      margin: 5px;
      & svg {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
    }
  }
`;
const AppInfo = () => {
  return (
    <AppInfoStyle>
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
    </AppInfoStyle>
  );
};

export default AppInfo;
