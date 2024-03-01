import styled from "styled-components";

export const ActionVideoContainer = styled.div`
  margin: 25px 0;
  & > .main_titel {
    padding: 0 30px;
    @media (max-width: 576px) {
      padding: 0 16px;
    }
  }
  & > .card {
    padding: 50px 30px;
    border-radius: 20px;
    margin-top: 10px;
    background: #fff;
    @media (max-width: 576px) {
      padding: 30px 16px;
    }
    & > .slider_target {
      & .vActionSwiper {
        cursor: grab;
        & .item {
          width: 380px;
          @media (max-width: 576px) {
            width: 368px;
          }
          @media (max-width: 400px) {
            width: 100%;
          }
          &:hover {
            & .title {
              color: rgb(0, 170, 88) !important;
            }
          }
          & > .section {
            & > .s2 {
              display: flex;
              align-items: center;
              & > .img_target {
                width: 105px;
                min-width: 105px;
                height: 105px;
                border-radius: 50%;
                background: #00aa58;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 5px;
                &:hover {
                  opacity: 0.7;
                }
                & > img {
                  max-width: 100px;
                  max-height: 100px;
                }
              }
              & > .points_l,
              & > .points_r {
                padding: 0 6px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                @media (max-width: 400px) {
                  padding: 0 4px;
                }
                & > span {
                  background: #e9e9e9;
                  height: 10px;
                  width: 10px;
                  border-radius: 50%;
                }
              }
            }
            & > .text {
              & > .title {
                color: #000;
                text-align: center;
                font-size: 20px;
                font-style: normal;
                font-weight: 700;
                line-height: 27px; /* 135% */
                letter-spacing: 1px;
                padding: 20px;
                @media (max-width: 576px) {
                  padding: 16px;
                }
              }
              & > .word {
                color: #000;
                text-align: center;
                font-size: 18px;
                font-style: normal;
                font-weight: 400;
                line-height: 27px;
                padding: 0 10px;
                @media (max-width: 576px) {
                  padding: 0 5px;
                }
              }
            }
          }
          &:first-child {
            & .points_l {
              & span {
                background: transparent !important;
              }
            }
          }
          &:last-child {
            & .points_r {
              & span {
                background: transparent !important;
              }
            }
          }
        }
      }
    }
    & > .video_target {
      display: flex;
      justify-content: center;
      align-items: center;
      & > .video_container {
        max-width: 900px;
        width: 100%;
        & > .title {
          color: #000;
          font-size: 22px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          padding: 40px 0 10px 0;
          @media (max-width: 576px) {
            font-size: 18px;
          }
        }
      }
    }
  }
`;
