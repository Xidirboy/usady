import styled from "styled-components";

export const TextSliderContainer = styled.div`
  margin: 25px 0;
  & > .card {
    & > .main_titel {
      padding: 0 30px;
      @media (max-width: 576px) {
        padding: 0 16px;
      }
    }
    & > .slider_t {
      cursor: grab;
      & .TextSliderSlider {
        padding-top: 10px;
        & .item {
          border-radius: 20px;
          border: 1px solid #e6e6e6;
          background: #fff;
          padding: 40px 20px;
          box-shadow: 0px 0px 20px 0px rgba(0, 34, 125, 0.1);
          width: 375px;
          max-width: calc(100% - 30px);
          height: auto;
          @media (max-width: 576px) {
            padding: 30px 16px;
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
            line-height: 27px; /* 150% */
            padding-top: 15px;
          }
          &:hover {
            & .title {
              color: #00aa58;
            }
          }
        }
      }
    }
  }
`;
