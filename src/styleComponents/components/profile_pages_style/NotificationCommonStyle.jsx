import styled from "styled-components";

export const NotificationCommonContainer = styled.div`
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
        background-color: #fff;
        border-radius: 20px;
        & .head {
          background-color: #00237e;
          color: #fff;
          font-size: 18px;
          font-style: normal;
          font-weight: 600;
          line-height: 18.2px;
          letter-spacing: 1px;
          padding: 20px;
          border-radius: 20px 20px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          & .all_check {
            height: 30px;
            width: 30px;
            border-radius: 20px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              background-color: #fff;
              color: #00237e;
            }
          }
        }
        & .list {
          padding: 10px 0;
          border-radius: 0 0 20px 20px;
          & .item {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            padding: 10px 20px;
            &:last-child {
              border-bottom: none;
            }
            & .i_head {
              display: flex;
              justify-content: space-between;
              @media (max-width: 576px) {
                flex-direction: column;
              }
              & .s1 {
                & .i_title {
                  font-weight: bold;
                  color: #00237e;
                  font-size: 20px;
                  line-height: 20.2px;
                  letter-spacing: 1px;
                }
                & .i_desc_mobile {
                  display: none;
                  @media (max-width: 576px) {
                    display: block;
                  }
                }
              }
              & .s2 {
                font-weight: 500;
                color: #00237e;
                & .s2_t {
                  display: flex;
                  align-items: center;
                  justify-content: right;
                  width: 150px;
                  @media (max-width: 576px) {
                    width: 100%;
                  }
                  & .i_date {
                    padding-right: 10px;
                  }
                }
              }
            }
            & .i_desc {
              display: block;
              @media (max-width: 576px) {
                display: none;
              }
            }
          }
        }
      }
    }
  }
`;
