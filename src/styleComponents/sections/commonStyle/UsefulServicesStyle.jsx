import styled from "styled-components";

export const UsefulServicesContainer = styled.div`
  margin: 25px 0;
  & > .main_titel {
    padding: 0 30px 10px 30px;
    @media (max-width: 576px) {
      padding: 0 16px 10px 16px;
    }
  }
`;

export const Slider1Container = styled.div`
  cursor: grab;
  & .swiper {
    margin: -15px 0;
    padding: 20px 0;
  }
  & .item {
    /* margin-right: 20px !important; */
    height: auto;
    width: 380px;
    max-width: calc(100% - 30px) !important;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(0, 34, 125, 0.1);
    padding: 20px;
    display: flex;
    align-items: center;
    @media (max-width: 576px) {
      padding: 16px;
    }
    & > .section1 {
      width: 180px;
      min-height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 576px) {
        width: 133px;
        min-height: 133px;
      }
      @media (max-width: 400px) {
        width: 100px !important;
        min-height: 100px !important;
      }
      & > img {
        max-width: 100%;
        max-height: 100%;
        @media (max-width: 576px) {
          max-width: 80%;
        }
      }
    }
    & > .section2 {
      width: calc(100% - 180px);
      padding-left: 40px;
      @media (max-width: 576px) {
        width: calc(100% - 133px);
        padding-left: 20px;
      }
      @media (max-width: 400px) {
        width: calc(100% - 100px) !important;
        padding-left: 10px !important;
      }
      & > .title {
        color: #000;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 27px; /* 135% */
        letter-spacing: 1px;
        padding-bottom: 16px;
        @media (max-width: 576px) {
          padding-bottom: 10px;
          font-size: 16px;
          line-height: 13.878px; /* 77.101% */
          letter-spacing: 0.9px;
        }
      }
      & > .text {
        color: #5b5a5a;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 27px;
        @media (max-width: 576px) {
          font-size: 14px;
          line-height: 13.878px;
        }
      }
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 100%;
      background-color: #00237e;
      border-radius: 20px 0 0 20px;
    }
    &:hover {
      & .title {
        color: #00aa58;
      }
      &::before {
        background-color: #00aa58;
      }
    }
  }
  & .col3 {
    width: 380px;
    & > .section1 {
      width: 133px;
      min-height: 133px;
    }
    & > .section2 {
      width: calc(100% - 133px);
      padding-left: 20px;
    }
  }
  & .col4 {
    width: 430px;
    & > .section1 {
      width: 133px;
      min-height: 133px;
    }
    & > .section2 {
      width: calc(100% - 133px);
      padding-left: 16px;
    }
  }
  & .col5 {
    width: 480px;
  }
  & .col6 {
    width: 580px;
  }
  & .col7 {
    width: 680px;
  }
  & .col8 {
    width: 780px;
  }
  & .col9 {
    width: 880px;
  }
  & .col10 {
    width: 980px;
  }
  & .col11 {
    width: 1080px;
  }
  & .col12 {
    width: 1180px;
  }
`;
