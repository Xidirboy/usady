import styled from "styled-components";

export const SmallSliderContainer = styled.div`
  margin: 25px 0px;
  & > .card {
    padding: 30px 0px;
    border-radius: 20px;
    background: #fff;
    @media (max-width: 576px) {
      padding: 16px 0px;
    }
    & > .title_target {
      padding: 0 30px;
      @media (max-width: 576px) {
        padding: 0 16px;
      }
    }
    & > .SmallSlider {
      cursor: grab;
      padding: 30px;
      @media (max-width: 576px) {
        padding: 16px;
      }
      & .item {
        width: 180px;
        border-radius: 20px;
        background: rgb(255, 255, 255);
        box-shadow: rgba(0, 34, 125, 0.1) 0px 0px 20px 0px;
        padding: 15px 20px;
        height: auto;
        color: #000;
        &:hover {
          & a {
            color: #00aa58 !important;
            & .title {
              color: #00aa58 !important;
            }
          }
        }
        @media (max-width: 576px) {
          width: 160px;
          padding: 15px;
        }

        & .title {
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: 27px; /* 135% */
          letter-spacing: 1px;
          margin-bottom: 15px;
          @media (max-width: 576px) {
            font-size: 18px;
            margin-bottom: 8px;
          }
        }
        & .img_t {
          display: flex;
          justify-content: right;
          align-items: center;
          height: 110px;
          @media (max-width: 576px) {
            height: 100px;
          }
          & > img {
            max-width: 110px;
            max-height: 110px;
            @media (max-width: 576px) {
              max-width: 100%;
              max-height: 100px;
            }
          }
        }
      }
    }
  }
`;
