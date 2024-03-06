import styled from "styled-components";
import ShowTitle from "../../sections/utilsSections/ShowTitle";
import AppInfo from "../../sections/componentSections/AppInfo";
const MyAppStyle = styled.div`
  & .apps {
    padding-top: 30px;
    padding-bottom: 50px;
    & .app {
      align-items: stretch;
      & .app_info {
        border: 1px solid #e0e0e0;
        background-color: #fff;
        width: 100%;
        border-radius: 15.13px;
      }
      & .app_v {
        width: 290px;
        min-width: 290px;
        background: #d9d9d9;
        margin-left: 30px;
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
            </div>
            <div className="app_v"></div>
          </div>
        </div>
      </div>
    </MyAppStyle>
  );
};
export default MyApp;
