import styled from "styled-components";

export const StepContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px;
    border-radius: 20px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    @media (max-width: 900px) {
      flex-direction: column;
    }
    @media (max-width: 576px) {
      padding: 50px 16px;
    }
    & > .s1 {
      width: 40%;
      @media (max-width: 900px) {
        width: 100%;
      }
      & > .img_t {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 20px 0 20px;
        & > img {
          max-width: 90%;
          @media (max-width: 1100px) {
            max-width: 100%;
          }
        }
      }
    }
    & > .s2 {
      width: 60%;
      padding-right: 30px;
      padding-left: 30px;
      @media (max-width: 1100px) {
        padding-right: 0px;
        padding-left: 16px;
      }
      @media (max-width: 900px) {
        padding-left: 0px;
        width: 100%;
        padding-top: 16px;
      }
      & > .step {
        border-radius: 20px;
        border: 1px solid #e6e6e6;
        display: flex;
        padding: 10px 20px;
        margin-bottom: 30px;
        @media (max-width: 576px) {
          margin-bottom: 16px;
        }
        &:last-child {
          margin-bottom: 0px;
        }
        & > .num {
          width: 45px;
          padding-top: 10px;
        }
        & > .text {
          width: calc(100% - 45px);
          padding-left: 30px;
          color: #5b5a5a;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: 27px; /* 150% */
          @media (max-width: 576px) {
            padding-left: 16px;
          }
        }
      }
      & > .step1 {
        margin-right: 140px;
        margin-left: 0px;
        @media (max-width: 1100px) {
          margin-right: 60px;
        }
        @media (max-width: 576px) {
          margin-right: 0px;
        }
      }
      & > .step2 {
        margin-right: 70px;
        margin-left: 70px;
        @media (max-width: 1100px) {
          margin-right: 30px;
          margin-left: 30px;
        }
        @media (max-width: 576px) {
          margin-right: 0px;
          margin-left: 0px;
        }
      }
      & > .step3 {
        margin-right: 0px;
        margin-left: 140px;
        @media (max-width: 1100px) {
          margin-left: 60px;
        }
        @media (max-width: 576px) {
          margin-left: 0px;
        }
      }
    }
  }
`;
