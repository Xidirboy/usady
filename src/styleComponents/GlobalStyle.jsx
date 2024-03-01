import styled from "styled-components";

export const Btn = styled.button`
  background: #00aa58;
  color: #ffffff;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  /* line-height: 27px;  */
  letter-spacing: 1px;
  text-align: center;
  padding: 16px 50px;
  border-radius: 10px;
  border: 1px solid #00aa58;
  cursor: pointer;
  transition: background-color 0.5s ease;
  &:hover {
    opacity: 0.85;
    background: #00aa58 !important;
    color: #fff !important;
    border: 1px solid #00aa58 !important;
    /* background: #fff !important;
    color: #00aa58 !important;
    border: 1px solid #00aa58 !important; */
  }
  @media (max-width: 576px) {
    font-size: 18px;
    padding: 12px 30px;
  }
`;
export const BtnWhite = styled.button`
  border-radius: 10px;
  border: 1px solid #00aa58;
  background: #ffffff;
  color: #00aa58;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  /* line-height: 27px;  */
  letter-spacing: 1px;
  text-align: center;
  padding: 16px 50px;
  cursor: pointer;
  &:hover {
    /* opacity: 0.7; */
    background: #00aa58;
    color: #fff;
  }
  @media (max-width: 576px) {
    font-size: 18px;
    padding: 12px 30px;
  }
`;
