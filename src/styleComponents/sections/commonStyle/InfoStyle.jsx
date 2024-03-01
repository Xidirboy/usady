import styled from "styled-components";

export const InfoContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px;
    border-radius: 20px;
    background: #fff;
    @media (max-width: 576px) {
      padding: 30px 16px;
    }
    & > .text {
      margin-top: 14px;
    }
  }
`;

export const SliderInfoContainer = styled.div`
  cursor: grab;
  padding-top: 30px;
  @media (max-width: 576px) {
    padding-top: 16px;
  }
  & .infoSlider {
    & .item {
      border-radius: 20px;
      border: 1px solid #e6e6e6;
      background: #fff;
      padding: 24px 20px;
      width: 370px;
      max-width: calc(100% - 30px);
      height: auto;
      @media (max-width: 576px) {
        padding: 20px 16px;
      }
      & > .title {
        color: #000;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 27px; /* 135% */
        letter-spacing: 1px;
      }
      & > .text {
        color: #5b5a5a;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 27px; /* 150% */
      }
      &:hover {
        & .title {
          color: #00aa58;
        }
      }
    }
  }
`;
