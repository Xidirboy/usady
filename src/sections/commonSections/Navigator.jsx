import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContainerStyle = styled.div`
  color: #8c8c8c;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.8px;
  padding: 25px 30px 0 30px;

  @media (max-width: 576px) {
    padding: 16px 16px 0px 16px;
  }
  & > .slash {
    padding: 0 10px;
  }
  & > a {
    color: #3648aa;
    &:hover {
      color: #00aa58;
    }
  }
`;

const Navigator = ({ active = "", navs = [] }) => {
  const { t } = useTranslation();
  return (
    <ContainerStyle>
      <Link to="/" key={"l"}>
        {t("head.home")}
      </Link>
      {navs.map((nav, index) => (
        <>
          <span key={"s" + index} className="slash">
            /
          </span>
          <Link to={nav.link} key={"l" + index}>
            {nav.title}
          </Link>
        </>
      ))}
      {active?.length ? (
        <>
          <span key={"s"} className="slash">
            /
          </span>
          <span key={"ll"}>{active}</span>
        </>
      ) : null}
    </ContainerStyle>
  );
};

export default Navigator;
