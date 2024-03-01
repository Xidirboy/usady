import styled from "styled-components";

export const CounterContainer = styled.div`
  margin: 25px 0;
  & > .card {
    & > .main_titel {
      padding: 0 30px;
      @media (max-width: 576px) {
        padding: 0 16px;
      }
    }
  }
`;

export const SliderCounterContainer = styled.div`
  cursor: grab;
  & .CounterSlider {
    padding-top: 65px;
    & .item {
      border-radius: 20px;
      border: 1px solid #e6e6e6;
      background: #fff;
      padding: 20px;
      width: 280px;
      height: auto;
      @media (max-width: 576px) {
        padding: 16px;
      }
      & > .count {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 12px;
        & > .counter {
          color: #3648aa;
          text-align: center;
          font-size: 60px;
          font-style: normal;
          font-weight: 900;
          background: #eff2fb;
          box-shadow: 0px 0px 10px 0px rgba(0, 34, 125, 0.1) inset;
          border-radius: 50%;
          width: 135px;
          height: 135px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: -80px;
        }
      }
      & > .title {
        color: #000;
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 27px; /* 135% */
        letter-spacing: 1px;
        margin-bottom: 8px;
      }
      & > .text {
        color: #5b5a5a;
        text-align: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 27px; /* 150% */
      }

      &:hover {
        & .counter,
        & .title {
          color: #00aa58;
        }
      }
    }
  }
`;
