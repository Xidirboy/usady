import styled from "styled-components";

export const CardsContainer = styled.div`
  margin: 25px 0;
  & > .main_titel {
    padding: 0 30px;
    margin-bottom: 20px;
    @media (max-width: 576px) {
      padding: 0 16px;
    }
  }
  & > .cards {
    display: flex;
    @media (max-width: 900px) {
      flex-direction: column;
    }
    & > .s1 {
      width: 50%;
      margin-right: 10px;
      @media (max-width: 900px) {
        width: 100%;
        margin-right: 0px;
        margin-bottom: 20px;
      }
      .item {
        height: 100%;
        border-radius: 20px;
        background: #fff;
        box-shadow: 0px 0px 20px 0px rgba(0, 34, 125, 0.1);
        display: flex;
        align-items: center;
        padding: 30px;
        @media (max-width: 576px) {
          padding: 30px 16px;
          flex-direction: column-reverse;
        }
        & > .section1 {
          width: 50%;
          @media (max-width: 576px) {
            width: 100%;
          }
          & > .top_text {
            border-radius: 0px 90px 90px 0px;
            background: #00aa58;
            color: #fff;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 27px; /* 192.857% */
            letter-spacing: 0.7px;
            padding: 0 25px 0 14px;
            display: inline-block;
            margin: 0 0 24px -30px;
            @media (max-width: 576px) {
              margin: 0 0 24px -16px;
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
          &:hover {
            & .title {
              color: #00aa58;
            }
          }
        }
        & > .section2 {
          width: 50%;
          display: flex;
          justify-content: right;
          align-items: center;
          @media (max-width: 576px) {
            width: 100%;
            justify-content: center;
            margin-bottom: 16px;
          }
          & > img {
            width: 90%;
            @media (max-width: 576px) {
              max-width: 200px;
            }
          }
        }
      }
    }
    & > .s2 {
      width: 50%;
      margin-left: 10px;
      @media (max-width: 900px) {
        width: 100%;
        margin-left: 0px;
        display: flex;
      }
      @media (max-width: 768px) {
        flex-direction: column;
      }
      & > .word {
        padding-right: 30px;
        padding-top: 30px;
        height: auto;
        border-radius: 20px;
        background: #fff;
        box-shadow: 0px 0px 20px 0px rgba(0, 34, 125, 0.1);
        padding: 30px;
        @media (max-width: 576px) {
          padding: 30px 16px;
        }
        @media (max-width: 900px) {
          margin-left: 10px;
        }
        @media (max-width: 768px) {
          margin-left: 0px;
        }
        &:first-child {
          margin-bottom: 20px;
          @media (max-width: 900px) {
            margin-bottom: 0;
            margin-right: 10px;
            margin-left: 0px;
          }
          @media (max-width: 768px) {
            margin-bottom: 20px;
            margin-right: 0px;
            margin-left: 0px;
          }
        }
        & > .top {
          display: flex;
          justify-content: right;
          & > .top_text {
            border-radius: 90px 0px 0px 90px;
            background: #00aa58;
            color: #fff;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 27px; /* 192.857% */
            letter-spacing: 0.7px;
            padding: 0 14px 0 25px;
            display: inline-block;
            margin: 0 -30px 10px 0;
            @media (max-width: 576px) {
              margin: 0 -16px 10px 0;
            }
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
          padding: 8px 0 20px 0;
        }
        & > .link {
          color: #00aa58;
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: 27px; /* 150% */
          letter-spacing: 0.9px;
        }
        &:hover {
          & .title {
            color: #00aa58;
          }
        }
      }
    }
  }
`;
