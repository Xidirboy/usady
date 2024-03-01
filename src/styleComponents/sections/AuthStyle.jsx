import styled from "styled-components";

export const AuthStyle = styled.div`
  & > .title {
    padding-bottom: 20px;
  }
  & > .form {
    & > .btns {
      padding: 14px 0;
      text-align: center;
      & > button {
        width: 100%;
        max-width: 400px;
      }
    }
  }
  & .event {
    color: rgb(0, 170, 88);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    /* line-height: 18.2px;
    letter-spacing: 0.9px; */
    display: block;
    padding-top: 14px;
    cursor: pointer;
    text-align: center;
    & .tsup {
      color: #000;
      font-weight: 400;
    }
  }
  & .forget {
    text-decoration: underline;
    text-align: right;
    padding-bottom: 10px;
  }
  & #timer_target {
    color: #181818;
  }
`;
