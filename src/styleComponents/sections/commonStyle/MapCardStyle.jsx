import styled from "styled-components";

const MapCardContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px 50px 30px;
    border-radius: 20px;
    background: #fff;
    display: flex;
    align-items: center;
    @media (max-width: 576px) {
      padding: 30px 16px 30px 16px;
    }
    @media (max-width: 900px) {
      flex-direction: column;
    }
    & > .section1 {
      width: 50%;
      padding-right: 10px;
      @media (max-width: 900px) {
        width: 100%;
      }
      & > .lines {
        display: flex;
        align-items: center;
        justify-content: left;
        width: 75%;
        margin-bottom: 5px;
        & > .line1 {
          width: 35%;
          height: 3px;
          background-color: #00aa58;
          border-radius: 3px 0 0 3px;
        }
        & > .line2 {
          width: 65%;
          height: 1px;
          background-color: rgb(217, 219, 219);
        }
      }
      & > .items {
        padding: 14px 0;
        height: 480px;
        overflow-y: auto;
        & > .item {
          padding: 14px;
          margin: 0 6px;
          cursor: pointer;
          &:hover {
            background-color: #eff2fb;
            border-radius: 14px;
          }
          & > .year {
            font-size: 32px !important;
            font-weight: 900;
            color: #00237e;
            @media (max-width: 900px) {
              font-size: 24px !important;
            }
          }
          & > .text {
            font-size: 16px;
            font-weight: 500;
          }
          & > .phone {
            font-size: 28px !important;
            font-weight: 900;
            color: #00aa58;
            @media (max-width: 900px) {
              font-size: 20px !important;
            }
          }
        }
      }
    }
    & > .section2 {
      width: 50%;
      @media (max-width: 900px) {
        width: 100%;
      }
    }
  }
`;
export default MapCardContainer;
