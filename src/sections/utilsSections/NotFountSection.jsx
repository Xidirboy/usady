import React from "react";
import styled from "styled-components";
import { Btn } from "../../styleComponents/GlobalStyle"; 
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFountSectionStyle = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
  & > .col1 {
    width: 55%;
    padding: 30px;
    @media (max-width: 768px) {
      width: 100%;
      padding: 16px;
    }
    & > .title {
      color: #181818;
      font-size: 70px;
      font-style: normal;
      font-weight: 700;
      line-height: 75px; /* 107.143% */
      letter-spacing: 3.5px;
      @media (max-width: 768px) {
        font-size: 30px;
        line-height: 32px; /* 56.875% */
        letter-spacing: 1.28px;
      }
    }
    & > .desc {
      color: #353434;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 27px; /* 135% */
      letter-spacing: 1px;
      padding: 40px 0;
      @media (max-width: 768px) {
        font-size: 18px;
        line-height: 20px; /* 56.875% */
        letter-spacing: 0.7px;
        padding: 20px 0;
      }
    }
  }
  & > .col2 {
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
      width: 100%;
      padding: 16px;
    }
    & > img {
      @media (max-width: 768px) {
        max-width: 300px;
      }
      @media (max-width: 400px) {
        max-width: 230px;
      }
    }
  }
`;

const NotFountSection = () => {
  const { t } = useTranslation();
  return (
    <>
      <NotFountSectionStyle>
        <div className="col1">
          <div className="title">{t("404.title")}</div>
          <div
            className="desc"
            dangerouslySetInnerHTML={{ __html: t("404.desc") }}
          />
          <div className="btns">
            <Link to="/">
              <Btn>{t("404.btn")}</Btn>
            </Link>
          </div>
        </div>
        <div className="col2">
          <img src="/images/404.png" alt={t("404.title")} />
        </div>
      </NotFountSectionStyle>
    </>
  );
};

export default NotFountSection;
