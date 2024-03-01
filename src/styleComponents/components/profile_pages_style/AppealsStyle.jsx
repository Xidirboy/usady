import styled from "styled-components";

export const AppealsContainer = styled.div`
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
      & > .items {
        border-radius: 20px;
        background: #fff;
        box-shadow: 0px 0px 20px 0px rgba(0, 34, 125, 0.1);
        & > .item {
          padding: 15px 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          &:last-child {
            border-bottom: none;
          }
          & > .i_head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            & > .name {
              color: #000;
              font-size: 20px;
              font-style: normal;
              font-weight: 700;
              line-height: 27px;
              letter-spacing: 1px;
              transition: color 0.5s linear;
            }
            & > .active_name {
              color: #3648aa;
            }
            & > .right {
              display: flex;
              align-items: center;
              justify-content: space-between;
              & > .status {
                margin-right: 80px;
                color: #00aa58;
                font-size: 16px;
                font-style: italic;
                font-weight: 400;
                line-height: 17px;
                letter-spacing: 0.8px;
                @media (max-width: 1100px) {
                  margin-right: 10px;
                  margin-left: 10px;
                }
              }
              & > .arrow {
                cursor: pointer;
                transition: transform 0.5s linear;
                &:hover {
                  & > svg {
                    & path {
                      fill: #00aa58;
                    }
                  }
                }
              }
              & > .openArrow {
                transform: rotate(180deg);
              }
            }
          }
          & > .i_body {
            color: #5b5a5a;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 27px;
            padding: 0;
            visibility: hidden;
            transition: height 1s linear, opacity 1s linear;
            opacity: 0;
            height: 0;
            @media (max-width: 576px) {
              font-size: 16px;
            }
            & > .appeal {
            }
            & > .answer {
              padding-top: 5px;
              padding-left: 50px;
              @media (max-width: 576px) {
                padding-left: 0px;
              }
            }
          }
          & > .i_open_body {
            visibility: visible;
            height: auto;
            opacity: 1;
            padding: 5px 0;
          }
        }
      }
      & > .btns {
        /* padding-top: 30px; */
        & button {
          margin-right: 20px;
          margin-bottom: 20px;
        }
      }
    }
  }
`;
