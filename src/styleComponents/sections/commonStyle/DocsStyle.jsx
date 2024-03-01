import styled from "styled-components";

export const DocsContainer = styled.div`
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

export const SliderDocsContainer = styled.div`
  cursor: grab;
  padding-top: 30px;
  & .DocsSlider {
    padding-bottom: 2px;
    & .item {
      border-radius: 20px;
      border: 1px solid #e6e6e6;
      background: #fff;
      padding: 20px;
      width: 300px;
      max-width: calc(100% - 30px);
      height: auto;
      & > a {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: revert !important;
        font-size: 18px;
        font-weight: 700;
        & > img {
          max-width: 230px;
          max-height: 50px;
          margin-right: 16px;
        }
      }
      
        &:hover {
          color: #00aa58;
        }
    }
  }
`;
