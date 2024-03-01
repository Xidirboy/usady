import styled from "styled-components";

export const NewsSectionContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px 20px 30px;
    border-radius: 20px;
    background: #fff;
    @media (max-width: 576px) {
      padding: 50px 16px 20px 16px;
    }
    & > .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      @media (max-width: 576px) {
        flex-direction: column;
        align-items: flex-start;
      }
      & button {
        padding: 12px 16px;
      }
    }
  }
`;

export const SliderNewsContainer = styled.div`
  cursor: grab;
  & .newsSlider {
    padding-bottom: 50px;
    & .item {
      width: 280px;
      max-width: calc(100% - 30px);
      height: auto;
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
    & .swiper-pagination-bullet {
      transition: width 300ms;
      border-radius: 8px;
    }
    & .swiper-pagination-bullet-active {
      width: 30px;
      border-radius: 8px;
      background-color: #00aa58;
    }
  }
`;
