import styled from "styled-components";

const ShowTitleStyle = styled.div`
  & .show_target {
    border-radius: 20px 20px 100px 100px;
    background-image: url("/images/global/fon.png");
    max-width: 1770px;
    margin: auto;
    & .title {
      font-size: 36px;
      font-weight: 600;
      line-height: 43px;
      letter-spacing: 0.2px;
      text-align: center;
      color: #fff;
      padding-top: 40px;
    }
    & .children {
      padding: 20px 0;
    }
  }
`;
const ShowTitle = ({ children, title = "", bgColor = "#235DFF" }) => {
  return (
    <ShowTitleStyle>
      <div className="show_target" style={{ backgroundColor: bgColor }}>
        <div className="title">{title}</div>
        <div className="children">{children}</div>
      </div>
    </ShowTitleStyle>
  );
};

export default ShowTitle;
