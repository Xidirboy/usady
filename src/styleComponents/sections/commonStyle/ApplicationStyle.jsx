import styled from "styled-components";

export const ApplicationContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px;
    border-radius: 20px;
    background: #fff;
    display: flex;
    align-items: center;
    @media (max-width: 576px) {
      padding: 30px 16px;
    }
    @media (max-width: 900px) {
      flex-direction: column-reverse;
    }
    & > .section1 {
      width: 60%;
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
        font-weight: 500 !important;
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
      & > .app_target {
        padding-top: 20px;
        & .form_row {
          display: flex;
          flex-wrap: wrap;
          & .input_target {
            border: 1px solid darkgray;
            border-radius: 8px;
            margin-bottom: 30px;
            width: 350px;
            margin-right: 16px;
            height: 50px;
            & .label {
              position: absolute;
              background-color: #fff;
              margin-top: -11px;
              margin-left: 10px;
              padding: 0 5px;
              font-size: 14px;
              font-weight: 500;
            }
            & .f_input {
              width: 100%;
              padding: 12px 10px;
              border-radius: 10px;
            }
            &.error {
              border-color: red;
              & .label {
                color: red;
              }
            }
          }
          & .send {
            border-radius: 8px;
            padding: 10px 30px;
            font-size: 18px;
            height: 50px;
          }
        }
      }
    }
    & > .section2 {
      width: 40%;
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
`;
