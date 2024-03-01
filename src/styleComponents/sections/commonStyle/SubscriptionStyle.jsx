import styled from "styled-components";

export const SubscriptionContainer = styled.div`
  margin: 25px 0;
`;

export const SliderSubscriptionContainer = styled.div`
  cursor: grab;
  & .subscriptionSwiper {
    & .item {
      width: 580px;
      max-width: calc(100% - 30px);
      height: auto;
      border-radius: 20px;
      background: #fff;
      box-shadow: 0px 0px 20px 0px rgba(0, 34, 125, 0.1);
      display: flex;
      align-items: center;
      padding: 30px;
      @media (max-width: 768px) {
        flex-direction: column-reverse;
      }
      @media (max-width: 576px) {
        padding: 30px 16px;
      }
      & > .section1 {
        width: 55%;
        @media (max-width: 768px) {
          width: 100%;
        }
        & > .top_text {
          border-radius: 0px 90px 90px 0px;
          background: #00aa58;
          color: #fff;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 14px; /* 192.857% */
          letter-spacing: 0.7px;
          padding: 6px 25px 6px 14px;
          display: inline-block;
          margin: 0 0 24px -30px;
          @media (max-width: 576px) {
            margin-left: -16px;
          }
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
          line-height: 27px;
          padding: 6px 0 25px 0;
        }
        & > .btns {
          & button {
            padding: 16px 25px;
          }
        }
      }
      & > .section2 {
        width: 45%;
        display: flex;
        justify-content: right;
        align-items: center;
        @media (max-width: 768px) {
          width: 100%;
          justify-content: center;
          padding-bottom: 16px;
        }
        & > img {
          width: 90%;
          @media (max-width: 768px) {
            max-width: 200px;
          }
        }
      }
      &:hover {
        & .title {
          color: #00aa58;
        }
      }
    }
  }
`;
