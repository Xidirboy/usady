import styled from "styled-components";

export const FaqUserContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px 20px 30px;
    border-radius: 20px;
    background: #fff;
    @media (max-width: 576px) {
      padding: 30px 16px;
    }
    & > .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      & button {
        padding: 12px 16px;
      }
    }
    & > .types_slider {
      cursor: grab;
      margin-bottom: 50px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      & .item {
        width: auto;
        height: auto;
        max-width: calc(90% - 20px);
        color: #000;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 27px;
        padding: 14px 0 9px 0;
        border-bottom: 5px solid #fff;
        @media (max-width: 576px) {
          font-size: 18px;
        }

        &:hover {
          color: #00aa58;
        }
      }
      & .active_item {
        border-bottom: 5px solid #3648aa;
        color: #3648aa;
        &:hover {
          color: #00aa58;
          border-bottom: 5px solid #00aa58;
        }
      }
    }
    & > .sections {
      display: flex;
      align-items: self-start;
      & > .section1 {
        width: 60%;
        @media (max-width: 768px) {
          width: 100%;
        }
        & > .faqs {
          & > .faq {
            border-radius: 10px;
            border: 1px solid #e6e6e6;
            background: #fff;
            padding: 14px 20px;
            margin-bottom: 20px;
            cursor: pointer;

            &.active_faq {
              background: #eff2fb;
              & > .title {
                & > .arrow {
                  & > img {
                    transform: rotate(180deg) !important;
                  }
                }
              }
            }
            & > .title {
              display: flex;
              align-items: center;
              justify-content: space-between;
              & > .title_text {
                color: #3648aa;
                font-size: 20px;
                font-style: normal;
                font-weight: 700;
                line-height: 27px; /* 135% */
                letter-spacing: 1px;
              }
              & > .arrow {
                width: 12px;
                min-width: 12px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                & > img {
                  width: 12px;
                  min-width: 12px;
                  transition: transform 500ms ease 0s;
                }
              }
            }
            & > .body {
              margin-top: 8px;
              color: #353434;
              font-size: 20px;
              font-style: normal;
              font-weight: 400;
              line-height: 27px; /* 135% */
              letter-spacing: 1px;
            }
          }
        }
        & > .btns {
          & button {
            padding: 14px 35px;
          }
        }
      }
      & > .section2 {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: right;
        padding-bottom: 20px;
        @media (max-width: 768px) {
          display: none;
        }
        & > img {
          max-width: 90%;
        }
      }
    }
  }
`;
