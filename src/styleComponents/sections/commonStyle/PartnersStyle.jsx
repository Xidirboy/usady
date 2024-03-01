import styled from "styled-components";

export const PartnersContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px;
    border-radius: 20px;
    background: #fff;
    @media (max-width: 576px) {
      padding: 30px 16px;
    }
    & > .text {
      margin-top: 14px;
    }
  }
`;

export const SliderPartnersContainer = styled.div`
  cursor: grab;
  padding-top: 30px;
  & .PartnersSlider {
    & .item {
      border-radius: 20px;
      border: 1px solid #e6e6e6;
      background: #fff;
      padding: 20px;
      width: 270px;
      max-width: calc(100% - 30px);
      height: 110px;
      & > a {
        display: flex;
        justify-content: center;
        align-items: center;
        & > img {
          max-width: 230px;
          max-height: 70px;
        }
      }
    }
  }
`;
