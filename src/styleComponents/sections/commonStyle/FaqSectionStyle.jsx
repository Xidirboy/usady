import styled from "styled-components";

export const FaqSectionContainer = styled.div`
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
        @media (max-width: 1100px) {
          display: none;
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
        & > .m_btns {
          display: none;
          @media (max-width: 1100px) {
            display: block;
          }
          & button {
            padding: 12px 16px;
          }
        }
      }
      & > .section2 {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: right;
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
