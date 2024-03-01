import styled from "styled-components";

export const BannerContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px;
    border-radius: 20px;
    background: #fff;
    display: flex;
    align-items: center;
    @media (max-width: 576px) {
      padding: 30px 16px;
    }
    @media (max-width: 900px) {
      flex-direction: column-reverse;
    }
    & > .section1 {
      width: 50%;
      @media (max-width: 900px) {
        width: 100%;
        margin-top: 30px;
      }
      @media (max-width: 576px) {
        margin-top: 16px;
      }
      & > .top_text {
        border-radius: 90px;
        background: rgba(0, 170, 88, 0.1);
        padding: 8px 30px;
        color: #00aa58;
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 27px; /* 135% */
        letter-spacing: 1px;
        display: inline-block;
        margin-bottom: 30px;
        @media (max-width: 576px) {
          font-size: 18px;
          margin-bottom: 16px;
        }
      }
      & > .text {
        margin: 30px 0 30px 0;
        @media (max-width: 576px) {
          margin: 8px 0 0 0;
        }
      }
      & > .btns {
        & > a {
          margin-right: 20px;
          margin-top: 20px;
          display: inline-block;
          @media (max-width: 576px) {
            margin-top: 8px;
            margin-right: 8px;
          }
          &:last-child {
            margin-right: 0px;
          }
        }
      }
    }
    & > .section2 {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 900px) {
        width: 100%;
      }
      & > img {
        max-width: 90%;
        max-height: 350px;
        @media (max-width: 576px) {
          max-height: 250px;
        }
      }
    }
  }
`;
