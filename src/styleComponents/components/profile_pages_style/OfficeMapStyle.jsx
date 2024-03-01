import styled from "styled-components";

export const OfficeMapContainer = styled.div`
  margin: 25px 0;
  & > .top_title {
    padding: 0 30px 16px 30px;
    display: flex;
    @media (max-width: 576px) {
      padding: 0 16px 8px 16px;
    }
    & > .bar_btn {
      background: #fff;
      padding: 8px;
      border-radius: 5px;
      margin-right: 10px;
      box-shadow: rgba(0, 34, 125, 0.1) 0px 0px 20px 0px !important;
      height: 40px;
      display: none;
      &:hover {
        & g {
          opacity: 1;
        }
        & path {
          fill: #00aa58;
        }
      }
      @media (max-width: 900px) {
        display: block;
        margin-top: 16px;
      }
      @media (max-width: 768px) {
        margin-top: 0;
      }
    }
  }
  & > .p_main {
    padding: 0 30px;
    display: flex;
    @media (max-width: 900px) {
      display: block;
    }
    @media (max-width: 576px) {
      padding: 0 16px;
    }
    & > .content {
      width: calc(100% - 300px);
      @media (max-width: 900px) {
        width: 100%;
      }
      & > .content_card {
        & .target_map {
          margin-top: 0 !important;
        }
        & > .title {
          color: #3648aa;
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: 27px; /* 135% */
          letter-spacing: 1px;
          padding-bottom: 5px;
        }
        & > .desc {
          color: #5b5a5a;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: 27px; /* 150% */
          padding-bottom: 14px;
        }
      }
    }
  }
`;
