import styled from "styled-components";

const ShowTitleStyle = styled.div`
  & .show_target {
    border-radius: 20px 20px 100px 100px;
    background-image: url("/images/global/fon.png");
    background-repeat: repeat;
    background-size: 100%;
    max-width: 1770px;
    margin: auto;

    @media (max-width: 900px) {
      border-radius: 0 0 20px 20px;
    }
    & .title {
      font-size: 36px;
      font-weight: 600;
      line-height: 43px;
      letter-spacing: 0.2px;
      text-align: center;
      color: #fff;
      padding-top: 40px;
      @media (max-width: 900px) {
        font-size: 24px;
        font-weight: 700;
        line-height: 38px;
        letter-spacing: 0em;
        padding-top: 20px;
      }
    }
    & .children {
      padding: 20px 0;
      @media (max-width: 900px) {
        padding: 10px 0;
      }
    }
  }
`;
const ShowTitle = ({ children, title = "", bgColor = "#235DFF" }) => {
  return (
    <ShowTitleStyle>
      <div className="show_target" style={{ backgroundColor: bgColor }}>
        <div className="title">
          <div className="container_main">{title}</div>
        </div>
        <div className="children">
          <div className="container_main">{children}</div>
        </div>
      </div>
    </ShowTitleStyle>
  );
};

export default ShowTitle;
