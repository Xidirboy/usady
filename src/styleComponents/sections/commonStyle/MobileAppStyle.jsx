import styled from "styled-components";

export const MobileAppContainer = styled.div`
  margin: 25px 0;
  & > .main_titel {
    padding: 0 30px;
    @media (max-width: 576px) {
      padding: 0 16px;
    }
  }
  & > .card {
    display: flex;
    margin-top: 10px;
    align-items: stretch;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    & > .section1 {
      background: #fff;
      width: calc(60% + 20px);
      margin-right: -20px;
      border-radius: 20px 0 0 20px;
      /* box-shadow: rgba(0, 34, 125, 0.1) 0px 0px 20px 0px; */
      padding: 30px;
      @media (max-width: 1100px) {
        width: calc(50% + 20px);
      }
      @media (max-width: 768px) {
        width: 100%;
        margin-right: 0px;
        border-radius: 20px 20px 0 0;
      }
      @media (max-width: 576px) {
        padding: 30px 16px;
      }
      & > .title {
        color: #000;
        font-size: 35px;
        font-style: normal;
        font-weight: bold;
        line-height: 35px; /* 52% */
        letter-spacing: 1.75px;

        @media (max-width: 576px) {
          font-size: 25px;
          line-height: 25px;
        }
        & > span {
          color: #00aa58;
          font-size: 35px;
          font-style: normal;
          font-weight: 700;
          line-height: 35px;
          letter-spacing: 1.75px;
          @media (max-width: 576px) {
            font-size: 25px;
            line-height: 25px;
          }
        }
      }
      & > .text {
        color: #000;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 27px; /* 122.727% */
        letter-spacing: 1.1px;
        margin-top: 20px;
        margin-bottom: 30px;
      }
      & > .items {
        display: flex;
        @media (max-width: 1100px) {
          flex-direction: column;
        }
        & > .item {
          display: flex;
          align-items: center;
          padding-right: 35px;
          padding-bottom: 5px;
          @media (max-width: 1100px) {
            padding-right: 30px;
          }
          & > img {
            margin-right: 18px;
          }
          & > div {
            color: #5b5a5a;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            padding-right: 35px;
            @media (max-width: 1100px) {
              padding-right: 0px;
            }
          }
        }
      }
      & > .store {
        display: flex;
        align-items: center;
        margin-top: 40px;
        @media (max-width: 576px) {
          margin-top: 20px;
        }
        & > a {
          margin-right: 20px;
          border-radius: 5px;
          opacity: 0.7;
          transition: opacity 0.5s ease, box-shadow 0.5s ease;
          &:hover {
            box-shadow: 0px 0px 7px 0px #00aa58;
            opacity: 1;
          }
          @media (max-width: 576px) {
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
    & > .section2 {
      width: 40%;
      border-radius: 20px;
      background: #e7f8eb;
      /* box-shadow: rgba(0, 34, 125, 0.1) 0px 0px 20px 0px; */
      display: flex;
      @media (max-width: 1100px) {
        width: 50%;
      }
      @media (max-width: 768px) {
        width: 100%;
        background: #fff;
        border-radius: 0 0 20px 20px;
      }
      & > .qr_target {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30px;
        @media (max-width: 900px) {
          padding-right: 16px;
        }
        @media (max-width: 768px) {
          width: 100%;
          padding: 0 30px 30px 30px;
          display: flex;
          flex-direction: row;
          & img {
            width: 100px;
            height: 100px;
            margin-right: 10px;
          }
        }
        & > .text {
          color: #5b5a5a;
          text-align: center;
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          line-height: 27px;
          max-width: 350px;
          @media (max-width: 768px) {
            text-align: left;
          }
        }
      }
      & > .phone_target {
        @media (max-width: 768px) {
          display: none;
        }
        & > .phone {
          min-width: 180px;
          max-width: 180px;
          margin-top: -60px;
          margin-right: 15px;
          @media (max-width: 1100px) {
            margin-top: 30px;
            margin-right: 0px;
          }
        }
      }
    }
  }
`;
