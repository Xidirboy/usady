import styled from "styled-components";

export const HistorysContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px;
    border-radius: 20px;
    background: #fff;
    @media (max-width: 576px) {
      padding: 50px 16px;
    }
    & > .text {
      margin-top: 14px;
    }
    & > .slider_target {
      cursor: grab;
      padding-top: 10px;
      & .HistorysSlider {
        & .item {
          width: 182px;
          height: 320px;
          cursor: pointer;
          & > .poster {
            width: 100%;
            height: 100%;
            background-color: #c6c8c9;
            border-radius: 10px;
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 10px;

            & > .title {
              color: #fff;
              text-align: center;
              font-size: 18px;
              font-style: normal;
              font-weight: 600;
              line-height: 25px;
              transition: transform 0.3s ease;
            }
            & > .duration {
              display: flex;
              justify-content: space-between;
              align-items: center;
              transition: transform 0.3s ease;
              & > .time {
                color: #fff;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
              }
            }
            &::before {
              transition: background-color 0.3s ease;
            }
            &:hover {
              & > .title,
              & > .duration {
                z-index: 2;
                transform: scale(1.05);
              }
              &::before {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1;
                border-radius: 10px;
              }
            }
          }
        }
      }
    }
  }
`;
