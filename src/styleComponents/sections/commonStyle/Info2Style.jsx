import styled from "styled-components";

export const Info2Container = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px;
    border-radius: 20px;
    background: #fff;
    @media (max-width: 576px) {
      padding: 30px 16px;
    }
    & > .words {
      display: flex;
      flex-wrap: wrap;
      & > .word {
        width: 50%;
        padding-right: 30px;
        padding-top: 30px;
        &:hover {
          & .title {
            color: rgb(0, 170, 88) !important;
          }
        }
        @media (max-width: 768px) {
          width: 100%;
          padding-right: 0px;
          padding-top: 30px;
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
          @media (max-width: 768px) {
            padding: 8px 0 16px 0;
          }
        }
        & > .link {
          color: #00aa58;
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: 27px; /* 150% */
          letter-spacing: 0.9px;
        }
      }
    }
  }
`;
