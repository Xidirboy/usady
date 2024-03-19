import styled from "styled-components";
import ShowTitle from "../../sections/utilsSections/ShowTitle";
import AppInfo from "../../sections/componentSections/AppInfo";
import { Btn } from "../../styleComponents/GlobalStyle";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Axios from "../../utils/httpClient";
const MyAppStyle = styled.div`
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
`;
const MyApp = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState({});
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    Axios()
      .get("api/v1/application/list")
      .then((r) => {
        setList(r?.data?.data ?? {});
      })
      .catch((e) => {})
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
  return (
    <MyAppStyle>
      <ShowTitle title="Мои заявки"></ShowTitle>
      <div className="container_main ">
        <div className="apps">
          {list?.data?.map((item, index) => (
            <div className="ds_flex app" key={index}>
              <div className="app_info">
                <AppInfo item={item} />
                <div className="ds_flex footer_app">
                  <div className="count">
                    Ответов: <span>56</span>
                  </div>
                  <div className="btn_target">
                    <Btn>
                      Посмотреть все предложения
                      <span className="btn__c">- 56</span>
                    </Btn>
                  </div>
                </div>
              </div>
              <div className="app_v"></div>
            </div>
          ))}
        </div>
      </div>
    </MyAppStyle>
  );
};
export default MyApp;
