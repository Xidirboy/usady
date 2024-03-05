import React from "react";
import styled from "styled-components";
const Section3Style = styled.div`
  background-image: url("/images/home/s31.png");
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  & .form_target {
    background-color: #fff;
    max-width: 729px;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0px 5.4px 5.47px 0px #235dff40;
    border: 1.34px solid #eeeeee;
    margin: auto;
    & .title_s3 {
      font-size: 32px;
      font-weight: 600;
      line-height: 51px;
      letter-spacing: 0.27px;
      text-align: center;
    }
  }
`;
const Section3 = () => {
  return (
    <Section3Style>
      <div className="form_target">
        <div className="title_s3">Подать заявку</div>
      </div>
    </Section3Style>
  );
};

export default Section3;
