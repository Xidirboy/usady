import styled from "styled-components";

export const CashbackContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px;
    border-radius: 20px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 1100px) {
      flex-direction: column;
    }
    @media (max-width: 576px) {
      padding: 50px 16px;
    }
    & > .section1 {
      /* width: calc(50% - 100px); */
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
      @media (max-width: 567px) {
        padding-bottom: 30px;
      }
    }
    & > .section2 {
      /* width: calc(50% + 100px); */
      @media (max-width: 768px) {
        width: 100%;
      }
      & > .row {
        display: flex;
        align-items: center;
        justify-content: right;
        &:first-child {
          margin-bottom: 30px;
          padding-right: 70px;
          @media (max-width: 900px) {
            padding-right: 35px;
          }
          @media (max-width: 768px) {
            padding-right: 0px;
          }
        }
        @media (max-width: 768px) {
          padding-right: 0px;
          justify-content: space-between;
        }
        & > .card {
          border-radius: 20px;
          border: 1px solid #e6e6e6;
          background: #fff;
          width: 280px;
          height: 150px;
          padding: 16px;
          margin-right: 40px;
          display: flex;
          flex-direction: column;
          @media (max-width: 768px) {
            width: calc(50% - 8px);
            margin-right: 0;
          }
          @media (max-width: 567px) {
            height: 130px;
          }
          & > .d_target {
            display: flex;
            justify-content: right;
            & > .discount {
              width: 52px;
              height: 52px;
              background: #00aa58;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #fff;
              text-align: center;
              font-size: 18px;
              font-style: normal;
              font-weight: 700;
              line-height: 27px; /* 150% */
              letter-spacing: 0.9px;
              position: absolute;
              margin-top: -35px;
              margin-right: -40px;
              @media (max-width: 768px) {
                margin-right: -20px;
                margin-top: -40px;
              }
            }
          }
          & > .word {
            color: #000;
            text-align: center;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 27px; /* 135% */
            letter-spacing: 1px;
            padding-top: 10px;
            @media (max-width: 567px) {
              font-size: 18px;
              letter-spacing: 0.1px;
              padding-top: 5px;
            }
          }
          & > .img_t {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            & > img {
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }
    }
  }
`;
