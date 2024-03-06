import styled from "styled-components";
import ShowTitle from "../../sections/utilsSections/ShowTitle";
import AppInfo from "../../sections/componentSections/AppInfo";
import { Btn } from "../../styleComponents/GlobalStyle";
const MyAppStyle = styled.div`
  & .apps {
    padding-top: 30px;
    padding-bottom: 50px;
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
            & span {
              font-size: 32px;
              font-weight: 600;
              line-height: 34px;
              letter-spacing: -0.5;
            }
          }
          & .btn_target {
            width: 450px;
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
  return (
    <MyAppStyle>
      <ShowTitle title="Мои заявки"></ShowTitle>
      <div className="container_main ">
        <div className="apps">
          <div className="ds_flex app">
            <div className="app_info">
              <AppInfo />
              <div className="ds_flex footer_app">
                <div className="count">
                  Ответов: <span>56</span>
                </div>
                <div className="btn_target">
                  <Btn>Посмотреть все предложения</Btn>
                </div>
              </div>
            </div>
            <div className="app_v"></div>
          </div>
          <div className="ds_flex app">
            <div className="app_info">
              <AppInfo />
              <div className="ds_flex footer_app">
                <div className="count">
                  Ответов: <span>56</span>
                </div>
                <div className="btn_target">
                  <Btn>Посмотреть все предложения</Btn>
                </div>
              </div>
            </div>
            <div className="app_v"></div>
          </div>
        </div>
      </div>
    </MyAppStyle>
  );
};
export default MyApp;
