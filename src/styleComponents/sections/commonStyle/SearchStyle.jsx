import styled from "styled-components";

export const SearchContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px;
    border-radius: 20px;
    background: #fff;
    display: flex;
    align-items: center;
    @media (max-width: 900px) {
      flex-direction: column;
    }
    @media (max-width: 576px) {
      padding: 50px 16px;
    }
    & > .section1 {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 900px) {
        width: 100%;
      }
      & > img {
        max-width: 90%;
        max-height: 450px;
        @media (max-width: 576px) {
          max-height: 250px;
        }
      }
    }
    & > .section2 {
      width: 60%;
      @media (max-width: 900px) {
        width: 100%;
        margin-top: 30px;
      }
      & > .search {
        display: flex;
        align-items: center;
        margin: 20px 0;
        @media (max-width: 400px) {
          flex-direction: column;
          margin: 8px 0;
        }
        & > .input {
          border-radius: 10px 0 0 10px;
          border: 1px solid rgb(207, 219, 224);
          height: 60px;
          padding: 16px 18px;
          width: 100%;
          margin-right: -10px;
          @media (max-width: 400px) {
            border-radius: 10px;
            margin-bottom: 12px;
          }
        }
        & > .btn {
          border-radius: 10px;
          background: #00aa58;
          border: 1px solid #00aa58;
          height: 60px;
          color: #fff;
          text-align: center;
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: 27px; /* 135% */
          letter-spacing: 1px;
          padding: 16px 50px;
          &:hover {
            opacity: 0.85;
          }
        }
      }
      & > .items {
        & > .item {
          border-radius: 90px;
          background: rgba(54, 72, 170, 0.05);
          min-height: 34px;
          color: #3648aa;
          text-align: center;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 27px;
          padding: 3px 12px;
          cursor: pointer;
          margin: 10px 10px 0 0;
          white-space: nowrap;
          display: inline-block;
          &:hover {
            background: rgba(54, 72, 170, 0.7);
            color: #fff;
          }
        }
      }
    }
  }
`;
