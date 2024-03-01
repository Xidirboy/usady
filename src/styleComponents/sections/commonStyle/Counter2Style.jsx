import styled from "styled-components";

export const Counter2Container = styled.div`
  margin: 25px 0;
  & > .card {
    display: flex;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    & > .title {
      width: 330px;
      display: flex;
      align-items: center;
      @media (max-width: 768px) {
        width: 100%;
      }
      & > .main_titel {
        padding: 0 0 0 30px;
        @media (max-width: 576px) {
          padding: 0 16px;
        }
      }
    }
    & > .slider_t {
      padding-left: 20px;
      width: calc(100% - 330px);
      @media (max-width: 768px) {
        padding-left: 0px;
        width: 100%;
      }
    }
  }
`;

export const SliderCounter2Container = styled.div`
  cursor: grab;
  & .Counter2Slider {
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
        & > .counter2 {
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
        & .counter2,
        & .title {
          color: #00aa58;
        }
      }
    }
  }
`;
