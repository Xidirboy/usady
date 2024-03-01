import styled from "styled-components";

export const HomeSlider2Container = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px 80px 30px;
    border-radius: 20px;
    background: #fff;
    display: flex;
    align-items: center;
    @media (max-width: 576px) {
      padding: 30px 16px 75px 16px;
    }
    @media (max-width: 900px) {
      flex-direction: column-reverse;
    }
    & > .section1 {
      width: 50%;
      @media (max-width: 900px) {
        width: 100%;
        margin-top: 30px;
      }
      @media (max-width: 576px) {
        margin-top: 16px;
      }
      & > .top_text {
        border-radius: 90px;
        background: rgba(0, 170, 88, 0.1);
        padding: 8px 30px;
        color: #00aa58;
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 27px; /* 135% */
        letter-spacing: 1px;
        display: inline-block;
        margin-bottom: 30px;
        @media (max-width: 576px) {
          font-size: 18px;
          margin-bottom: 16px;
        }
      }
      & > .text {
        margin: 30px 0 30px 0;
        @media (max-width: 576px) {
          margin: 8px 0 0 0;
        }
      }
      & > .btns {
        & > a {
          margin-right: 20px;
          margin-top: 20px;
          display: inline-block;
          @media (max-width: 576px) {
            margin-top: 8px;
            margin-right: 8px;
          }
          &:last-child {
            margin-right: 0px;
          }
        }
      }
    }
    & > .section2 {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 900px) {
        width: 100%;
      }
      & > img {
        max-width: 90%;
        max-height: 350px;
        @media (max-width: 576px) {
          max-height: 250px;
        }
      }
    }
  }
  & > .slider_t {
    padding: 0 30px;
    margin-top: -90px;
    @media (max-width: 576px) {
      padding: 0 16px;
    }
    & > .HomeSlider2 {
      cursor: grab;
      padding-top: 30px;
      & .item {
        width: 375px;
        max-width: calc(100% - 30px);
        border-radius: 20px;
        background: rgb(255, 255, 255);
        box-shadow: rgba(0, 34, 125, 0.1) 0px 0px 20px 0px;
        padding: 20px 10px 20px 20px;
        height: auto;
        color: #000;
        @media (max-width: 576px) {
          padding: 15px;
        }
        & .link {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          height: 100%;
        }
        &:hover {
          & .link {
            & .title {
              color: #00aa58 !important;
            }
          }
        }
        & .title {
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: 27px; /* 135% */
          letter-spacing: 1px;
          margin-bottom: 5px;
        }
        & .word {
          color: #5b5a5a;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: 23px; /* 127.778% */
          letter-spacing: 0.9px;
        }
        & .img_t {
          display: flex;
          justify-content: right;
          align-items: center;
          & > img {
            max-width: 150px;
            max-height: 150px;
            @media (max-width: 576px) {
              max-width: 100px;
              max-height: 150px;
            }
          }
        }
      }
    }
  }
`;
