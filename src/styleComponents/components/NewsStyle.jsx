import styled from "styled-components";

export const NewsContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px 20px 30px;
    border-radius: 20px;
    background: #fff;
    & > .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      & button {
        padding: 12px 16px;
      }
    }
    & .items {
      display: flex;
      flex-wrap: wrap;
      margin: -10px;
      & .item {
        width: 25%;
        padding: 10px;
        height: auto;
        @media (max-width: 1100px) {
          width: 33.33%;
        }
        @media (max-width: 768px) {
          width: 50%;
        }
        @media (max-width: 576px) {
          width: 100%;
        }
        & .image {
          height: 180px;
          background-size: cover;
          background-position: center;
          background-color: lightgray;
        }
        & .date {
          background-color: #ffffff;
          width: 90px;
          height: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #9c9c9c;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          margin-top: -28px;
        }
        & .name {
          color: #3648aa;
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          margin-top: 15px;
        }
        &:hover {
          & .name {
            color: #00aa58;
          }
        }
      }
    }
  }
`;
