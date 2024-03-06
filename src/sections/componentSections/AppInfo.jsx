import React from "react";
import styled from "styled-components";
import { planIcon } from "../../assets/homeS3Icon";
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
    </AppInfoStyle>
  );
};

export default AppInfo;
