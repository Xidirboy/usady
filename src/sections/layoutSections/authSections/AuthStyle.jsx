import styled from "styled-components";

export const AuthStyle = styled.div`
  & .set_password {
    padding-top: 20px;
  }
  & .auth_bottom_section {
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eeeeee;
  }
  & .info_text {
    font-size: 18px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0.2px;
    text-align: center;
  }
  & .auth_btn {
    font-size: 18px;
    font-weight: 700;
    line-height: 29px;
    letter-spacing: 0.2px;
    padding: 0 10px;
    text-align: center;
    color: #235dff;
    text-align: center;
    &:hover {
      text-decoration: underline;
    }
  }
  & #timer_target {
    width: 60px;
    padding: 0;
  }
`;
