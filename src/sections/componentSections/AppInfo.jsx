import React from "react";
import styled from "styled-components";
import {
  babyIcon,
  cashIcon,
  dateIcon,
  planIcon,
  starIcon,
  usersIcon,
} from "../../assets/homeS3Icon";
import { get } from "lodash";
const AppInfoStyle = styled.div`
  padding: 30px;
  background-image: url("/images/profile/appinfo.png");
  background-repeat: no-repeat;
  background-position: top right;
  @media (max-width: 900px) {
    padding: 15px;
  }
  @media (max-width: 800px) {
    background-image: none;
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
const AppInfo = ({ item }) => {
  return (
    <AppInfoStyle>
      <div className="i_title">Заявка № {item?.id}</div>
      <div className="ds_flex route">
        <span>{get(item, "from_r.name_translate", "")}</span>
        <span className="icon">{planIcon}</span>
        <span>{get(item, "to_r.name_translate", "")}</span>
      </div>
      <div className=" ds_flex items">
        <div className="dc_flex item star">{starIcon}3-5</div>
        <div className="dc_flex item">
          {usersIcon}
          {get(item, "people_count", "0")} взрослых
        </div>
        <div className="dc_flex item">
          {cashIcon}
          {get(item, "price", "0")} сумм
        </div>
        <div className="dc_flex item">
          {babyIcon}
          {get(item, "children_count", "0")} взрослых
        </div>
        <div className="dc_flex item">
          {dateIcon} {get(item, "departure_date", "0")} {get(item, "day", "0")}{" "}
          дн.
        </div>
        <div className="dc_flex item">{usersIcon}2 взрослых</div>
        <div className="dc_flex item">{cashIcon}15 000 000 сумм</div>
        <div className="dc_flex item">{usersIcon}2 взрослых</div>
        <div className="dc_flex item">{cashIcon}15 000 000 сумм</div>
      </div>
    </AppInfoStyle>
  );
};

export default AppInfo;
