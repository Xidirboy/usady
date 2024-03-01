import styled from "styled-components";

export const InsuranceTypesContainer = styled.div`
  margin: 25px 0;
  & > .main_titel {
    padding: 0 30px;
    @media (max-width: 576px) {
      padding: 0 16px;
    }
  }
  & > .card {
    border-radius: 20px;
    background: #fff;
    padding: 30px;
    margin-top: 10px;
    @media (max-width: 576px) {
      padding: 30px 16px;
    }
  }
`;
export const Slider4Container = styled.div`
  cursor: grab;
  & .swiper {
    /* margin: -15px 0;
    padding: 20px 0; */
  }
  & .item {
    /* margin-right: 20px !important; */
    width: 272px;
    max-width: calc(100% - 30px);
    height: 100px;
    border-radius: 90px;
    background: #eff2fb;
    padding: 20px;
    display: flex;
    align-items: center;
    @media (max-width: 576px) {
      padding: 16px;
    }
    &:hover {
      border: 1px solid #eff2fb;
      background: #fff;
      & .title {
        color: #00aa58 !important;
      }
    }
    & > .section1 {
      width: 65px;
      min-height: 65px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    & > .section2 {
      width: calc(100% - 65px);
      padding-left: 30px;
      @media (max-width: 576px) {
        padding-left: 16px;
      }
      & > .title {
        color: #000;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 27px; /* 135% */
        letter-spacing: 1px;
        @media (max-width: 576px) {
          font-size: 18px;
        }
      }
    }
  }
  & .col3 {
    width: 280px;
  }
  & .col4 {
    width: 380px;
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
