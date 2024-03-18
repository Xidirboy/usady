import React from "react";
import ShowTitle from "../../sections/utilsSections/ShowTitle";
import AppInfo from "../../sections/componentSections/AppInfo";
import { Btn } from "../../styleComponents/GlobalStyle";
import styled from "styled-components";
const AppViewStyle = styled.div`
  & .apps {
    padding-top: 30px;
    padding-bottom: 50px;
    @media (max-width: 900px) {
      padding-top: 20px;
      padding-bottom: 30px;
    }
    & .app {
      align-items: stretch;
      margin-bottom: 30px;
      @media (max-width: 900px) {
        margin-bottom: 15px;
      }
      & .app_info {
        border: 1px solid #e0e0e0;
        background-color: #fff;
        box-shadow: 0px 22.7px 60.5px 0px #c7ceda40;
        width: 100%;
        border-radius: 15.13px;
        @media (max-width: 900px) {
          border-radius: 10px;
        }
        & .footer_app {
          border-top: 2px dashed #235dff4d;
          padding: 30px;
          @media (max-width: 900px) {
            padding: 15px;
          }
          & .count {
            font-size: 26px;
            font-weight: 400;
            line-height: 34px;
            letter-spacing: -0.5px;
            @media (max-width: 900px) {
              display: none;
            }
            & span {
              font-size: 32px;
              font-weight: 600;
              line-height: 34px;
              letter-spacing: -0.5;
            }
          }
          & .btn_target {
            width: 450px;
            & .btn__c {
              display: none;
              @media (max-width: 900px) {
                display: inline-block;
                margin-left: 5px;
              }
            }
          }
        }
        & .desc_t {
          padding: 0 30px 30px 30px;
          @media (max-width: 900px) {
            padding: 0 15px 15px 15px;
          }
          & .desc_title {
            font-size: 24px;
            font-weight: 500;
            line-height: 34.4px;
            letter-spacing: -0.5px;
            text-align: left;
            padding-bottom: 10px;
            @media (max-width: 900px) {
              font-size: 16px;
              line-height: 17px;
              letter-spacing: -0.25px;
              padding-bottom: 5px;
            }
          }
          & .desc_text {
            font-size: 20px;
            font-weight: 500;
            line-height: 32.05px;
            letter-spacing: 0.26px;
            text-align: left;
            @media (max-width: 900px) {
              font-size: 12px;
              line-height: 16px;
              letter-spacing: -0.125px;
            }
          }
        }
      }
      & .app_v {
        width: 290px;
        min-width: 290px;
        background: #d9d9d9;
        margin-left: 30px;
        @media (max-width: 1200px) {
          display: none;
        }
      }
    }
  }
  & .offers {
    & .o_title {
      font-size: 32px;
      font-weight: 600;
      line-height: 51.2px;
      letter-spacing: 0.27px;
      text-align: left;
      padding-bottom: 30px;
      @media (max-width: 900px) {
        padding-bottom: 15px;
        font-size: 20px;
        line-height: 32px;
      }
    }
  }
`;
const AppView = () => {
  return (
    <AppViewStyle>
      <ShowTitle title="Мои заявки"></ShowTitle>
      <div className="container_main ">
        <div className="apps">
          <div className="ds_flex app">
            <div className="app_info">
              <AppInfo />
              {/* <div className="ds_flex footer_app">
                <div className="count">
                  Ответов: <span>56</span>
                </div>
                <div className="btn_target">
                  <Btn>
                    Посмотреть все предложения
                    <span className="btn__c">- 56</span>
                  </Btn>
                </div>
              </div> */}
              <div className="desc_t">
                <div className="desc_title">Описание</div>
                <div className="desc_text">
                  Описание описание описание Описание описание описание Описание
                  описание описание Описание описание описание Описание описание
                  описание Описание описание описание
                </div>
              </div>
            </div>
            <div className="app_v"></div>
          </div>
        </div>
        <div className="offers">
          <div className="o_title">Предложение от Турагентов</div>
        </div>
      </div>
    </AppViewStyle>
  );
};

export default AppView;
