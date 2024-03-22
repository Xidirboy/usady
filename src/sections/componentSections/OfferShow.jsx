import React from "react";
import styled from "styled-components";
import {
  dateIcon,
  hotelIcon,
  planIcon,
  usersIcon,
} from "../../assets/homeS3Icon";
import { Btn } from "../../styleComponents/GlobalStyle";
import { Link } from "react-router-dom";
import { get } from "lodash";
const OfferShowStyle = styled.div`
  padding: 30px;
  border-top: 2px dashed #235dff4d;
  @media (max-width: 900px) {
    padding: 15px;
  }
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
  & .atributes {
    align-items: flex-end;
    @media (max-width: 900px) {
      flex-direction: column;
      align-items: flex-start;
    }
    & .params {
      & .param {
        padding-top: 10px;
        justify-content: left;
        & .label {
          font-size: 20px;
          font-weight: 300;
          line-height: 32px;
          text-align: left;
          margin-right: 10px;
          @media (max-width: 900px) {
            font-size: 16px;
            line-height: 25.6px;
            margin-right: 5px;
          }
          & svg {
            margin-right: 10px;
            @media (max-width: 900px) {
              width: 25px;
              height: 25px;
              margin-right: 5px;
            }
          }
        }
        & .value {
          font-size: 24px;
          font-weight: 600;
          line-height: 38.4px;
          text-align: left;
          @media (max-width: 900px) {
            font-size: 18px;
            line-height: 28.8px;
          }
          & a {
            color: #235dff !important;
            text-decoration: underline !important;
            opacity: 0.9;
            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
    & .offer_price {
      @media (max-width: 900px) {
        margin-top: 10px;
      }
      @media (max-width: 500px) {
        width: 100%;
      }
      & button {
        padding: 10px 50px;
      }
    }
  }
`;
const OfferShow = ({ offer, app }) => {
  return (
    <OfferShowStyle>
      <div className="i_title">Предложение № {offer?.id}</div>
      <div className="ds_flex route">
        <span>{get(app, "from_r.name_translate", "")}</span>
        <span className="icon">{planIcon}</span>
        <span>{get(app, "to_r.name_translate", "")}</span>
      </div>
      <div className=" ds_flex items">
        <div className="dc_flex item">
          {dateIcon} {get(app, "departure_date", "0")}, {get(app, "day", "0")}{" "}
          дней
        </div>
      </div>
      <div className="ds_flex atributes">
        <div className="params">
          <div className="dc_flex param">
            <div className="ds_flex label">{hotelIcon} Отель:</div>
            <div className="value">{offer?.hotel}</div>
          </div>
          <div className="dc_flex param">
            <div className="ds_flex label">{hotelIcon} Тип номера:</div>
            <div className="value">{offer?.room_type}</div>
          </div>
          <div className="dc_flex param">
            <div className="ds_flex label">{hotelIcon} Туристов:</div>
            <div className="value">
              {offer?.people_count} взрослых, {offer?.children_count} детей
            </div>
          </div>
          <div className="dc_flex param">
            <div className="ds_flex label">{hotelIcon} Питание:</div>
            <div className="value">{offer?.nutrition}</div>
          </div>
          <div className="dc_flex param">
            <div className="ds_flex label">{hotelIcon} Класс самолета:</div>
            <div className="value">{offer?.aircraft_class}</div>
          </div>
        </div>
        <div className="dc_flex offer_price">
          <Btn>{offer?.price} $</Btn>
        </div>
      </div>
    </OfferShowStyle>
  );
};

export default OfferShow;
