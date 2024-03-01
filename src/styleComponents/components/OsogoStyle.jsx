import styled from "styled-components";

export const OsogoContainer = styled.div`
  & > .title_target {
    padding: 0 30px 0 30px;
    @media (max-width: 576px) {
      padding: 0 16px 0 16px;
    }
    & > .title {
      padding: 0 0 0px 0;
    }
  }
  & > .content {
    display: flex;
    justify-content: center;
    @media (max-width: 900px) {
      flex-direction: column-reverse;
    }
    & > .form_target {
      width: 100%;
      max-width: 900px;
      & .sub_title {
        color: #181818;
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 25px;
        letter-spacing: 1.1px;
        padding-top: 20px;
        @media (max-width: 576px) {
          font-size: 18px;
          line-height: 20px;
        }
        &.driver_title,
        &.insured_title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 20px;
          & .delete {
            color: red;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            cursor: pointer;
          }
        }
      }
      & .date_error_check {
        padding-bottom: 20px;
      }
      & .row {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        &:last-child {
          border-bottom: none;
        }
        & .select_target {
          max-width: 600px;
        }
        & .date_target {
          display: flex;
          flex-wrap: wrap;
          & > div {
            max-width: 310px;
            padding-right: 20px;
            width: 100%;
          }
        }
        & .doc_number {
          max-width: 600px;
          & label {
            color: rgb(24, 24, 24);
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: 18.2px;
            letter-spacing: 0.9px;
            display: block;
            padding-top: 14px;
          }
          & .inputs {
            display: flex;
            & .seria {
              width: 30%;
              padding-right: 20px;
              max-width: 130px;
              min-width: 100px;
              @media (max-width: 576px) {
                padding-right: 16px;
              }
            }
            & .number {
              width: 100%;
            }
          }
        }
        & .col_2 {
          display: flex;
          flex-wrap: wrap;
          &.col_btn_target {
            align-items: flex-end;
            & .check_driver_btn,
            & .check_insured_btn {
              margin-bottom: 14px;
              padding: 14px 40px;
            }
          }
          & > div {
            width: 50%;
            @media (max-width: 900px) {
              width: 100%;
            }
            &:nth-child(odd) {
              padding-right: 20px;
              @media (max-width: 900px) {
                padding-right: 0px;
              }
            }
          }
        }
      }
      & .checkbox_single {
        padding: 15px 0;
        color: #5b5a5a;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 133.333% */
        & label {
          display: flex;
          align-items: flex-start;
          cursor: pointer;
          & input {
            border-radius: 2px;
            border: 1px solid #cfdbe0;
            width: 20px;
            height: 20px;
            min-width: 20px;
            min-height: 20px;
            margin-right: 8px;
            opacity: 0.5;
          }
        }
      }
      & .btns {
        padding: 15px 0 30px 0px;
      }
      & .add_driver,
      & .add_insured {
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        cursor: pointer;
        color: rgb(0, 170, 88);
        padding: 0 0 20px 0;
      }
    }
    & > .result {
      min-width: 320px;
      width: 320px;
      padding-left: 20px;
      @media (max-width: 900px) {
        min-width: auto;
        width: 100%;
        padding-left: 0px;
        padding-top: 20px;
      }
      & .result_forma {
        & .head {
          padding-left: 20px;
          padding-right: 20px;
          @media (max-width: 576px) {
            padding: 8px 16px;
          }
        }
        & .f_body {
          padding-left: 20px;
          padding-right: 20px;
          margin-bottom: 20px;

          @media (max-width: 576px) {
            padding: 0px 16px;
          }
          & .info {
            padding: 15px 0 20px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            &:last-child {
              border-bottom: none;
            }
            & .i_title {
              color: #000;
              font-size: 18px;
              font-style: normal;
              font-weight: 700;
              line-height: 27px; /* 150% */
              letter-spacing: 0.9px;
            }
            & .i_value {
              color: #5b5a5a;
              font-size: 18px;
              font-style: normal;
              font-weight: 400;
              line-height: 27px; /* 150% */
            }
          }
        }
      }
    }
  }
  & .error_card {
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
    color: #00237e;
    & .error_img {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      & img {
        max-width: 250px;
      }
    }
  }
`;
